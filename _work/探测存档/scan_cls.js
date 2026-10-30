const fs=require("fs"),path=require("path");
const ROOT="D:/WorkbuddyUseCase/WorkBuddy解决方案库";
const rows=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/last_run.json","utf8")).rows;
let st=0,sc=0,tbl=0,cm=0,before=0,after=0,kpi=0,wrk=0;
const cls={};
for(const r of rows){
  const p=path.join(ROOT,r.dir,"场景引入.html");
  if(!fs.existsSync(p))continue;
  let h=fs.readFileSync(p,"utf8");
  if(/<style/i.test(h))st++;
  if(/<script/i.test(h))sc++;
  if(/<table/i.test(h))tbl++;
  if(/class="cmp"/.test(h))cm++;
  if(/class="[^"]*\bbefore\b/.test(h))before++;
  if(/class="[^"]*\bafter\b/.test(h))after++;
  if(/class="[^"]*kpi/.test(h))kpi++;
  if(/class="[^"]*wrk/.test(h))wrk++;
  for(const m of h.matchAll(/class="([^"]+)"/g)){ for(const c of m[1].split(/\s+/)) cls[c]=(cls[c]||0)+1; }
}
console.log("pages:",rows.length,"| style:"+st,"script:"+sc,"table:"+tbl,"cmp:"+cm,"before:"+before,"after:"+after,"kpi:"+kpi,"wrk:"+wrk);
console.log("=== class Top45 ===");
Object.entries(cls).sort((a,b)=>b[1]-a[1]).slice(0,45).forEach(([k,v])=>console.log(String(v).padStart(5)+"  "+k));
