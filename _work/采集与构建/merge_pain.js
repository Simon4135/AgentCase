// merge_pain.js — 把 SOLUTIONS 的痛点文案合并进 last_run.json，供索引/CSV 使用
const fs = require("fs");
const M = "D:\\WorkbuddyUseCase\\_work\\采集与构建\\last_run.json";
const SRC = "D:\\WorkbuddyUseCase\\_work\\数据源\\v210_data.json";
const m = JSON.parse(fs.readFileSync(M, "utf8"));
const sol = JSON.parse(fs.readFileSync(SRC, "utf8")).SOLUTIONS;
const bySid = {};
sol.forEach((s, i) => { bySid[s.sid == null ? i : s.sid] = s; });
let n = 0;
for (const r of m.rows) {
  const s = bySid[r.sid];
  if (s && s.pain) { r.pain = s.pain; n++; }
  if (s && s.pain === "" ) r.pain = r.pain || "";
}
fs.writeFileSync(M, JSON.stringify(m, null, 1), "utf8");
const withPain = m.rows.filter(r => r.pain).length;
console.log("matched pain:", n, "| rows with pain:", withPain, "/", m.rows.length);
