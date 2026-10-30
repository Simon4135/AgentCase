const fs=require("fs"),path=require("path");
const ROOT="D:/WorkbuddyUseCase/WorkBuddy解决方案库";
const dirs=fs.readdirSync(ROOT).filter(d=>/^\d{3}_/.test(d));
const titleCount={}; const kw={};
const KW=["价值","收益","ROI","提升","节省","缩短","效率","效果","产出","成果","回报","降本","增效","案例","成效","数字"];
let n=0;
for(const d of dirs){
  const p=path.join(ROOT,d,"场景引入.html");
  if(!fs.existsSync(p))continue; n++;
  const h=fs.readFileSync(p,"utf8");
  for(const m of h.matchAll(/<h2[^>]*class="h(?:\s[^"]*)?"[^>]*>([\s\S]*?)<\/h2>/gi)){
    let t=m[1].replace(/<[^>]*>/g,"").replace(/\s+/g," ").trim();
    t=t.replace(/^[一二三四五六七八九十]+/,"").trim();
    titleCount[t]=(titleCount[t]||0)+1;
  }
  for(const k of KW){ if(h.includes(k)) kw[k]=(kw[k]||0)+1; }
}
console.log("pages:",n);
console.log("=== h2.h title Top40 ===");
Object.entries(titleCount).sort((a,b)=>b[1]-a[1]).slice(0,40).forEach(([t,c])=>console.log(String(c).padStart(4)+"  "+t));
console.log("=== keyword pages ===");
Object.entries(kw).sort((a,b)=>b[1]-a[1]).forEach(([k,c])=>console.log(String(c).padStart(4)+"  "+k));
