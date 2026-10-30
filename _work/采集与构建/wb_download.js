// -*- coding: utf-8 -*-
// WorkBuddy 解决方案库 — 批量下载器
// 用法: node wb_download.js [--limit N] [--from N] [--only slug1,slug2] [--out DIR] [--conc 8] [--nodemo]
const fs = require('fs');
const path = require('path');
const C = require(path.join(__dirname, 'wb_core.js'));
const FENCE = String.fromCharCode(96, 96, 96);   // 三个反引号

const argv = process.argv.slice(2);
const arg = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d; };
const LIMIT = arg('--limit') ? parseInt(arg('--limit'), 10) : Infinity;
const FROM = arg('--from') ? parseInt(arg('--from'), 10) : 0;
const ONLY = arg('--only') ? String(arg('--only')).split(',').map(s => s.trim()).filter(Boolean) : null;
const CONC = parseInt(arg('--conc', '8'), 10);
const NO_DEMO = argv.indexOf('--nodemo') >= 0;
const PROBE = path.join(__dirname, '..', '_probe');
const OUT = path.resolve(arg('--out', path.join(__dirname, '..', 'WorkBuddy解决方案库')));
const DATA = JSON.parse(fs.readFileSync(path.join(PROBE, 'v210_data.json'), 'utf8'));
const ONECLICK = DATA.ONECLICK || {};
const INSTALL_DEFAULT = 'https://workbuddy-space-static.codebuddy.work/page/C4IMIxqXQDzznN6KEtzqft/1/install_skill.py';

let list = DATA.SOLUTIONS.filter(s => s.src && String(s.src).trim());
if (ONLY) list = list.filter(s => ONLY.some(o => String(s.src).indexOf('/' + o + '.html') >= 0 || String(s.src).indexOf(o) >= 0));
const all = list.slice();
list = all.slice(FROM, FROM + (LIMIT === Infinity ? all.length : LIMIT));

function parseSrc(src) {
  const p = new URL(src).pathname;
  const m = /^\/page\/([^/]+)\/([^/]+)\/(.+)$/.exec(p);
  if (!m) return null;
  return { node: m[1], ver: m[2], rest: m[3], base: C.STATIC + '/page/' + m[1] + '/' + m[2] + '/' };
}
const stats = { ok: 0, partial: 0, failed: 0 };

