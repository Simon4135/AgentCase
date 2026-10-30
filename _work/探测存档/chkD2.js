const fs=require("fs"),path=require("path");
const OUT="D:/WorkbuddyUseCase/WorkBuddy解决方案库";
const m=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/last_run.json","utf8"));
const d=m.rows.filter(r=>(r.tier||"").charAt(0)==="D");
// classes used across ALL html in D-tier, to find a prompt-ish container
const tally={};
for(const r of d){
  for(const fn of ["LiveDemo.html","场景引入.html"]){
    const p=path.join(OUT,r.dir,fn); if(!fs.existsSync(p))continue;
    const h=fs.readFileSync(p,"utf8");
    for(const cm of h.matchAll(/class="([^"]+)"/g)) for(const c of cm[1].split(/\s+/)) if(c) tally[c]=(tally[c]||0)+1;
  }
}
const top=Object.entries(tally).sort((a,b)=>b[1]-a[1]).slice(0,26);
console.log("D-tier top classes:",top.map(x=>x[0]+":"+x[1]).join(" "));
// does any D page mention 提示词 at all?
let men=0; for(const r of d){const p=path.join(OUT,r.dir,"LiveDemo.html");
  if(fs.existsSync(p)&&fs.readFileSync(p,"utf8").includes("提示词"))men++;}
console.log("D-tier demo pages mentioning 提示词:",men,"/",d.length);
// sample: what section headings do they have
const h=fs.readFileSync(path.join(OUT,d[0].dir,"LiveDemo.html"),"utf8");
console.log("headings:",JSON.stringify([...h.matchAll(/<h[23][^>]*>([\s\S]{0,60}?)<\/h[23]>/g)].map(x=>x[1].replace(/<[^>]+>/g,"").trim()).slice(0,14)));
