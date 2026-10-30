/* ================= 第二部分：技术形态共性分析 ================= */
const nOf = k => DATA.filter(r => r[k]).length;

/* ---------- 11 论断核实 ---------- */
const VERDICTS = [
  { v: 'ok', bg: '成立', t: '几乎没有代码型 workflow —— 本质是「针对场景写提示词」',
    claim: '你的判断：本质是在针对场景写提示词，几乎没有代码型 workflow。',
    pts: [
      ['286 个技能包里含代码文件的包 = <b>0 个</b>', '扫描全部 2153 个 zip 条目，扩展名只有 .md 864 / .xlsx 1013 / .txt 223 / .docx 43 / .csv 6 / .pdf 4 —— 没有任何 .js / .py / .sql / .yaml / .json。'],
      ['技能包的「处理逻辑」全部写在 Markdown 里', '每包必有 SKILL.md（286 / 286，平均 6219 字节），references/ 下 578 个文件 100% 是 .md。'],
      ['693 个方案都要求你先跑一条安装命令', '提示词里都含 python3 install_skill.py <pkg.zip> —— 这是整条链路里唯一的「代码」，且是官方统一提供的安装器，不是方案自带的逻辑。']
    ] },
  { v: 'ok', bg: '成立', t: '几乎没有以 MCP 连接器接入的',
    claim: '你的判断：几乎没有以 MCP 链接器接入的。',
    pts: [
      ['全库 693 个方案里提到 MCP 的只有 <b>2 个</b>（0.29%）', '088 业务会议纪要行动项（腾讯会议 MCP 拉取录制转写）、690 餐饮智能点餐助手（品牌 MCP Server 路由）。'],
      ['这 2 个也都不是「方案自己连好了」', '两例原文都写成前提条件：「连接器已信任、Token 由用户自行获取」「您的品牌 MCP Server 已配置」。'],
      ['mcp.json / mcpServers 这类配置文件写法只命中 1 个方案', '690 餐饮智能点餐助手。']
    ] },
  { v: 'ok', bg: '成立', t: '是独立于企业系统的「外挂型」应用，不嵌入、不深度结合',
    claim: '你的判断：几乎都是独立于企业常用信息化系统之外的补充，类似外挂型应用，没有与业务系统深度结合或嵌入交互。',
    pts: [
      ['「嵌入到现有系统 / 侧边栏 / 插件形式」命中 <b>0 个方案</b>', '正则 嵌入(到|进)?(现有|已有|企业)?(系统|OA|ERP|门户)|侧边栏|插件形式|在系统内|系统内嵌 → 693 个方案全库 0 命中。'],
      ['用代码调接口命中 <b>0 个方案</b>', 'requests.get/post、httpx、fetch()、axios、API 调用 → 全库 0 命中。'],
      ['连数据库命中 <b>1 个方案</b>', '仅 663 系统监控与告警分析。'],
      ['有 ' + nOf('sys') + ' 个方案提到系统名，但绝大多数是业务背景', '回读原文：「ERP 库存账 · 月末导出」「ERP 实时导出的本店 487 个 OTC 品种」—— 是从系统里<b>导出</b>，不是连上系统。'],
      ['官方把「不要求先打通」当成卖点', '054：「不要求先把三个模块打通。三处导出的原始 Excel 直接扔进来」；075：「这件事完全不需要任何系统对接」；648：「不需要对接（ERP）」。']
    ] },
  { v: 'ok', bg: '成立', t: '输入是企业系统的「导出文件」，输出也是独立文件',
    claim: '你的判断：输入几乎都是 excel、word、ppt、pdf、图片等外挂数据源；输出也是独立的 excel、word… 或 html，几乎没有与已有系统互联互动。',
    pts: [
      ['技能包里的输入文件类型：.xlsx 1013 / .txt 223 / .docx 43 / .csv 6 / .pdf 4', '286 个包共 1329 个输入文件，<b>无 PPT、无图片、无数据库导出格式</b>；每包 2–9 个文件（中位数 5）。'],
      ['129 / 286 个包的输入<b>全部是 Excel</b>', '另有 43 + 4 个包用到 Word / PDF，也都是一次性的静态文件。'],
      ['官方要求的动作就是「导出 → 拖进来」', '提及「导出」的方案 <b id="cExpo">257</b> 个；要求「上传 / 拖入 / 扔进来 / 附件」的 <b id="cUp">360</b> 个。典型原文：「在制工单我导出来了」「我方出货明细也导出来了」「所有后台都能一键导出」。'],
      ['输出侧：产出文件型 <b>693 / 693</b>，纯对话回答型 <b>0</b> 个', 'Excel 595 ・ Word 101 ・ Markdown 28 ・ 看板 18 ・ CSV 11 ・ PDF 2。'],
      ['少数承认「可以对接」的，也都给了退路', '216：「您的 CRM 若有开放接口，记录可以同步过去，<b>没有就留在 Excel</b>」；676：「转化数据需 CRM / POS 对接…纯内容端仅追踪阅读 / 互动」。']
    ] },
  { v: 'part2', bg: '成立但需补充', t: '几乎都是「单点型」场景 —— 但每个单点自身是完整闭环',
    claim: '你的判断：解决方案几乎都是单点型场景，几乎没有形成端到端的业务链型方案。',
    pts: [
      ['跨方案引用的只有 <b>31 个方案</b>（4.5%）', '正则「衔接 X」全库命中 31 页；被引用最多的是 培训需求分析（7 次）、滞销款店间调拨建议（4 次）。'],
      ['「端到端 / 全链路」字面出现 <b>39 个方案</b>，但读原文多为「这一个方案自身完整」', '不是在描述跨方案链条。'],
      ['确实存在链条，但集中在 HR 人事域', '088 会议纪要行动项 → 人员汰换评估 → 继任计划；103 课件 / SOP 生成 → 104 培训效果评估 → 培训需求分析；090 / 091 / 092 薪酬三件套互引。这几条是官方自己写明了的。'],
      ['官方画出的执行步骤数：≥6 步的只有 <b>21 个方案</b>', '分布 = 3 步 7 个 / 5 步 2 个 / 6 步 7 个 / 7 步 12 个 / 8 步 2 个 —— 单场景内部链条不算长，绝大多数是 1–5 步。'],
      ['补充：「单点」是设计选择，不是能力缺陷', '每个方案都被设计成「一个人 + 一个 Agent + 一批文件」的闭环，好处是任一场景可独立落地、不需要先做流程改造。']
    ] }
];
el('secVerdict').innerHTML = VERDICTS.map(function (d) {
  return '<div class="vc ' + d.v + '">' +
    '<div class="vh"><span class="bg">' + d.bg + '</span><span>' + esc(d.t) + '</span></div>' +
    '<div class="claim">' + esc(d.claim) + '</div>' +
    '<ul>' + d.pts.map(function (p) {
      return '<li>' + p[0] + (p[1] ? '<br><span style="color:#6b7280;font-size:11.8px">' + p[1] + '</span>' : '') + '</li>';
    }).join('') + '</ul></div>';
}).join('');