async function one(sol, idx) {
  const r = { sid: sol.sid, t: sol.t, ind: sol.ind || '', roles: sol.roles || [], status: sol.status || '', scope: sol.scope || '', src: sol.src, notes: [], files: {} };
  const info = parseSrc(sol.src);
  if (!info) { r.notes.push('无法解析来源路径'); stats.failed++; return r; }
  const slug = info.rest.replace(/^.*\//, '').replace(/\.html$/, '');
  const inDD = info.rest.indexOf('deep-dives/') === 0;
  const dirRel = String(sol.sid != null ? sol.sid + 1 : idx + 1).padStart(3, '0') + '_' + C.safe(sol.t || 'solution', 60);
  const dir = path.join(OUT, dirRel);
  fs.mkdirSync(dir, { recursive: true });

  const cand = {
    intro: [info.rest, inDD ? 'deep-dives/' + slug + '.html' : slug + '.html'],
    tasks: inDD ? ['deep-dives/' + slug + '-tasks.html'] : [slug + '-tasks.html', 'deep-dives/' + slug + '-tasks.html'],
    demo: ['live-demos/' + slug + '/index.html'],
  };
  async function pick(arr) { for (const rel of arr) { const g = await C.getText(info.base + rel); if (g.ok) return { rel: rel, text: g.text }; } return null; }

  const got = {};
  const tasks = [];
  tasks.push(pick(cand.intro).then(v => { if (v) got.intro = v; }));
  tasks.push(pick(cand.tasks).then(v => { if (v) got.tasks = v; }));
  if (!NO_DEMO) tasks.push(pick(cand.demo).then(v => { if (v) got.demo = v; }));
  await Promise.all(tasks);
  if (!got.intro) { r.notes.push('场景引入页获取失败'); stats.failed++; return r; }

  // ---- 提示词 / 技能包 URL ----
  const srcText = (got.tasks ? got.tasks.text : '') + '\n' + (got.intro ? got.intro.text : '');
  let installUrl = null, pkgUrl = null;
  let m = /curl[^\n]*?install_skill\.py["']?\s+["']?(https?:\/\/[^\s"']+)/.exec(srcText) || /(https?:\/\/[^\s"']+install_skill\.py)/.exec(srcText);
  if (m) installUrl = m[1].replace(/["'\s]+$/, '');
  m = /python3\s+install_skill\.py\s+["'](https?:\/\/[^\s"']+)["']/.exec(srcText) || /"(https?:\/\/[^\s"']+\.zip)"/.exec(srcText);
  if (m) pkgUrl = m[1];
  const oc = ONECLICK[slug];
  if (!pkgUrl && oc && oc.pkg) { pkgUrl = oc.pkg; r.notes.push('技能包取自 ONECLICK'); }
  if (!installUrl) installUrl = INSTALL_DEFAULT;
  r.skillName = (oc && oc.skillName) || '';

  // ---- 重写本地引用并落盘 ----
  const squote = C.decode;
  function rewrite(html) {
    let h = html;
    h = h.replace(/href="\/page\/page_comm\/inject\.js"/g, 'href="#" data-removed-inject="1"');
    h = h.replace(/src="\/page\/page_comm\/inject\.js"/g, 'src="data:," data-removed-inject="1"');
    h = h.replace(/\.\.\/\.\.\/shared\//g, '../_shared/').replace(/\.\.\/shared\//g, '../_shared/');
    h = h.replace(new RegExp('(\\.\\.\\/)+deep-dives\\/' + slug + '-tasks\\.html', 'g'), '../推荐任务.html');
    h = h.replace(new RegExp('(\\.\\.\\/)+deep-dives\\/' + slug + '\\.html', 'g'), '../场景引入.html');
    h = h.replace(new RegExp('(\\.\\.\\/)+live-demos\\/' + slug + '\\/index\\.html', 'g'), '../LiveDemo.html');
    h = h.replace(/(?:href|src)="\/(?!\/)[^"]*"/g, 'href="#" data-removed-abs="1"');
    return h;
  }
  const pageNames = { intro: '场景引入.html', tasks: '推荐任务.html', demo: 'LiveDemo.html' };
  const extraRefs = new Set();
  for (const k of ['intro', 'tasks', 'demo']) {
    if (!got[k]) continue;
    const h = rewrite(got[k].text);
    fs.writeFileSync(path.join(dir, pageNames[k]), h, 'utf8');
    r.files[pageNames[k]] = Buffer.byteLength(h);
    for (const ref of C.localRefs(got[k].text)) {
      if (/^(\.\.\/)+(shared|deep-dives|live-demos)\//.test(ref)) continue;
      if (/^(场景引入|推荐任务|LiveDemo)/.test(ref)) continue;
      if (ref.indexOf('http') === 0) continue;
      extraRefs.add(ref);
    }
  }
  r.hasIntro = !!got.intro; r.hasTasks = !!got.tasks; r.hasDemo = !!got.demo;

  // ---- 公共样式 ----
  const sharedDir = path.join(OUT, '_shared');
  fs.mkdirSync(sharedDir, { recursive: true });
  for (const cs of ['style.css', 'discrete-extra.css']) {
    const dst = path.join(sharedDir, cs);
    if (fs.existsSync(dst)) continue;
    const g = await C.get(info.base + 'shared/' + cs);
    if (g.ok) fs.writeFileSync(dst, g.buf);
  }

  // ---- 附加资源（assets 等）----
  r.assets = [];
  for (const ref of extraRefs) {
    const clean = ref.replace(/^(\.\.\/)+/, '');
    const segs = clean.split('/').filter(s => s && s !== '.' && s !== '..');
    if (!segs.length) continue;
    const dst = path.join(dir, ...segs);
    if (fs.existsSync(dst)) continue;
    const g = await C.get(info.base + segs.map(s => encodeURIComponent(s)).join('/'));
    if (g.ok) { fs.mkdirSync(path.dirname(dst), { recursive: true }); fs.writeFileSync(dst, g.buf); r.assets.push(clean + ' (' + g.buf.length + 'B)'); }
    else r.notes.push('附加资源缺失 ' + clean + ' [' + g.status + ']');
  }

  // ---- 技能包 ----
  if (pkgUrl) {
    const g = await C.get(pkgUrl);
    if (g.ok && g.buf.slice(0, 2).toString('latin1') === 'PK') {
      const zn = '技能包_' + C.safe(r.skillName || slug, 40) + '.zip';
      fs.writeFileSync(path.join(dir, zn), g.buf);
      r.files[zn] = g.buf.length; r.pkgUrl = pkgUrl; r.pkgName = zn; r.hasPkg = true;
    } else { r.notes.push('技能包下载失败 [' + g.status + '] ' + pkgUrl); }
  } else { r.notes.push('本方案无技能包'); }

  // ---- 提示词 Markdown ----
  const T = got.tasks ? C.parseTasks(got.tasks.text) : { tasks: [], skillPrompt: '', lead: '', intro: [] };
  const I = C.parseIntro(got.intro.text);
  r.taskCount = T.tasks.length;
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
  L.push('## 二、推荐任务提示词（共 ' + T.tasks.length + ' 条，复制即用）');
  L.push('');
  if (T.intro && T.intro[1] && T.intro[1].sub) { L.push('> ' + T.intro[1].sub + '。第 1 条为默认体验任务，与详情页「一键体验」入口一致。'); L.push(''); }
  for (const x of T.tasks) {
    L.push('### ' + x.no + '　' + (x.ttl || ''));
    if (x.star) { L.push('*' + (x.star && x.star.length < 40 ? x.star : '与一键体验入口一致') + '*'); }
    L.push('');
    L.push(FENCE + 'text');
    L.push(x.prompt);
    L.push(FENCE);
    L.push('');
  }
  if (I.sections && I.sections.length) { L.push('## 三、场景引入正文（纯文本）'); L.push(''); for (const s of I.sections) { L.push('### ' + s.h); L.push(''); L.push(s.body); L.push(''); } }
  const mdName = '提示词与说明.md';
  const md = L.join('\n');
  fs.writeFileSync(path.join(dir, mdName), md, 'utf8');
  r.files[mdName] = Buffer.byteLength(md);
  r.dir = dirRel;
  const good = r.hasIntro && r.hasTasks && r.hasPkg;
  if (good) stats.ok++; else stats.partial++;
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
        + ' ' + String(sol.t || '').slice(0, 26)
        + (d.notes && d.notes.length ? '  ! ' + d.notes.join(' | ').slice(0, 110) : ''));
    }
  }
  await Promise.all(Array.from({ length: Math.max(1, Math.min(CONC, list.length)) }, worker));
  const manifest = { generatedAt: new Date().toISOString(), source: 'https://www.workbuddy.cn/space/d/ZljbYQzFpALFLcPwKPlct1', version: 210, total: list.length, ok: stats.ok, partial: stats.partial, failed: stats.failed, rows: results };
  fs.writeFileSync(path.join(__dirname, 'last_run.json'), JSON.stringify(manifest, null, 1), 'utf8');
  console.log('');
  console.log('=== 完成 ' + ((Date.now() - t0) / 1000).toFixed(1) + 's | 完整 ' + stats.ok + ' | 部分 ' + stats.partial + ' | 失败 ' + stats.failed + ' ===');
  console.log('输出目录: ' + OUT);
})();
