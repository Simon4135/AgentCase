
const fs = require("fs");
const dir = "D:/WorkbuddyUseCase/WorkBuddy解决方案库/692_获客信息录入及潜客推荐/";
for (const f of ["场景引入.html","推荐任务.html","LiveDemo.html"]) {
  const t = fs.readFileSync(dir+f,"utf8");
  const crypto = require("crypto");
  console.log(f, t.length, crypto.createHash("md5").update(t).digest("hex").slice(0,10),
    "| title:", (/<title>([^<]*)<\/title>/i.exec(t)||[])[1],
    "| taskArt:", (t.match(/<article[^>]*class="task"/g)||[]).length,
    "| skillPrompt:", t.indexOf("wbSkillPrompt")>=0,
    "| subnav:", JSON.stringify((/<nav[^>]*class="subnav"[^>]*>([\s\S]*?)<\/nav>/i.exec(t)||[])[1]||"").slice(0,220));
}
// also probe the 4 root-level sources
const C = require("D:/WorkbuddyUseCase/_tools/wb_core.js");
(async()=>{
  const DATA = JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_probe/v210_data.json","utf8"));
  const roots = DATA.SOLUTIONS.filter(s=>s.src && !/\/deep-dives\//.test(s.src));
  console.log("\nroot-level solutions:", roots.length);
  for (const s of roots) {
    const g = await C.getText(s.src);
    console.log("  sid"+s.sid, s.t, "->", g.ok?("200 len="+g.text.length+" tasks="+((g.text.match(/<article[^>]*class=\"task\"/g)||[]).length)):("FAIL "+g.status), s.src);
  }
})();
