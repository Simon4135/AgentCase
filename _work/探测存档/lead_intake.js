
const fs = require("fs");
const C = require("D:/WorkbuddyUseCase/_tools/wb_core.js");
(async () => {
  const u = "https://workbuddy-space-static.codebuddy.work/page/ZHiqrQ9jfVhUeLezsqloaX/HzZmf54DBy3J/lead-intake.html";
  const g = await C.getText(u);
  const t = g.text;
  console.log("len", t.length);
  console.log("title:", (/<title>([^<]*)<\/title>/i.exec(t)||[])[1]);
  console.log("h1s:", [...t.matchAll(/<h1[^>]*>([\s\S]{0,80}?)<\/h1>/gi)].map(m=>m[1].replace(/<[^>]+>/g,"").trim()).join(" || "));
  console.log("nav tag:", (/<nav[^>]*>/.exec(t)||[])[0]);
  console.log("anchors:", JSON.stringify([...t.matchAll(/<a[^>]+href="([^"]+)"/g)].map(m=>m[1])));
  console.log("has task article:", (t.match(/<article[^>]*class="task"/g)||[]).length);
  console.log("has wbSkillPrompt:", t.indexOf("wbSkillPrompt")>=0);
  console.log("has subnav:", t.indexOf('class="subnav"')>=0);
  console.log("scripts:", JSON.stringify([...t.matchAll(/<script[^>]+src="([^"]+)"/g)].map(m=>m[1])));
  // what is this page? sample of visible text
  console.log("--- text sample ---");
  console.log(C.plain(t).slice(0, 700));
})();