/* ---------- 12 系统关系 ---------- */
function cmpBar(k, v, mx, cls, total) {
  return '<div class="cmpbar ' + (cls || '') + (v ? '' : ' z') + '" data-k="' + esc(k) + '">' +
    '<div class="lb" title="' + esc(k) + '">' + esc(k) + '</div>' +
    '<div class="tt"><div class="ff" style="width:' + (v ? (v / mx * 100).toFixed(1) : 0) + '%"></div></div>' +
    '<div class="vv' + (v ? '' : ' zero') + '">' + v + ' <small>' + pct(v, total).toFixed(0) + '%</small></div></div>';
}
const SYSK = ['ERP', 'POS', 'CRM', 'BI', 'OA', 'MES', 'WMS', 'PLM', 'SRM'];
const SYS = SYSK.map(function (k) { return [k, DATA.filter(function (r) { return (r.sysHit || []).indexOf(k) >= 0; }).length]; }).filter(function (e) { return e[1] > 0; });
const ACT = [['上传 / 拖入 / 扔进来', nOf('up')], ['把系统数据导出', nOf('expo')], ['MCP 连接器', nOf('mcp')], ['用代码调接口', 0], ['嵌入现有系统', 0], ['连数据库', 1]];
const mxS = Math.max.apply(null, SYS.map(function (e) { return e[1]; }));
const mxA = Math.max.apply(null, ACT.map(function (e) { return e[1]; }));
el('flowSys').innerHTML = SYS.map(function (e) { return cmpBar(e[0], e[1], mxS, '', DATA.length); }).join('');
el('flowAct').innerHTML = ACT.map(function (e) { return cmpBar(e[0], e[1], mxA, 'g', DATA.length); }).join('');
el('flowSys').querySelectorAll('.cmpbar').forEach(function (x) {
  x.addEventListener('click', function () {
    const k = x.dataset.k;
    showList('提到 ' + k + ' 的方案', DATA.filter(function (r) { return (r.sysHit || []).indexOf(k) >= 0; }), '页面正文提到该系统的方案（提及 ≠ 已连接）');
  });
});
el('flowAct').querySelectorAll('.cmpbar').forEach(function (x) {
  x.addEventListener('click', function () {
    const k = x.dataset.k;
    const fn = { '上传 / 拖入 / 扔进来': 'up', '把系统数据导出': 'expo', 'MCP 连接器': 'mcp', '用代码调接口': null, '嵌入现有系统': null, '连数据库': null }[k];
    showList('动作 · ' + k, fn ? DATA.filter(function (r) { return r[fn]; }) : [], '官方要求用户实际执行的动作');
  });
});

