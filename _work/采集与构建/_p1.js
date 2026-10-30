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
md.push("> B/C/D 类并非下载失败：这些方案的 deep-dives/<slug>-tasks.html 官方返回 404，是官方内容本身如此。", "");