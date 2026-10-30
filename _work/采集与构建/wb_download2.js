// -*- coding: utf-8 -*-
// WorkBuddy 解决方案库 — 批量下载器 v2（按页面自身引用权威解析）
// 用法: node wb_download2.js [--limit N] [--from N] [--only slug1,slug2] [--out DIR] [--conc 8] [--nodemo]
const fs = require('fs');
const path = require('path');
const C = require(path.join(__dirname, 'wb_core.js'));
const FENCE = String.fromCharCode(96, 96, 96);

const argv = process.argv.slice(2);
const arg = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d; };
const LIMIT = arg('--limit') ? parseInt(arg('--limit'), 10) : Infinity;
const FROM = arg('--from') ? parseInt(arg('--from'), 10) : 0;
const ONLY = arg('--only') ? String(arg('--only')).split(',').map(s => s.trim()).filter(Boolean) : null;
const CONC = parseInt(arg('--conc', '8'), 10);
const NO_DEMO = argv.indexOf('--nodemo') >= 0;
const PROBE = path.join(__dirname, '..', '数据源');
const OUT = path.resolve(arg('--out', path.join(__dirname, '..', 'WorkBuddy解决方案库')));
const DATA = JSON.parse(fs.readFileSync(path.join(PROBE, 'v210_data.json'), 'utf8'));
const ONECLICK = DATA.ONECLICK || {};
const INSTALL_DEFAULT = 'https://workbuddy-space-static.codebuddy.work/page/C4IMIxqXQDzznN6KEtzqft/1/install_skill.py';

let list = DATA.SOLUTIONS.filter(s => s.src && String(s.src).trim());
if (ONLY) list = list.filter(s => ONLY.some(o => String(s.src).indexOf(o) >= 0));
const stats = { ok: 0, partial: 0, failed: 0 };

