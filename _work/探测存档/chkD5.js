const fs=require("fs"),path=require("path");
const OUT="D:/WorkbuddyUseCase/WorkBuddy解决方案库";
const m=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/last_run.json","utf8"));
const d=m.rows.filter(r=>(r.tier||"").charAt(0)==="D");
const strip=s=>s.replace(/<button[\s\S]*?<\/button>/g,"").replace(/<!--[\s\S]*?-->/g,"").replace(/<script[\s\S]*?<\/script>/g,"").replace(/<style[\s\S]*?<\/style>/g,"").replace(/<[^>]+>/g," ").replace(/&nbsp;/g," ").replace(/\s+/g," ").trim();
for(const r of [d[6],d[7],d[17]]){
  const h=fs.readFileSync(path.join(OUT,r.dir,"LiveDemo.html"),"utf8");
  const t=strip(h);
  console.log("===",r.dir,"| chars:",t.length,"| has 请:",t.includes("请"),"| has 输出:",t.includes("输出"),"| has 复制:",t.includes("复制"));
  console.log("   head:",t.slice(0,260));
  console.log("   tail:",t.slice(-260));
}
