// extract_value.js v2 — 从 693 个「场景引入」页抽取业务价值 / ROI / 交互维度
// 原则：只记录官方页面自己写下的内容；量化对比只取页面自身的对照区块，不做跨段拼凑。
const fs = require('fs'), path = require('path');
const TOP = 'D:/WorkbuddyUseCase';
const ROOT = TOP + '/WorkBuddy解决方案库';
const B = TOP + '/_work/采集与构建';
const rows = JSON.parse(fs.readFileSync(B + '/last_run.json', 'utf8')).rows;

function hasCls(tag, cls) {
  const m = tag.match(/class="([^"]*)"/); if (!m) return false;
  return m[1].split(/\s+/).indexOf(cls) >= 0;
}
// 括号配平取块（只按同名标签）
function blocks(html, tag, cls, limit) {
  const out = [];
  const open = new RegExp('<' + tag + '\\b[^>]*>', 'gi');
  const all = new RegExp('<' + tag + '\\b[^>]*>|<\\/' + tag + '>', 'gi');
  let m;
  while ((m = open.exec(html))) {
    if (!hasCls(m[0], cls)) continue;
    let depth = 1, end = html.length, t;
    all.lastIndex = open.lastIndex;
    while ((t = all.exec(html))) {
      if (t[0].charAt(1) === '/') { depth--; if (!depth) { end = t.index; break; } } else depth++;
    }
    out.push(html.slice(open.lastIndex, end));
    if (limit && out.length >= limit) break;
  }
  return out;
}
function txt(h) {
  return h.replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<\/?[a-zA-Z][^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ').trim();
}
const paras = h => [...h.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map(m => txt(m[1])).filter(Boolean);
const lis = h => [...h.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)].map(m => txt(m[1])).filter(Boolean);
const innerDiv = (h, c) => { const m = h.match(new RegExp('<div[^>]*class="[^"]*\\b' + c + '\\b[^"]*"[^>]*>([\\s\\S]*?)<\\/div>')); return m ? txt(m[1]) : ''; };

const TU = { '秒': 1 / 60, '分钟': 1, '小时': 60, '个工作日': 480, '工作日': 480, '天': 480, '周': 2400, '个月': 9600, '月': 9600 };
function toMin(n, u) {
  const k = TU[u]; if (!k) return null;
  const p = String(n).replace(/,/g, '').split(/[-~～—到]/).map(x => parseFloat(x)).filter(x => !isNaN(x));
  if (!p.length) return null;
  return Math.round(p.reduce((a, b) => a + b, 0) / p.length * k * 100) / 100;
}
function times(s) {
  const out = []; let m;
  const re = /(\d[\d,]*(?:\.\d+)?(?:\s*[-~～—到]\s*\d[\d,]*(?:\.\d+)?)?)\s*(个工作日|工作日|小时|分钟|秒|天|周|个月|月)/g;
  while ((m = re.exec(s || ''))) { const v = toMin(m[1], m[2]); if (v) out.push({ raw: m[1].trim() + ' ' + m[2], min: v }); }
  return out;
}
const numWords = s => (s.match(/\d[\d,\.]*\s*(?:小时|分钟|天|周|倍|%|％|万元|元|人|件|张|单|条|项)/g) || []).length;

const KIND = [[/\.xlsx?$/i, 'Excel'], [/\.docx?$/i, 'Word'], [/\.pptx?$/i, 'PPT'], [/\.pdf$/i, 'PDF'],
              [/\.csv$/i, 'CSV'], [/\.md$/i, 'Markdown'], [/看板|仪表|面板|dashboard|可视化/i, '看板']];
// 交互维度：从「要准备什么」的输入类型推断
const SRCKIND = [[/邮件|询价邮件|邮件截图/, '邮件'], [/图纸|CAD|照片|现场照片|图片/, '图纸/图片'], [/Excel|xlsx|表格|台账|明细表|汇总表|报表/, 'Excel/表格'],
                 [/系统|ERP|MES|OA|CRM|WMS|SRM|金蝶|用友/, '业务系统'], [/微信|企微|群|聊天/, 'IM/聊天'], [/PDF|扫描件|合同|标书/, 'PDF/文档'],
                 [/录音|会议记录|纪要|语音/, '音频/纪要'], [/数据库|SQL|接口|API/, '数据库/接口']];

const EN = {};
const stat = { ev: 0, diff: 0, score: 0, cv: 0, pain: 0, outs: 0, srcs: 0, cmp: 0, cmpQuant: 0, steps: 0, nums: 0, kinds: 0, srckinds: 0 };

for (const r of rows) {
  const p = path.join(ROOT, r.dir, '场景引入.html');
  if (!fs.existsSync(p)) continue;
  const h = fs.readFileSync(p, 'utf8');
  const o = {};

  // ① 为什么这个场景值得做（card ev）
  // 该卡片混有官方的方法论样板文字，必须剔除，否则会被误当成「业务价值」：
  //   · 评分公式行  `痛感 4 × AI 适配 5 ÷ 落地难度 2 = 10.0`
  //   · 评分口径说明行 `评分口径：痛感看「…」；AI 适配看「…」；落地难度是分母 —— …`
  // 真正逐方案不同的价值句是「最大差异点 · …」
  const isBoiler = s => /^痛感\s*[\d.]+\s*[×x*]\s*AI/.test(s) || /^评分口径/.test(s) || /^[\d.]+\s*$/.test(s);
  const SCORE_RE = /痛感\s*(\d+(?:\.\d+)?)\s*[×x*]\s*AI\s*适配\s*(\d+(?:\.\d+)?)\s*[÷\/]\s*落地难度\s*(\d+(?:\.\d+)?)\s*=\s*([\d.]+)/;
  const ev = blocks(h, 'div', 'ev', 1)[0];
  if (ev) {
    const ps = paras(ev);
    const sc = ps.map(x => x.match(SCORE_RE)).find(Boolean);
    // 官方评分（痛感 × AI 适配 ÷ 落地难度），逐方案不同，是一个真实的价值维度
    if (sc) o.score = { pain: +sc[1], ai: +sc[2], diff: +sc[3], value: +sc[4] };
    o.ev = ps.filter(x => !isBoiler(x)).slice(0, 3);
    if (o.ev.length) stat.ev++;
    const dp = o.ev.find(x => /^最大差异点/.test(x));
    if (dp) o.diff = dp.replace(/^最大差异点\s*[·:：]?\s*/, '').trim();
  }

  // ② 核心价值 / 沉淀价值卡片
  const cvM = h.match(/(?:核心价值|沉淀价值|三个核心价值)<\/h3>/);
  if (cvM) {
    const win = h.slice(cvM.index, cvM.index + 5000);
    o.cv = blocks(win, 'div', 'card').map(c => {
      const t = c.match(/<h3[^>]*>([\s\S]*?)<\/h3>/);
      const body = txt(c.replace(/<h3[^>]*>[\s\S]*?<\/h3>/, ''));
      return { h: t ? txt(t[1]) : '', t: body };
    }).filter(x => x.h && x.t).slice(0, 5);
    if (o.cv.length) stat.cv++;
  }

  // ③ 痛点（可量化）
  const pw = blocks(h, 'div', 'pain');
  if (pw.length) { o.pain = pw.map(b => ({ i: innerDiv(b, 'i'), t: innerDiv(b, 't') })).filter(x => x.t).slice(0, 8); if (o.pain.length) stat.pain++; }

  // ④ 对照区块（ROI 唯一可信来源）
  const cmp = blocks(h, 'div', 'cmp', 1)[0];
  let oldT = '', newT = '';
  if (cmp) {
    oldT = txt(blocks(cmp, 'div', 'old', 1)[0] || '');
    newT = txt(blocks(cmp, 'div', 'new', 1)[0] || '');
    stat.cmp++;
  }
  if (!oldT && !newT) {           // pv-grid 形态
    const pv = blocks(h, 'div', 'pv', 1)[0];
    if (pv) {
      const pb = blocks(pv, 'div', 'pain', 1)[0], vb = blocks(pv, 'div', 'val', 1)[0];
      if (pb || vb) { oldT = txt(pb || ''); newT = txt(vb || ''); stat.cmp++; }
    }
  }
  if (oldT || newT) {
    const oR = {}; const tA = times(oldT), tB = times(newT);
    if (tA.length) oR.before = tA[0].raw;
    if (tB.length) oR.after = tB[0].raw;
    if (tA.length && tB.length && tA[0].min > tB[0].min) oR.speed = Math.round(tA[0].min / tB[0].min * 10) / 10;
    o.cmp = { old: oldT.replace(/^[✕✓\s]*现在的做法\s*/, '').replace(/^[✕✓\s]*(传统做法|WorkBuddy( 的做法)?|交给 Agent 之后)\s*/, ''), new: newT.replace(/^[✕✓\s]*(交给 Agent 之后|WorkBuddy( 的做法)?|传统做法)\s*/, '') };
    o.roi = oR;
    if (oR.speed) stat.cmpQuant++;
  }

  // ⑤ 会产出什么
  const outs = blocks(h, 'div', 'out');
  if (outs.length) {
    o.outs = outs.map(b => ({ on: innerDiv(b, 'on'), ot: innerDiv(b, 'ot'), od: innerDiv(b, 'od') })).filter(x => x.on || x.ot).slice(0, 12);
    if (o.outs.length) stat.outs++;
  }

  // ⑥ 要准备什么（输入材料）
  const srcs = blocks(h, 'div', 'src').slice(0, 12);
  if (srcs.length) {
    o.srcs = srcs.map(b => ({ fn: innerDiv(b, 'fn'), fd: innerDiv(b, 'fd') })).filter(x => x.fn);
    if (o.srcs.length) stat.srcs++;
  }

  // ⑦ 场景闭环步数
  const st = blocks(h, 'div', 'step');
  if (st.length) { o.steps = st.length; stat.steps++; }

  // ⑧ 全页量化证据（原样保留，不做跨段配对）
  const full = txt(h);
  const nums = []; let mm;
  const rr = /[^。；;]{0,18}\d[\d,\.]*\s*(?:小时|分钟|天|周|倍|%|％|万元|元)[^。；;]{0,18}/g;
  while ((mm = rr.exec(full)) && nums.length < 10) {
    const s = mm[0].trim();
    if (/border-radius|font-size|rgba|\dpx|width|height|margin|padding|translate|rotate|scale|linear-gradient|#[0-9a-f]{3,6}|font-weight|opacity|transition|ease|flex|top:|left:|right:|bottom:/.test(s)) continue;
    if (/痛感\s*[\d.]+\s*[×x*]\s*AI|评分口径/.test(s)) continue;
    nums.push(s);
  }
  if (nums.length) { o.nums = nums; stat.nums++; }

  // ⑪ 价值一句话（供索引/分析页展示，全部来自官方原文）
  // 优先级：官方「最大差异点」> card ev 首段 > 核心价值卡片 > 改造后对照
  const valLine = [];
  if (o.diff) valLine.push(o.diff);
  else if (o.ev && o.ev.length) valLine.push(o.ev[0]);
  else if (o.cv && o.cv.length) valLine.push(o.cv[0].h + '：' + o.cv[0].t);
  else if (o.cmp && o.cmp.new) valLine.push(o.cmp.new);
  if (valLine.length) o.val = valLine[0].slice(0, 300);
  if (o.diff) stat.diff++;
  if (o.score) stat.score++;

  // ⑨ 产出类型
  const ks = new Set();
  (o.outs || []).forEach(x => { for (const [re2, k] of KIND) if (re2.test(x.ot)) ks.add(k); });
  if (ks.size) { o.kinds = [...ks]; stat.kinds++; }

  // ⑩ 输入类型（交互维度）
  const sk = new Set();
  (o.srcs || []).forEach(x => { const s = x.fn + ' ' + x.fd; for (const [re2, k] of SRCKIND) if (re2.test(s)) sk.add(k); });
  if (sk.size) { o.srckinds = [...sk]; stat.srckinds++; }

  EN[r.dir] = o;
}
fs.writeFileSync(B + '/enrich.json', JSON.stringify(EN), 'utf8');
console.log('pages:', Object.keys(EN).length);
console.log('coverage:', JSON.stringify(stat));
const withPair = Object.values(EN).filter(x => x.roi && x.roi.before && x.roi.after).length;
const withSpeed = Object.values(EN).filter(x => x.roi && x.roi.speed).length;
console.log('roi both sides:', withPair, '| speed ratio:', withSpeed, '| cmp any text:', Object.values(EN).filter(x => x.cmp).length);
console.log('speed samples:');
Object.entries(EN).filter(([d, x]) => x.roi && x.roi.speed).slice(0, 20).forEach(([d, x]) => console.log('  [' + d + '] ' + x.roi.before + ' -> ' + x.roi.after + '  (' + x.roi.speed + '×)'));
