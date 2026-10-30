
const fs=require("fs"),path=require("path");
const C=require("D:/WorkbuddyUseCase/_tools/wb_core.js");
(async()=>{
const m=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/last_run.json","utf8"));
const two=m.rows.filter(r=>!r.hasTasks);
console.log("two-page solutions:",two.length);
// inspect structure of a couple of demo pages: count .prompt blocks and dstep sections
for(const sid of [39,310,391,495,602,349,479]){
  const r=m.rows.find(x=>x.sid===sid); if(!r)continue;
  const g=await C.getText(r.demoUrl);
  const h=g.text;
  const prompts=[...h.matchAll(/<div class="prompt"[^>]*>([\s\S]*?)<\/div>/g)].map(x=>x[1].replace(/<button[\s\S]*$/,"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim());
  const steps=[...h.matchAll(/class="dstep-n[^"]*"[^>]*>([^<]*)</g)].map(x=>x[1].trim());
  const secs=[...h.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map(x=>x[1].replace(/<[^>]+>/g,"").trim()).filter(Boolean);
  console.log("sid"+sid, r.t.slice(0,16), "| prompts:",prompts.length, "| stepLabels:",JSON.stringify([...new Set(steps)].slice(0,8)));
  console.log("   h2s:",JSON.stringify(secs.slice(0,8)));
  if(prompts.length)console.log("   p1:",JSON.stringify(prompts[0].slice(0,110)));
}
})();
