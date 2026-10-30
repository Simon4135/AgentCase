const fs=require("fs"),path=require("path");
const ROOT="D:/WorkbuddyUseCase/WorkBuddy解决方案库";
const rows=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/last_run.json","utf8")).rows;
const cardVar={}, outVar={}, painVar={};
let evRaw=0, noEvList=[];
for(const r of rows){
  const p=path.join(ROOT,r.dir,"场景引入.html");
  if(!fs.existsSync(p))continue;
  const h=fs.readFileSync(p,"utf8");
  if(/class="card ev"/.test(h))evRaw++; else noEvList.push(r.dir);
  for(const m of h.matchAll(/class="(card[^"]*)"/g)) cardVar[m[1]]=(cardVar[m[1]]||0)+1;
}
console.log("card ev raw:",evRaw,"| missing:",noEvList.length);
console.log("missing sample:",noEvList.slice(0,20).join(", "));
console.log("=== card variants ==="); Object.entries(cardVar).sort((a,b)=>b[1]-a[1]).forEach(([k,v])=>console.log(String(v).padStart(5)+"  "+k));
