#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const TOP = "D:\\WorkbuddyUseCase";                        // 顶层：索引/分析/README/CSV
const OUT = TOP + "\\WorkBuddy解决方案库";                     // 693 个方案目录
const WORK = TOP + "\\_work";                                  // 工具与源数据
const BUILDDIR = WORK + "\\采集与构建";
const MANIFEST = BUILDDIR + "\\last_run.json";
const TEMPLATE = BUILDDIR + "\\index_template.html";

const m = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));

const ENRICH = JSON.parse(fs.readFileSync(WORK + "\\采集与构建\\enrich.json", "utf8"));
const enrichOf = d => ENRICH[d] || null;
const TFLAGS = JSON.parse(fs.readFileSync(BUILDDIR + "\\tech_flags.json", "utf8"));
const flagsOf = d => TFLAGS[d] || {};
const rows = m.rows.slice().sort((a, b) => a.sid - b.sid);
const pad = n => String(n).padStart(3, "0");
const NL = String.fromCharCode(10);
const CRLF = String.fromCharCode(13, 10);

const data = rows.map(r => {
  const e = enrichOf(r.dir) || {};
  const f = flagsOf(r.dir);
  return {
    n: pad(r.sid + 1),
    d: r.dir,
    t: r.t,
    ind: r.ind || "",
    roles: (r.roles || []).join("、"),
    st: r.status || "",
    sc: r.scope || "",
    tc: r.taskCount || 0,
    dp: r.demoPromptCount || 0,
    pk: r.hasPkg ? 1 : 0,
    dm: r.hasDemo ? 1 : 0,
    pn: r.pkgName || "",
    tier: r.tier || "",
    pain: r.pain || "",
    val: e.val || "",
    diff: e.diff || "",
    score: e.score || null,
    roi: e.roi || null,
    ev: (e.ev || []).slice(0, 3),
    cv: (e.cv || []).slice(0, 3),
    cmp: e.cmp || null,
    outs: (e.outs || []).slice(0, 8),
    srcs: (e.srcs || []).slice(0, 8),
    nums: (e.nums || []).slice(0, 6),
    kinds: e.kinds || [],
    skinds: e.srckinds || [],
    steps: e.steps || 0,
    mcp: f.mcp || 0,
    expo: f.expo || 0,
    up: f.up || 0,
    txt: f.txt || 0,
    human: f.human || 0,
    chain: f.chain || 0,
    chainTxt: f.chainTxt || "",
    sys: f.sys || 0,
    sysHit: f.sysHit || [],
    disc: f.disc || 0,
    zin: f.zin || "",
  };
});

fs.writeFileSync(BUILDDIR + "\\index_data.json", JSON.stringify(data), "utf8");
let tpl = fs.readFileSync(TEMPLATE, "utf8");
const marker = "/*__DATA__*/[]";
if (tpl.indexOf(marker) < 0) throw new Error("模板缺少数据占位符");
tpl = tpl.replace(marker, JSON.stringify(data));
fs.writeFileSync(path.join(TOP, "索引.html"), tpl, "utf8");

const tierCount = {};
for (const r of rows) tierCount[r.tier] = (tierCount[r.tier] || 0) + 1;
const T = k => tierCount[k] || 0;
const byInd = {};
for (const r of rows) { const k = r.ind || "（未标注行业）"; (byInd[k] = byInd[k] || []).push(r); }
const byRole = {};
for (const r of rows) for (const ro of (r.roles || [])) (byRole[ro] = byRole[ro] || []).push(r);
const nPrm = rows.filter(r => (r.taskCount || 0) > 0 || (r.demoPromptCount || 0) > 0).length;
const nPkg = rows.filter(r => r.hasPkg).length;
const nTasks = rows.filter(r => r.hasTasks).length;
const nDemo = rows.filter(r => r.hasDemo).length;
// 归档体积：清单里的页面/zip 字节 + 各方案 _assets 目录的实际占用
let totalBytes = rows.reduce((s, r) => s + Object.values(r.files || {}).reduce((a, b) => a + b, 0), 0);
const walkBytes = p => { let n = 0; if (!fs.existsSync(p)) return 0; for (const e of fs.readdirSync(p, { withFileTypes: true })) { const q = path.join(p, e.name); n += e.isDirectory() ? walkBytes(q) : fs.statSync(q).size; } return n; };
for (const r of rows) totalBytes += walkBytes(path.join(OUT, r.dir, "_assets"));

