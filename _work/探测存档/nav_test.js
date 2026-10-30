
const C = require("D:/WorkbuddyUseCase/_tools/wb_core.js");
const targets = [
  ["deep-dives 常规", "https://workbuddy-space-static.codebuddy.work/page/RqesNx6XGMirhoC5V2sIfH/4/deep-dives/annex-quote.html"],
  ["根级 sid691", "https://workbuddy-space-static.codebuddy.work/page/ZHiqrQ9jfVhUeLezsqloaX/HzZmf54DBy3J/lead-intake.html"],
  ["另一 base", "https://workbuddy-space-static.codebuddy.work/page/pLnG71kpItTExL4EzeHAwG/31/deep-dives/ai-export-docs.html"]
];
(async () => {
  for (const [label, u] of targets) {
    const g = await C.getText(u);
    if (!g.ok) { console.log(label, "FAIL", g.status); continue; }
    const nav = [...g.text.matchAll(/<a[^>]*class="[^"]*on?[^"]*"[^>]*href="([^"]+)"/g)].map(m=>m[1]);
    const allA = [...g.text.matchAll(/<a[^>]+href="([^"]+)"/g)].map(m=>m[1]);
    const title = (g.text.match(/<title>([^<]*)<\/title>/)||[])[1];
    const sub = (g.text.match(/<nav class="subnav">([\s\S]*?)<\/nav>/)||[])[1] || "";
    const subA = [...sub.matchAll(/<a[^>]+href="([^"]+)"/g)].map(m=>m[1]);
    console.log("=== " + label + " | " + title + " | " + g.text.length + "B");
    console.log("   subnav:", JSON.stringify(subA));
    console.log("   allA:", JSON.stringify([...new Set(allA)]).slice(0,400));
    console.log("   has wbSkillPrompt:", g.text.indexOf("wbSkillPrompt")>=0, "| pkg.zip:", g.text.indexOf("pkg.zip")>=0);
  }
})();
