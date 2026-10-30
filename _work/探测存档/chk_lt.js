const fs=require("fs"),path=require("path");
const OUT="D:/WorkbuddyUseCase/WorkBuddy解决方案库";
const m=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/last_run.json","utf8"));
// find literal '<' followed by a non-letter (not a real tag) in source html
let solutions=[],total=0,examples=[];
for(const r of m.rows){
  const d=path.join(OUT,r.dir); if(!fs.existsSync(d))continue;
  let hit=0;
  for(const fn of fs.readdirSync(d).filter(x=>x.endsWith(".html"))){
    const h=fs.readFileSync(path.join(d,fn),"utf8");
    // < NOT followed by /?letter  => literal less-than in text
    const mm=[...h.matchAll(/<(?!\/?[a-zA-Z!])/g)];
    if(mm.length){hit+=mm.length; if(examples.length<6){const i=mm[0].index;examples.push(fn+" @ "+r.dir+" :: "+h.slice(i,i+90).replace(/\s+/g," "));}}
  }
  if(hit){solutions.push(r.dir+":"+hit);total+=hit;}
}
console.log("solutions affected:",solutions.length,"| total literal '<' occurrences:",total);
console.log("examples:");examples.forEach(e=>console.log("  ",e));
// and check the produced md for damage
let mdDamage=0,mdEx=[];
for(const r of m.rows){
  const p=path.join(OUT,r.dir,"提示词与说明.md"); if(!fs.existsSync(p))continue;
  const t=fs.readFileSync(p,"utf8");
  if(/缺口率\s*\n\s*③|缺口率 $/m.test(t)){mdDamage++;}
}
console.log("md files with the known 缺口率 truncation:",mdDamage);
