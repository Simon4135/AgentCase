const fs=require("fs"),path=require("path");
const OUT="D:/WorkbuddyUseCase/WorkBuddy解决方案库";
const m=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/last_run.json","utf8"));
const d=m.rows.filter(r=>(r.tier||"").charAt(0)==="D");
const strip=s=>s.replace(/<[^>]+>/g," ").replace(/&nbsp;/g," ").replace(/\s+/g," ").trim();
let found=null;
for(const r of d){const p=path.join(OUT,r.dir,"LiveDemo.html");
  if(fs.existsSync(p)&&fs.readFileSync(p,"utf8").includes("提示词"))found=r;}
console.log("D page mentioning 提示词:",found&&found.dir);
if(found){const h=fs.readFileSync(path.join(OUT,found.dir,"LiveDemo.html"),"utf8");
  const i=h.indexOf("提示词");console.log("ctx:",strip(h.slice(i-500,i+700)));}
// dstep bodies of a D page
const r0=d[2];const h=fs.readFileSync(path.join(OUT,r0.dir,"LiveDemo.html"),"utf8");
const steps=[...h.matchAll(/<div class="dstep[^"]*">([\s\S]*?)<\/div>\s*(?=<div class="dstep|$)/g)].slice(0,2);
console.log("---",r0.dir,"dstep count:",steps.length);
const first=[...h.matchAll(/class="dstep-b"[^>]*>([\s\S]{0,600}?)<\/div>/g)].slice(0,3);
first.forEach((x,i)=>{const t=strip(x[1]);if(t)console.log("  step"+i+":",t.slice(0,320));});
