
const fs = require("fs");
const C = require("D:/WorkbuddyUseCase/_tools/wb_core.js");
const m = JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/last_run.json","utf8"));
const rowsH = m.rows.filter(r=>r.hasIntro && !r.hasTasks);
console.log("intro-without-tasks:", rowsH.length);
// sample 6, look for ANY 推荐任务/prompt content on the intro page or demo
(async()=>{
  for (const r of rowsH.slice(0,6)) {
    const g = await C.getText(r.src);
    if (!g.ok) { console.log("skip", r.sid, r.src, g.status); continue; }
    const t = g.text;
    console.log("=== sid"+r.sid, r.t, "| intro", t.length+"B");
    const nav = (/<nav[^>]*class="subnav"[^>]*>([\s\S]*?)<\/nav>/i.exec(t)||[])[1]||"";
    console.log("   navHrefs:", JSON.stringify([...nav.matchAll(/href="([^"]+)"/g)].map(x=>x[1])));
    console.log("   推荐任务 on intro:", t.indexOf("推荐任务"), "| 提示词:", t.indexOf("提示词"), "| pkg:", t.indexOf("pkg.zip"), "| install_skill:", t.indexOf("install_skill"));
    // check demo page
    const demoRel = ([...nav.matchAll(/href="([^"]+)"/g)].map(x=>x[1]).find(h=>h.indexOf("live-demos")>=0)||null);
    if (demoRel) {
      const du = new URL(demoRel, r.src).href.split("#")[0];
      const d = await C.getText(du);
      if (d.ok) {
        const dt = d.text;
        console.log("   demo", du.split("/page/")[1], d.buf.length+"B | 推荐任务:", dt.indexOf("推荐任务"), "| 提示词:", dt.indexOf("提示词"), "| pkg:", dt.indexOf("pkg.zip"), "| taskArt:", (dt.match(/<article[^>]*class="task"/g)||[]).length);
        const dl = (dt.match(/<div[^>]*id="wbSkillPrompt"[^>]*>([\s\S]*?)<\/div>/i)||[])[1];
        if (dl) console.log("   demo wbSkillPrompt:", C.plain(dl).slice(0,300));
      } else console.log("   demo FAIL", d.status);
    }
  }
})();
