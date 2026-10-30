
const fs=require("fs"),path=require("path");
const C=require("D:/WorkbuddyUseCase/_tools/wb_core.js");
(async()=>{
const OUT="D:/WorkbuddyUseCase/WorkBuddy解决方案库";
const m=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/last_run.json","utf8"));
const per=[];
for(const r of m.rows){
  const d=path.join(OUT,r.dir); if(!fs.existsSync(d))continue;
  for(const fn of fs.readdirSync(d).filter(x=>x.endsWith(".html"))){
    const c=[...fs.readFileSync(path.join(d,fn),"utf8").matchAll(/data-removed-abs="1"/g)].length;
    if(c)per.push([c,r.dir,fn,r.tasksUrl,r.demoUrl,r.src]);
  }
}
per.sort((a,b)=>b[0]-a[0]);
console.log("files with removed-abs:",per.length,"| top5:",per.slice(0,5).map(x=>x[0]+"@"+x[1].slice(0,14)+"/"+x[2]).join(" | "));
const t=per[0];
const src = t[2]==="推荐任务.html"?t[3]:(t[2]==="LiveDemo.html"?t[4]:t[5]);
console.log("top case:",t[1],t[2],"count",t[0],"\nsource url:",src);
if(src){
  const g=await C.getText(src);
  const all=[...g.text.matchAll(/(href|src)="([^"]*)"/g)].map(x=>x[2]);
  const abs=[...new Set(all.filter(v=>/^https?:|^\//.test(v)))];
  console.log("ORIGINAL abs refs:",abs.length); console.log(JSON.stringify(abs.slice(0,12),null,1));
}
})();
