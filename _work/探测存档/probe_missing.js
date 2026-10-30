
const fs = require("fs");
const C = require("D:/WorkbuddyUseCase/_tools/wb_core.js");
const cands = [
  ["sid39 Ll1qVotIvR1OXo5ALx1dHT/23", "https://workbuddy-space-static.codebuddy.work/page/Ll1qVotIvR1OXo5ALx1dHT/23/deep-dives/membership-content.html"],
  ["sid86 pLnG71kpItTExL4EzeHAwG/31", "https://workbuddy-space-static.codebuddy.work/page/pLnG71kpItTExL4EzeHAwG/31/deep-dives/org-headcount.html"]
];
(async()=>{
  for (const [label, u] of cands) {
    const g = await C.getText(u);
    console.log("=== " + label + " intro:", g.ok ? g.text.length : ("FAIL"+g.status));
    if (!g.ok) continue;
    const slug = /([^\/]+)\.html$/.exec(u)[1];
    const root = u.replace(/deep-dives\/[^\/]*$/, "");
    // what does the page itself reference?
    const anchors = [...g.text.matchAll(/<a[^>]+href="([^"]+)"/g)].map(m=>m[1]);
    console.log("   anchors:", JSON.stringify([...new Set(anchors)]));
    console.log("   has pkg.zip:", g.text.indexOf("pkg.zip")>=0, "| wbSkillPrompt:", g.text.indexOf("wbSkillPrompt")>=0, "| task article:", (g.text.match(/<article[^>]*class="task"/g)||[]).length);
    for (const rel of ["deep-dives/"+slug+"-tasks.html", "deep-dives/"+slug+".html", "live-demos/"+slug+"/index.html"]) {
      const r = await C.get(root+rel);
      console.log("   probe", rel, "->", r.ok ? (r.buf.length+"B tasks="+((r.buf.toString()).match(/<article[^>]*class="task"/g)||[]).length) : ("FAIL "+r.status));
    }
  }
})();
