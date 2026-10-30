
const fs=require("fs"),path=require("path");
const OUT="D:/WorkbuddyUseCase/WorkBuddy解决方案库";
const d=path.join(OUT,"001_图纸询价智能报价");
console.log("top-level entries:",JSON.stringify(fs.readdirSync(OUT).slice(0,6)));
console.log("001 dir:",JSON.stringify(fs.readdirSync(d)));
const walk=(p,pre,depth)=>{ if(depth<0)return; for(const e of fs.readdirSync(p,{withFileTypes:true}).slice(0,12)){ console.log(pre+e.name+(e.isDirectory()?"/":"")); if(e.isDirectory())walk(path.join(p,e.name),pre+"  ",depth-1);} };
console.log("--- tree of 001 ---"); walk(d,"",3);
console.log("--- does OUT/_assets exist?", fs.existsSync(path.join(OUT,"_assets")));
const h=fs.readFileSync(path.join(d,"场景引入.html"),"utf8");
console.log("--- refs in 场景引入.html:",JSON.stringify([...new Set([...h.matchAll(/(?:src|href)="([^"]+)"/g)].map(x=>x[1]))],null,0));
