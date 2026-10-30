const fs=require("fs"),path=require("path");
const OUT="D:/WorkbuddyUseCase/WorkBuddy解决方案库";
const m=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/last_run.json","utf8"));
const tally={};
for(const r of m.rows){
  const p=path.join(OUT,r.dir,"场景引入.html"); if(!fs.existsSync(p))continue;
  const h=fs.readFileSync(p,"utf8");
  for(const mm of h.matchAll(/<(h[1-4])([^>]*)>/g)){
    const cls=(/class="([^"]*)"/.exec(mm[2])||[,""])[1];
    const k=mm[1]+(cls?"."+cls.split(/\s+/).join("."):"");
    tally[k]=(tally[k]||0)+1;
  }
}
const top=Object.entries(tally).sort((a,b)=>b[1]-a[1]).slice(0,18);
console.log("intro-page heading signatures:");top.forEach(x=>console.log("  ",x[1],"x",x[0]));
const p=path.join(OUT,m.rows[0].dir,"场景引入.html");
const h=fs.readFileSync(p,"utf8");
console.log("=== sample h2s:");[...h.matchAll(/<h2[^>]*>[\s\S]{0,90}?<\/h2>/g)].slice(0,8).forEach(x=>console.log("  ",x[0].replace(/\s+/g," ").slice(0,150)));