const md = [];
md.push("# WorkBuddy 解决方案库（官方内容本地离线归档）", "");
md.push("> 把 WorkBuddy 官方内容中心的每个「解决方案」完整归档到本地：介绍页离线可开、提示词可直接复制、技能包 zip 为官方原件。", "");
md.push("- 官方来源：https://www.workbuddy.cn/space/d/ZljbYQzFpALFLcPwKPlct1");
md.push("- 归档时间：" + new Date(m.generatedAt || Date.now()).toLocaleString("zh-CN"));
md.push("");
const BT = "\u0060", BT3 = BT + BT + BT;
md.push("## 目录结构（先看这里）", "");
md.push("顶层只放 4 个交付物，点开即用；全部素材与工具都收进 _work 目录，日常不需要进去。", "");
md.push("| 位置 | 是什么 | 你平时要不要碰 |");
md.push("| --- | --- | --- |");
md.push("| " + BT + "索引.html" + BT + " | **主入口**：693 个方案总表，可搜索 + 6 个筛选，带业务价值与 ROI 列 | 双击打开 |");
md.push("| " + BT + "分析.html" + BT + " | 多维度分析报告（两部分共 15 节）：① 业务维度 9 节 ② 技术形态共性 + 选型建议 6 节，全部数字可下钻 | 双击打开 |");
md.push("| " + BT + "AI接入企业系统调研.html" + BT + " | **外部对照调研**：AI/Agent 接入企业系统的 4 条技术路线、9 家厂商官方 MCP、9 个落地案例、失败与安全边界、与 693 个方案的逐项对照 | 想动企业系统集成时读 |");
md.push("| " + BT + "README.md" + BT + " | 本文件：总览、口径说明、按行业与角色统计、全量清单 | 阅读 |");
md.push("| " + BT + "全量清单.csv" + BT + " | 693 行 × 18 列明细表（带 BOM，Excel / WPS 直开不乱码） | 需要做表时用 |");
md.push("| " + BT + "WorkBuddy解决方案库" + BT + " | 693 个方案目录，每个含 场景引入.html / 推荐任务.html / LiveDemo.html / 技能包.zip / 提示词与说明.md / _assets | 索引页的链接指向这里 |");
md.push("| " + BT + "_work\\采集与构建" + BT + " | 采集脚本与构建工具链（下载器、价值抽取器、页面模板、运行清单、中间数据） | 只在重跑采集时用 |");
md.push("| " + BT + "_work\\数据源" + BT + " | 从官方站点抓到的原始快照与解析结果（v210_data.json 等） | 只在重跑采集时用 |");
md.push("| " + BT + "_work\\探测存档" + BT + " | 定位数据源过程的一次性探测脚本、前端 bundle、chunk 缓存 | 可忽略，甚至可以删 |");
md.push("| " + BT + "_work\\截图" + BT + " | 校验用截图 | 可忽略 |");
md.push("");
md.push("### 重建全部产物", "");
md.push("如果官方内容有更新，按下面顺序重跑（第 1 步会重新下载 693 个方案，约 20 秒到 1 分钟）：", "");
md.push(BT3 + "bat");
md.push("cd /d \"D:\\WorkbuddyUseCase\\_work\\采集与构建\"");
md.push("node wb_download2.js --conc 12 --out \"D:\\WorkbuddyUseCase\\WorkBuddy解决方案库\"   :: 1) 下载 693 个方案");
md.push("node extract_value.js                                                          :: 2) 抽取业务价值 / ROI / 交互维度");
md.push("copy /b _p1.js+_p2.js build_index.js                                           :: 3) 拼接索引生成器");
md.push("node merge_pain.js");
md.push("node build_index.js                                                            :: 4) 生成 索引.html / README.md / 全量清单.csv");
md.push("node build_analysis.js                                                         ::    生成 分析.html");
md.push(BT3);
md.push("");
md.push("> 4 个产物写到顶层 " + BT + "D:\\WorkbuddyUseCase" + BT + "，693 个方案目录写到 " + BT + "WorkBuddy解决方案库" + BT + "，工具与中间数据留在 " + BT + "_work" + BT + "。");
md.push("");
md.push("## 一、总览", "");
md.push("| 项目 | 数量 |", "| --- | --- |");
md.push("| 解决方案总数 | **" + rows.length + "** |");
md.push("| 含可复制提示词 | " + nPrm + " |");
md.push("| 有官方「推荐任务」页（10 条任务模板） | " + nTasks + " |");
md.push("| 有 Live Demo 页 | " + nDemo + " |");
md.push("| 有技能包 zip | " + nPkg + " |");
md.push("| 含官方「最大差异点」价值说明 | " + Object.values(ENRICH).filter(e => e.diff).length + " |");
md.push("| 含官方价值评分（痛感 × AI 适配 ÷ 落地难度） | " + Object.values(ENRICH).filter(e => e.score).length + " |");
md.push("| 含官方量化 ROI 对比（改造前后耗时） | " + Object.values(ENRICH).filter(e => e.roi && e.roi.speed).length + " |");
md.push("| 归档字节合计 | " + (totalBytes / 1048576).toFixed(1) + " MB |");
md.push("");
md.push("## 二、四种形态（为什么有的方案没有技能包）", "");
md.push("官方对这 693 个解决方案的配置并不一致，分为四类：", "");
md.push("| 形态 | 含义 | 数量 |", "| --- | --- | --- |");
md.push("| **A** | 有「推荐任务」页 + 有技能包 zip（最完整） | " + T("A_完整（推荐任务+技能包）") + " |");
md.push("| **B** | 有「推荐任务」页，但官方未配技能包 | " + T("B_推荐任务无技能包") + " |");
md.push("| **C** | 只有「场景引入 + Live Demo」两页，提示词内嵌在 Demo 页里 | " + T("C_两页含Demo提示词") + " |");
md.push("| **D** | 只有两页，且页面内没有任何提示词块 | " + T("D_两页无提示词") + " |");
md.push("");
md.push("> **D 类说明**：这 " + T("D_两页无提示词") + " 个方案的 Live Demo 页上写着「本场景的演示数据正在制作中」，官方尚未放提示词；它们的页面仍在本地（场景引入.html + LiveDemo.html），可用信息是介绍正文与执行骨架。清单：" );
md.push("> " + rows.filter(r => (r.tier || "").charAt(0) === "D").map(r => r.t).join("、") + "。");
md.push("");
md.push("> B/C/D 类并非下载失败：这些方案的 deep-dives/<slug>-tasks.html 官方返回 404，是官方内容本身如此。", "");md.push("## 三、每个方案目录里有什么", "");
md.push("| 文件 | 说明 |", "| --- | --- |");
md.push("| 场景引入.html | 官方介绍页（背景、痛点、做法），已本地化，双击即可离线打开 |");
md.push("| 推荐任务.html | 官方 10 条任务模板页（仅 A/B 类有） |");
md.push("| LiveDemo.html | Live Demo 演示页（C 类的提示词就内嵌在这里） |");
md.push("| 技能包_XX.zip | 官方 pkg.zip 原件（仅 A 类有，未加改动） |");
md.push("| 提示词与说明.md | 汇总单文件：信息表 + 安装命令 + 全部提示词，优先看这个 |");
md.push("| _assets/ | 该方案页面用到的 CSS/图片，供上面三个 html 离线渲染 |");
md.push("");
md.push("## 四、怎么用", "");
md.push("三个 HTML 页面（索引 / 分析 / 外部调研）左侧都带**常驻导航栏**：顶部是品牌与当前页信息；「本页导航」列出该页全部章节，点一下平滑跳到该节，滚动时自动高亮当前节；下方是「一键筛选」快捷按钮（索引页可按角色 / 行业 / 形态 / 技能包 / ROI 一键切换）与「相关页面」互链（三个 HTML + README + CSV 随时互跳）；页面底部计数会同步显示在侧栏底部。点侧栏标题右侧的 ⟪ 按钮或按键盘 [ 键即可**收起 / 展开**，收起后左上角出现 ☰ 按钮随时召回，选择会被记住。窗口宽度 ≤ 900px（平板 / 手机）时侧栏自动变成抽屉式：默认收起，点左上角 ☰ 滑出，点页面任意处或再次点 ☰ 关闭。", "");
md.push("1. 看介绍 → 双击任意目录里的 场景引入.html，浏览器直接打开，无需联网。");
md.push("2. 取提示词 → 打开该目录的 提示词与说明.md，四节结构：① 技能包安装命令 ② 推荐任务提示词（10 条）③ Live Demo 内提示词 ④ 场景引入正文。整段复制即可粘进 WorkBuddy。");
md.push("3. 装技能包 → 技能包_XX.zip 是官方原件，可让 WorkBuddy 按 md 里的两条命令安装，或在 WorkBuddy 的「技能库」里上传这个 zip。");
md.push("4. 全库检索 → 打开 索引.html：6 个筛选（行业 / 角色 / 形态 / 技能包 / 提示词 / ROI 量化）＋ 关键词搜索（标题·痛点·业务价值·技能名·角色·编号），点表头排序，点标题直接打开离线页面。");
md.push("5. 看业务价值 → 索引.html 的「业务价值 / ROI 说明」列直接显示官方原文，点「展开价值详情 ▾」可看到该方案的最大差异点、价值说明、改造前后对照、会产出什么、量化表述、输入输出类型。");
md.push("6. 看全局分布 → 打开 分析.html，分两部分：");
md.push("   - **第一部分 · 业务维度**（9 节）：行业 / 角色 / 行业×角色矩阵 / 交互维度（输入→处理→产出）/ 形态 / ROI 量化 / 官方价值评分 / 最大差异点 / 价值主题词。");
md.push("   - **第二部分 · 技术形态共性**（6 节）：一个解决方案的解剖（输入层→处理层→输出层）/ 你的 5 条技术判断逐条核实 / 与企业现有系统的真实关系（提及 ≠ 连接）/ 单点型 vs 端到端业务链 / 边界与局限 / **怎么选第一个**。");
md.push("   - 任意条形、格子、词条、结论卡都可点开下钻到具体方案清单。");
md.push("7. **挑第一个场景** → 分析.html 最后一节「怎么选第一个」给了 4 条优先信号、4 条要提前想清楚的信号，以及官方评分里「落地难度」的分布。");
md.push("8. 表格处理 → 全量清单.csv 带 BOM，Excel / WPS 双击不乱码，含业务价值与 ROI 列。");
md.push("");
md.push("## 五、业务价值与 ROI 的口径说明", "");
md.push("本库的「业务价值 / ROI」全部**只取官方页面上写下的原文**，不做任何推断或拼凑。三个层次：");
md.push("");
md.push("| 字段 | 来源（官方页面结构） | 覆盖 |");
md.push("| --- | --- | --- |");
md.push("| 最大差异点 | 「为什么这个场景值得做」卡片里以「最大差异点 ·」开头的那句 | 619 个方案 |");
md.push("| 官方价值评分 | 同一张卡片里的公式：痛感 × AI 适配 ÷ 落地难度 = 分值 | 618 个方案 |");
md.push("| 量化 ROI | 同一张对照卡内的「现在的做法 vs 交给 Agent 之后」，两侧都写出耗时才算 | 10 个方案 |");
md.push("");
md.push("> 说明：官方页面的该卡片里还有两段与单个方案无关的方法论文字（评分公式的复述、「评分口径：…」的解释），已从价值字段中剔除，避免被误当作方案价值。");
md.push("> 量化 ROI 之所以只有 10 条，是因为官方只在少数方案里把改造前后的耗时写在同一张对照卡上；跨段落配对数字会得到「1152 倍」这类不可核验的结论，故坚决不做。");
md.push("");
md.push("## 六、技术形态共性（结论速览）", "");
md.push("这一节是对 m01277 提出的 5 条技术判断做全语料核实后的结论，完整图文版见 " + BT + "分析.html" + BT + " 第二部分。核实范围：693 个方案的 HTML 正文 + 693 份 提示词与说明.md + 286 个技能包 zip（2153 个条目）。", "");
md.push("| 判断 | 结论 | 支撑数字 |");
md.push("| --- | --- | --- |");
md.push("| 本质是「针对场景写提示词」，几乎没有代码型 workflow | **成立** | 286 个技能包含代码文件的 = **0 个**（只有 .md/.xlsx/.txt/.docx/.csv/.pdf）；每包必有 SKILL.md（286/286） |");
md.push("| 几乎没有以 MCP 连接器接入的 | **成立** | 693 个方案里提到 MCP 的 = **2 个**（0.29%），且都写成「用户自行配置」的前提条件 |");
md.push("| 是独立于企业系统的外挂型应用，不嵌入、不深度结合 | **成立** | 「嵌入现有系统 / 侧边栏 / 插件形式」= **0 个**；「用代码调接口」= **0 个**；「连数据库」= **1 个** |");
md.push("| 输入是系统导出文件，输出也是独立文件 | **成立** | 技能包输入 1289 个文件中 .xlsx 占 1013；产出文件型 **693/693**，纯对话型 **0** |");
md.push("| 几乎都是单点型场景，没有端到端业务链 | **成立但需补充** | 跨方案引用仅 **31 个**；「端到端」字面 39 个但多指方案自身完整；链条集中在 HR 域 |");
md.push("");
md.push("另外发现三个未被提及、但同样显著的共性：", "");
md.push("1. **全部 693 个页面都带免责声明**：「不宣称已接入客户生产系统，也不承诺任何效率提升百分比」（682 个逐字出现）。");
md.push("2. **「人在环」是硬约束**：585 个方案明确要求人工审批 / 确认 / 复核 / 把关。");
md.push("3. **官方主动降低了系统集成预期**：评分公式把「落地难度」当分母，需要先对接 POS / ERP 的场景分数会被压低；647 号方案原文即写「不能 —— Skill 不对接 POS / ERP 系统，经营数据需要手动提供」。");
md.push("");
md.push("## 七、按行业统计", "");
md.push("| 行业 | 数量 |", "| --- | --- |");
for (const k of Object.keys(byInd).sort((a, b) => byInd[b].length - byInd[a].length)) md.push("| " + k + " | " + byInd[k].length + " |");
md.push("");
md.push("## 八、按角色统计", "");
md.push("| 角色 | 数量 |", "| --- | --- |");
for (const e of Object.entries(byRole).sort((a, b) => b[1].length - a[1].length)) md.push("| " + e[0] + " | " + e[1].length + " |");
md.push("");
md.push("## 九、全量清单", "");
md.push("| # | 解决方案 | 行业 | 角色 | 状态 | 类型 | 推荐任务 | Demo提示词 | 技能包 | 价值分 |");
md.push("| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |");
for (const r of rows) {
  md.push("| " + pad(r.sid + 1) + " | " + (r.t || "") + " | " + (r.ind || "—") + " | "
    + ((r.roles && r.roles.length) ? r.roles.join("、") : "—") + " | " + (r.status || "—") + " | " + (r.scope || "—")
    + " | " + (r.taskCount || 0) + " | " + (r.demoPromptCount || 0) + " | " + (r.hasPkg ? "有" : "—")
    + " | " + ((enrichOf(r.dir) || {}).score ? (enrichOf(r.dir) || {}).score.value : "—") + " |");
}
fs.writeFileSync(path.join(TOP, "README.md"), md.join(NL), "utf8");