/* ---------- 13 链条 ---------- */
const chT = [['培训需求分析', 7], ['滞销款店间调拨建议', 4], ['人员汰换评估', 2], ['月度薪资核算', 2], ['继任计划', 1]];
const mxC = Math.max.apply(null, chT.map(function (e) { return e[1]; }));
el('secChain').innerHTML = chT.map(function (e) { return cmpBar(e[0], e[1], mxC, 'g', 31); }).join('');
el('secChain').querySelectorAll('.cmpbar').forEach(function (x) {
  x.addEventListener('click', function () {
    const k = x.dataset.k;
    showList('被衔接 · ' + k, DATA.filter(function (r) { return r.chainTxt && r.chainTxt.indexOf(k) >= 0; }), '官方原文里「衔接 X」的目标');
  });
});
const SB2 = [['3 步', 3, 3], ['5 步', 5, 5], ['6 步', 6, 6], ['7 步', 7, 7], ['8 步', 8, 8], ['≥6 步合计', 6, 999]];
el('flowSteps2').innerHTML = SB2.map(function (b) {
  const c = DATA.filter(function (r) { const s = r.steps || 0; return s >= b[1] && s <= b[2]; }).length;
  return '<div class="stepb" data-lo="' + b[1] + '" data-hi="' + b[2] + '"><b>' + c + '</b>' + b[0] + '</div>';
}).join('');
el('flowSteps2').querySelectorAll('.stepb').forEach(function (x) {
  x.addEventListener('click', function () {
    const lo = +x.dataset.lo, hi = +x.dataset.hi;
    showList('流程步数', DATA.filter(function (r) { const s = r.steps || 0; return s >= lo && s <= hi; }), '官方在页面上画出的执行步骤数');
  });
});

/* ---------- 14 边界与局限 ---------- */
const LIMITS = [
  { bg: nOf('disc') + ' / ' + DATA.length, t: '全部页面都带免责声明，不承诺效率数字',
    pts: [
      ['含「演示模式 / 脱敏构造数据 / 不宣称…」任一 = <b>693 / 693</b>', '其中逐字含「不宣称已接入客户生产系统」的有 <b>682</b> 个。'],
      ['原文逐字', '「本页展示的是\u2018应该怎么跑、每一步看什么、交付什么\u2019，用的是真实业务格式的脱敏构造数据，<b>不宣称已接入客户生产系统，也不承诺任何效率提升百分比</b>」。']
    ] },
  { bg: nOf('human') + ' / ' + DATA.length, t: '「人在环」是硬约束，不是可选项',
    pts: [
      ['明确要求人工审批 / 确认 / 复核 / 把关的方案 = <b>' + nOf('human') + ' 个</b>', '官方定位是「AI 出草稿、人做判断」，不是无人化。'],
      ['典型原文', '008：「重大影响项未经确认之前不发出」；088：「Skill 给结论，人拍板」。']
    ] },
  { bg: '286 / ' + DATA.length, t: '只有 41% 的方案配了技能包，其余靠页面提示词',
    pts: [
      ['A 类（推荐任务 + 技能包）<b>286</b>，B 类（有任务无技能包）<b>4</b>', 'C 类（两页含 Demo 提示词）<b>385</b>，D 类（官方尚未放出提示词）<b>18</b>。'],
      ['D 类 18 个方案的页面原文', '「本场景的演示数据正在制作中」—— 是官方内容尚未补齐，不是抓取缺失。']
    ] },
  { bg: nOf('mcp') + ' / ' + DATA.length, t: '平台能力边界：MCP 与系统集成几乎是空白地带',
    pts: [
      ['真正「开箱即连」的方案 = 0，有 MCP 前提条件的 = <b>' + nOf('mcp') + ' 个</b>', '其余 ' + (DATA.length - nOf('mcp')) + ' 个都要求用户自己导出文件、自己上传。'],
      ['官方对此的解释（647 店长晨会脚本）', '「不能 —— Skill 不对接 POS / ERP 系统，经营数据需要手动提供（手动填写或报表导出均可）。」'],
      ['同页还解释了评分口径', '「落地难度是分母 —— 需要先对接 POS / ERP 才能用的场景，分数会被压得很低。」即官方<b>主动降低</b>了对系统集成的预期。']
    ] }
];
el('secLimit').innerHTML = LIMITS.map(function (d) {
  return '<div class="vc part">' +
    '<div class="vh"><span class="bg">' + d.bg + '</span><span>' + esc(d.t) + '</span></div>' +
    '<ul style="margin-top:9px">' + d.pts.map(function (p) {
      return '<li>' + p[0] + (p[1] ? '<br><span style="color:#6b7280;font-size:11.8px">' + p[1] + '</span>' : '') + '</li>';
    }).join('') + '</ul></div>';
}).join('');

/* 动态数字回填 */
[['nSysInline', 'sys'], ['cExpo', 'expo'], ['cUp', 'up']].forEach(function (p) {
  const e = document.getElementById(p[0]); if (e) e.textContent = nOf(p[1]);
});
