const fs=require("fs"),path=require("path");
const ROOT="D:/WorkbuddyUseCase/WorkBuddy解决方案库";
const rows=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/last_run.json","utf8")).rows;
const plain=h=>h.replace(/<[\s\S]*?>/g," ").replace(/<!--[\s\S]*?-->/g," ").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/\s+/g," ").trim();
const re=/[^。；;]{0,24}\d[\d,\.]*\s*(?:小时|分钟|天|周|倍|%|％|万元|元)[^。；;]{0,24}/g;
let pages=0, hits=[], tot=0, pagesWith=0;
for(const r of rows){
  const p=path.join(ROOT,r.dir,"场景引入.html");
  if(!fs.existsSync(p))continue; pages++;
  const t=plain(fs.readFileSync(p,"utf8"));
  const m=t.match(re)||[];
  tot+=m.length; if(m.length) pagesWith++;
  if(m.length) hits.push([r.dir,m]);
}
console.log("pages:",pages,"| pages with numbers:",pagesWith,"| total matches:",tot);
hits.slice(0,20).forEach(([d,m])=>console.log("["+d+"] "+m.slice(0,4).join("  ||  ")));
