
const fs=require("fs"),path=require("path");
const OUT="D:/WorkbuddyUseCase/WorkBuddy解决方案库";
const m=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/last_run.json","utf8"));
const kinds=new Map(); const samples=[];
for(const r of m.rows){
  const d=path.join(OUT,r.dir); if(!fs.existsSync(d))continue;
  for(const fn of fs.readdirSync(d).filter(x=>x.endsWith(".html"))){
    const h=fs.readFileSync(path.join(d,fn),"utf8");
    for(const mm of h.matchAll(/(href|src)="[^"]*" data-removed-abs="1"/g)){
      // recover the original: it was rewritten to "#" so original lost; but data-offsite-page keeps rel for internal html
      kinds.set("abs",(kinds.get("abs")||0)+1);
      if(samples.length<6)samples.push(fn+": "+mm[0]);
    }
  }
}
console.log("removed-abs count:",kinds.get("abs")||0);
console.log(samples.join("\n"));
// look at a full page's anchors to understand what remains
const r0=m.rows.find(x=>x.sid===0);
const h=fs.readFileSync(path.join(OUT,"001_图纸询价智能报价","场景引入.html"),"utf8");
console.log("--- 001 refs:",JSON.stringify([...new Set([...h.matchAll(/(href|src)="([^"]*)"/g)].map(x=>x[2]))]));
const h2=fs.readFileSync(path.join(OUT,"001_图纸询价智能报价","LiveDemo.html"),"utf8");
console.log("--- 001 demo refs:",JSON.stringify([...new Set([...h2.matchAll(/(href|src)="([^"]*)"/g)].map(x=>x[2]))]));
// check offsite-page markers
let off=0; const offEx=[];
for(const r of m.rows){const d=path.join(OUT,r.dir);if(!fs.existsSync(d))continue;
 for(const fn of fs.readdirSync(d).filter(x=>x.endsWith(".html"))){
  const hh=fs.readFileSync(path.join(d,fn),"utf8");
  for(const mm of hh.matchAll(/data-offsite-page="([^"]+)"/g)){off++;if(offEx.length<8)offEx.push(r.dir+" "+fn+" -> "+mm[1]);}}}
console.log("offsite-page links:",off); console.log(offEx.join("\n"));
