const fs=require("fs"),path=require("path");
const ROOT="D:/WorkbuddyUseCase/WorkBuddy解决方案库";
const rows=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/last_run.json","utf8")).rows;
const h3c={};
for(const r of rows){
  const p=path.join(ROOT,r.dir,"场景引入.html");
  if(!fs.existsSync(p))continue;
  const h=fs.readFileSync(p,"utf8");
  const seen=new Set();
  for(const m of h.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>/g)){
    let t=m[1].replace(/<[^>]*>/g,"").replace(/\s+/g," ").trim();
    if(!t||t.length>40||seen.has(t))continue; seen.add(t);
    h3c[t]=(h3c[t]||0)+1;
  }
}
console.log("=== h3 headings (page count) Top55 ===");
Object.entries(h3c).sort((a,b)=>b[1]-a[1]).slice(0,55).forEach(([k,v])=>console.log(String(v).padStart(4)+"  "+k));
