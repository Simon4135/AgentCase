const fs=require("fs"),path=require("path");
const ROOT="D:/WorkbuddyUseCase/WorkBuddy解决方案库";
const rows=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/last_run.json","utf8")).rows;
const plain=h=>h.replace(/<[\s\S]*?>/g," ").replace(/<!--[\s\S]*?-->/g," ").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/\s+/g," ").trim();
let hasEv=0,noEv=[],pvPages=[],valPages=[];
const evTexts=[];
for(const r of rows){
  const p=path.join(ROOT,r.dir,"场景引入.html");
  if(!fs.existsSync(p))continue;
  const h=fs.readFileSync(p,"utf8");
  const m=h.match(/<div[^>]*class="[^"]*\bcard ev\b[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/);
  if(m){hasEv++; evTexts.push([r.dir,plain(m[1])]);} else noEv.push(r.dir);
  if(/class="[^"]*\bpv\b/.test(h))pvPages.push(r.dir);
  if(/class="[^"]*\bval\b/.test(h))valPages.push(r.dir);
}
console.log("hasEv:"+hasEv+"  noEv:"+noEv.length);
console.log("noEv sample:",noEv.slice(0,15).join(", "));
console.log("pv pages:"+pvPages.length, pvPages.slice(0,8).join(", "));
console.log("val pages:"+valPages.length, valPages.slice(0,8).join(", "));
console.log("=== ev text samples ===");
evTexts.slice(0,4).forEach(([d,t])=>console.log("[\n"+d+"] "+t.slice(0,420)));