const bare = u => String(u).split('#')[0].split('?')[0];
function siteRootOf(absUrl) {
  const m = /^(https?:\/\/[^\/]+)\/page\/([^\/]+)\/([^\/]+)\//.exec(absUrl);
  if (!m) return null;
  return m[1] + '/page/' + m[2] + '/' + m[3] + '/';
}
function refsOf(html) {
  const out = [];
  const re = /(href|src)="([^"]*)"/g;
  let m;
  while ((m = re.exec(html))) out.push({ attr: m[1], val: m[2], raw: m[0] });
  const re2 = /url\(\s*['"]?([^'")]+)['"]?\s*\)/g;
  while ((m = re2.exec(html))) out.push({ attr: 'url', val: m[1], raw: m[0] });
  return out;
}
const isRemote = v => /^(https?:|mailto:|tel:|data:|javascript:|blob:|\/\/|#)/i.test(v) || !v;

async function one(sol, idx) {
  const r = { sid: sol.sid, t: sol.t, ind: sol.ind || '', roles: sol.roles || [], status: sol.status || '', scope: sol.scope || '', src: sol.src, notes: [], files: {}, assets: [] };
  const introUrl = bare(sol.src);
  const root = siteRootOf(introUrl);
  if (!root) { r.notes.push('无法解析站点根'); stats.failed++; return r; }
  const dirRel = String(sol.sid != null ? sol.sid + 1 : idx + 1).padStart(3, '0') + '_' + C.safe(sol.t || 'solution', 60);
  const dir = path.join(OUT, dirRel);
  fs.mkdirSync(dir, { recursive: true });

  // ---- 1) 抓入口页 ----
  const g0 = await C.getText(introUrl);
  if (!g0.ok) { r.notes.push('场景引入页获取失败 [' + g0.status + ']'); stats.failed++; return r; }

  // ---- 2) 从页面自身 nav 找出「推荐任务 / Live Demo」的真实 URL ----
  const sub = (/<nav class="subnav">([\s\S]*?)<\/nav>/i.exec(g0.text) || [, ''])[1];
  const anchors = [...sub.matchAll(/<a[^>]+href="([^"]+)"/g)].map(m => m[1]);
  const allAnchors = sub ? anchors : [...g0.text.matchAll(/<a[^>]+href="([^"]+)"/g)].map(m => m[1]);
  const abs = v => { try { return bare(new URL(v, introUrl).href); } catch (e) { return null; } };
  let tasksUrl = null, demoUrl = null;
  for (const a of allAnchors) {
    const u = abs(a); if (!u) continue;
    if (/-tasks\.html$/i.test(u)) tasksUrl = tasksUrl || u;
    if (/\/live-demos\/.+\.html?$/i.test(u)) demoUrl = demoUrl || u;
  }
  const slug = (/([^\/]+)\.html$/.exec(introUrl) || [, ''])[1];
  if (!tasksUrl) tasksUrl = abs(slug + '-tasks.html');
  if (!demoUrl) demoUrl = abs('live-demos/' + slug + '/index.html');

  // ---- 3) 抓三个页面 ----
  const pages = [{ key: 'intro', name: '场景引入.html', url: introUrl, text: g0.text }];
  const gt = await C.getText(tasksUrl);
  if (gt.ok) pages.push({ key: 'tasks', name: '推荐任务.html', url: tasksUrl, text: gt.text });
  if (!NO_DEMO && demoUrl) { const gd = await C.getText(demoUrl); if (gd.ok) pages.push({ key: 'demo', name: 'LiveDemo.html', url: demoUrl, text: gd.text }); }

  // ---- 4) 页面 URL → 本地文件名 映射 ----
  const urlMap = new Map();
  for (const p of pages) urlMap.set(p.url, p.name);

  // ---- 5) 收集需要下载的资源（站点内非页面引用）----
  const assetJobs = new Map();   // absUrl -> relFromRoot
  const absFromPage = (v, pageUrl) => { try { return bare(new URL(v, pageUrl).href); } catch (e) { return null; } };
  for (const p of pages) {
    for (const rf of refsOf(p.text)) {
      if (isRemote(rf.val)) continue;
      const u = absFromPage(rf.val, p.url);
      if (!u || !u.startsWith(root)) continue;
      if (urlMap.has(u)) continue;
      if (/\.html?$/i.test(u)) continue;             // 其它页面不追（避免拉全站）
      assetJobs.set(u, u.slice(root.length));
    }
  }
  // 顺带把页面所在目录的 CSS 依赖也抓上（若页面没直接引用 shared/）
  // 下载资源（含 CSS 内 url() 递归一层）
  const done = new Set();
  const queue = [...assetJobs.entries()];
  while (queue.length) {
    const [u, rel] = queue.shift();
    if (done.has(u)) continue;
    done.add(u);
    const g = await C.get(u, p0ref(pages));
    if (!g.ok) { r.notes.push('资源缺失 ' + rel + ' [' + g.status + ']'); continue; }
    const dst = path.join(dir, '_assets', ...rel.split('/').filter(Boolean));
    fs.mkdirSync(path.dirname(dst), { recursive: true });
    fs.writeFileSync(dst, g.buf);
    r.assets.push(rel + ' (' + g.buf.length + 'B)');
    if (/\.css$/i.test(u)) {
      const cssTxt = g.buf.toString('utf8');
      const re = /url\(\s*['"]?([^'")]+)['"]?\s*\)/g;
      let m;
      while ((m = re.exec(cssTxt))) {
        const v = m[1].trim();
        if (!v || /^(https?:|data:|#|\/\/)/i.test(v)) continue;
        let au; try { au = bare(new URL(v, u).href); } catch (e) { continue; }
        if (!au.startsWith(root) || done.has(au)) continue;
        queue.push([au, au.slice(root.length)]);
      }
    }
  }

  // ---- 6) 重写并落盘 ----
  function localize(html, pageUrl) {
    let h = html;
    const absFrom = v => { try { return bare(new URL(v, pageUrl).href); } catch (e) { return null; } };
    const repl = (raw, attr, val) => {
      if (!val) return raw;
      if (/^data:|^javascript:|^mailto:|^tel:/i.test(val)) return raw;
      const u = absFrom(val);
      if (u && urlMap.has(u)) {
        const target = urlMap.get(u);
        if (target === pageUrl2Name(pageUrl)) return attr + '="#"';   // 自指
        return attr + '="' + target + '"';
      }
      if (val === '/page/page_comm/inject.js' || /\/page_comm\/inject\.js$/.test(val)) {
        return attr === 'src' ? 'src="data:," data-removed-inject="1"' : 'href="#" data-removed-inject="1"';
      }
      if (u && u.startsWith(root)) {
        const rel = u.slice(root.length);
        if (/\.html?$/i.test(u)) return attr + '="#" data-offsite-page="' + rel + '"';
        const dest = '_assets/' + rel;
        const depth = pageDepth(pageUrl);
        return attr + '="' + depth + dest + '"';
      }
      if (/^https?:|^\/\//i.test(val)) return raw;   // 外部引用（官方/新闻/政府来源链接）原样保留
      if (val.charAt(0) === '/' && val !== '/') return attr + '="#" data-removed-abs="1"';
      return raw;
    };
    h = h.replace(/(href|src)="([^"]*)"/g, (m, a, v) => repl(m, a, v));
    h = h.replace(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g, (m, v) => {
      const u = absFrom(v);
      if (u && u.startsWith(root) && !/^https?:/i.test(v)) {
        return 'url("' + pageDepth(pageUrl) + '_assets/' + u.slice(root.length) + '")';
      }
      return m;
    });
    return h;
  }
  const pagesByName = {}; for (const p of pages) pagesByName[p.name] = p;
  const pageUrl2Name = u => (urlMap.get(u) || '');
  function pageDepth(u) { return ''; }   // 三个页面都被拍平到方案目录顶层，与 _assets/ 同级
  function p0ref(ps) { return ps.length ? ps[0].url : undefined; }

  for (const p of pages) {
    const h = localize(p.text, p.url);
    fs.writeFileSync(path.join(dir, p.name), h, 'utf8');
    r.files[p.name] = Buffer.byteLength(h);
  }
  r.tasksUrl = tasksUrl || null; r.demoUrl = demoUrl || null;
  r.hasIntro = !!pagesByName['场景引入.html'];
  r.hasTasks = !!pagesByName['推荐任务.html'];
  r.hasDemo = !!pagesByName['LiveDemo.html'];

  // ---- 7) 技能包 + 提示词 ----
  const srcText = pages.map(p => p.text).join('\n');
  let installUrl = null, pkgUrl = null, m;
  m = /(https?:\/\/[^\s"']+install_skill\.py)/.exec(srcText);
  if (m) installUrl = m[1].replace(/["'\s]+$/, '');
  m = /python3\s+install_skill\.py\s+["'](https?:\/\/[^\s"']+)["']/.exec(srcText) || /"(https?:\/\/[^\s"']+\.zip)"/.exec(srcText);
  if (m) pkgUrl = m[1];
  const oc = ONECLICK[slug];
  if (!pkgUrl && oc && oc.pkg) { pkgUrl = oc.pkg; r.notes.push('技能包取自 ONECLICK'); }
  if (!installUrl) installUrl = INSTALL_DEFAULT;
  r.skillName = (oc && oc.skillName) || (C.parseTasks(pagesByName['推荐任务.html'] ? pagesByName['推荐任务.html'].text : '').title) || '';
  if (pkgUrl) {
    const g = await C.get(pkgUrl);
    if (g.ok && g.buf.slice(0, 2).toString('latin1') === 'PK') {
      const zn = '技能包_' + C.safe(r.skillName || slug, 40) + '.zip';
      fs.writeFileSync(path.join(dir, zn), g.buf);
      r.files[zn] = g.buf.length; r.pkgUrl = pkgUrl; r.pkgName = zn; r.hasPkg = true;
    } else { r.notes.push('技能包下载失败 [' + g.status + '] ' + pkgUrl); }
  } else { r.notes.push('本方案无技能包'); }

  // ---- 8) 提示词 Markdown ----
  function parseDemoPrompts(h) {
    const plain = s => s.replace(/<button[\s\S]*?<\/button>/g, '')
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<\/?[a-zA-Z][^>]*>/g, ' ')
      .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
      .replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
    let prompts = [...h.matchAll(/<div[^>]*class="prompt"[^>]*id="([^"]*)"[^>]*>([\s\S]*?)<\/div>/g)]
      .map(m => ({ id: m[1], text: plain(m[2]) })).filter(x => x.text);
    if (!prompts.length) {
      prompts = [...h.matchAll(/<div[^>]*class="prompt"[^>]*>([\s\S]*?)<\/div>/g)]
        .map(m => ({ id: '', text: plain(m[1]) })).filter(x => x.text);
    }
    // 家族二：HR 场景页用 <div class="prompt-box">，正文可能直接内联或包在 pb-text 里
    if (!prompts.length) {
      prompts = [...h.matchAll(/<div[^>]*class="prompt-box"[^>]*>([\s\S]*?)<\/div>/g)]
        .map(m => ({ id: '', text: plain(m[1]) })).filter(x => x.text);
    }
    return { prompts };
  }
  const T = pagesByName['推荐任务.html'] ? C.parseTasks(pagesByName['推荐任务.html'].text) : { tasks: [], skillPrompt: '', lead: '', intro: [] };
  const I = C.parseIntro(pagesByName['场景引入.html'] ? pagesByName['场景引入.html'].text : '');
  const D = pagesByName['LiveDemo.html'] ? parseDemoPrompts(pagesByName['LiveDemo.html'].text) : { prompts: [] };
  r.taskCount = T.tasks.length;
  r.demoPromptCount = D.prompts.length;
  const L = [];
  L.push('# ' + (sol.t || T.title || slug));
  L.push('');
  if (T.lead || I.lead) { L.push('> ' + (T.lead || I.lead)); L.push(''); }
  L.push('| 项 | 值 |');
  L.push('| --- | --- |');
  L.push('| 行业 | ' + (r.ind || '—') + ' |');
  L.push('| 角色 | ' + ((r.roles && r.roles.length) ? r.roles.join('、') : '—') + ' |');
  L.push('| 状态 | ' + (r.status || '—') + ' |');
  L.push('| 类型 | ' + (r.scope || '—') + ' |');
  L.push('| 技能名 | ' + (r.skillName || '—') + ' |');
  L.push('| 推荐任务数 | ' + T.tasks.length + ' |');
  L.push('| Live Demo 提示词数 | ' + D.prompts.length + ' |');
  L.push('| 技能包 | ' + (r.pkgName || '（无）') + ' |');
  L.push('| 官方来源 | ' + sol.src + ' |');
  L.push('');
  L.push('## 一、技能包安装（装过一次会自动跳过）');
  L.push('');
  L.push(FENCE + 'bash');
  L.push('# 1) 下载官方安装脚本');
  L.push('curl -L -o install_skill.py "' + installUrl + '"');
  L.push('');
  L.push('# 2) 安装技能包（并把演示数据取到「输入参考文件」目录）');
  L.push(pkgUrl ? 'python3 install_skill.py "' + pkgUrl + '"' : '# 本方案未提供技能包');
  L.push(FENCE);
  L.push('');
  if (pkgUrl) { L.push('本地已保存：**' + (r.pkgName || '') + '**　（官方地址：' + pkgUrl + '）'); L.push(''); }
  if (T.skillPrompt) { L.push('### 页面内完整安装提示词（原文照录）'); L.push(''); L.push(FENCE + 'text'); L.push(T.skillPrompt); L.push(FENCE); L.push(''); }
  const CN = ['一', '二', '三', '四', '五', '六'];
  let sec = 1;   // 「一」已用于技能包安装
  if (T.tasks.length) {
    L.push('## ' + CN[sec++] + '、推荐任务提示词（共 ' + T.tasks.length + ' 条，复制即用）');
    L.push('');
    if (T.intro && T.intro[1] && T.intro[1].sub) { L.push('> ' + T.intro[1].sub + '。第 1 条为默认体验任务，与详情页「一键体验」入口一致。'); L.push(''); }
    for (const x of T.tasks) {
      L.push('### ' + x.no + '　' + (x.ttl || ''));
      if (x.star) L.push('*' + (x.star.length < 40 ? x.star : '与一键体验入口一致') + '*');
      L.push('');
      L.push(FENCE + 'text');
      L.push(x.prompt);
      L.push(FENCE);
      L.push('');
    }
  } else {
    L.push('## ' + CN[sec++] + '、推荐任务提示词');
    L.push('');
    L.push('> 本方案官方未提供「推荐任务」页（该页返回 404），因此没有 10 条任务模板。可用的提示词见下方「Live Demo 页面内提示词」。');
    L.push('');
  }
  if (D.prompts.length) {
    L.push('## ' + CN[sec++] + '、Live Demo 页面内提示词（共 ' + D.prompts.length + ' 条）');
    L.push('');
    L.push('> 取自 Live Demo 演示页「提示词」区块的原文，是该场景演示时实际使用的指令。');
    L.push('');
    for (const dp of D.prompts) {
      L.push(FENCE + 'text');
      L.push(dp.text);
      L.push(FENCE);
      L.push('');
    }
  }
  if (I.sections && I.sections.length) {
    L.push('## ' + CN[sec++] + '、场景引入正文（纯文本，便于全文搜索）');
    L.push('');
    L.push('> 摘自本方案的「场景引入」介绍页；完整版式请直接打开同目录的 场景引入.html。');
    L.push('');
    for (const s of I.sections) {
      L.push('### ' + s.h);
      if (s.sub) { L.push(''); L.push('*' + s.sub + '*'); }
      L.push('');
      L.push(s.body);
      L.push('');
    }
  }
  const mdName = '提示词与说明.md';
  const md = L.join('\n');
  fs.writeFileSync(path.join(dir, mdName), md, 'utf8');
  r.files[mdName] = Buffer.byteLength(md);
  r.dir = dirRel;
  r.tier = (r.hasTasks && r.hasPkg) ? 'A_完整（推荐任务+技能包）'
    : (r.hasTasks ? 'B_推荐任务无技能包'
      : (r.demoPromptCount ? 'C_两页含Demo提示词' : 'D_两页无提示词'));
  if (r.tier === 'A_完整（推荐任务+技能包）') stats.ok++; else stats.partial++;
  return r;
}

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const t0 = Date.now();
  const results = new Array(list.length);
  let cursor = 0;
  async function worker() {
    while (true) {
      const i = cursor++;
      if (i >= list.length) return;
      const sol = list[i];
      try { results[i] = await one(sol, i); }
      catch (e) { results[i] = { sid: sol.sid, t: sol.t, src: sol.src, notes: ['异常: ' + (e && e.message)], hasIntro: 0 }; stats.failed++; }
      const d = results[i];
      console.log('[' + String(i + 1).padStart(3) + '/' + list.length + '] '
        + (d.hasIntro ? 'H' : '-') + (d.hasTasks ? 'T' : '-') + (d.hasDemo ? 'D' : '-') + (d.hasPkg ? 'Z' : '-')
        + ' ' + String(sol.t || '').slice(0, 24)
        + (d.notes && d.notes.length ? '  ! ' + d.notes.join(' | ').slice(0, 100) : ''));
    }
  }
  await Promise.all(Array.from({ length: Math.max(1, Math.min(CONC, list.length)) }, worker));
  const manifest = { generatedAt: new Date().toISOString(), source: 'https://www.workbuddy.cn/space/d/ZljbYQzFpALFLcPwKPlct1', version: 210, total: list.length, ok: stats.ok, partial: stats.partial, failed: stats.failed, rows: results };
  fs.writeFileSync(path.join(__dirname, 'last_run.json'), JSON.stringify(manifest, null, 1), 'utf8');
  console.log('');
  console.log('=== 完成 ' + ((Date.now() - t0) / 1000).toFixed(1) + 's | 完整 ' + stats.ok + ' | 部分 ' + stats.partial + ' | 失败 ' + stats.failed + ' ===');
  console.log('输出目录: ' + OUT);
})();
