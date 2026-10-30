const fs=require("fs"),path=require("path");
const OUT="D:/WorkbuddyUseCase/WorkBuddy解决方案库";
const m=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/last_run.json","utf8"));
const fam2=m.rows.filter(r=>{const p=path.join(OUT,r.dir,"LiveDemo.html");return fs.existsSync(p)&&/class="prompt-box"/.test(fs.readFileSync(p,"utf8"));});
// classify by inner class following prompt-box
const kinds={};
for(const r of fam2){
  const h=fs.readFileSync(path.join(OUT,r.dir,"LiveDemo.html"),"utf8");
  const i=h.indexOf('class="prompt-box"');
  const seg=h.slice(i,i+260).replace(/<!--[\s\S]*?-->/g,"");
  const cls=[...seg.matchAll(/class="([^"]+)"/g)].map(x=>x[1]).join("|");
  kinds[r.dir]=cls;
}
const uniq={}; for(const k in kinds) uniq[kinds[k]]=(uniq[kinds[k]]||0)+1;
console.log("inner class sequences:"); for(const k in uniq) console.log("  ",uniq[k],"x",k);
// dump one of the majority
const maj=Object.keys(kinds).find(k=>kinds[k]!=="pb-text");
console.log("=== majority sample:",maj);
const h=fs.readFileSync(path.join(OUT,maj,"LiveDemo.html"),"utf8");
const i=h.indexOf('class="prompt-box"');
console.log(h.slice(i-120,i+1500));