const Q = s => { const v = String(s == null ? "" : s); return /[",\r\n]/.test(v) ? '"' + v.split('"').join('""') + '"' : v; };
const csv = ["编号,目录,标题,行业,角色,状态,类型,推荐任务数,Demo提示词数,有技能包,技能包文件,痛点,最大差异点,官方价值分,改造前耗时,改造后耗时,提速倍数,官方来源页"];
for (const r of rows) {
  const e = enrichOf(r.dir) || {};
  const roi = e.roi || {};
  csv.push([
    pad(r.sid + 1), r.dir, r.t, r.ind, (r.roles || []).join("、"), r.status, r.scope,
    r.taskCount || 0, r.demoPromptCount || 0, r.hasPkg ? "有" : "无", r.pkgName, r.pain,
    e.diff || "", (e.score ? e.score.value : ""), roi.before || "", roi.after || "", roi.speed || "", r.src,
  ].map(Q).join(","));
}
fs.writeFileSync(path.join(TOP, "全量清单.csv"), "\uFEFF" + csv.join(CRLF), "utf8");

console.log("README.md / 索引.html / 全量清单.csv 已生成");
console.log("形态分布 = " + JSON.stringify(tierCount));
console.log("含提示词 " + nPrm + " | 推荐任务 " + nTasks + " | Demo " + nDemo + " | 技能包 " + nPkg);
