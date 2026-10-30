
const fs=require("fs"),path=require("path");
const OUT="D:/WorkbuddyUseCase/WorkBuddy解决方案库";
const m=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/last_run.json","utf8"));
let checked=0,missing=0,bad=[];
for(const r of m.rows){
  const d=path.join(OUT,r.dir); if(!fs.existsSync(d))continue;
  for(const fn of fs.readdirSync(d).filter(x=>x.endsWith(".html"))){
    const h=fs.readFileSync(path.join(d,fn),"utf8");
    const refs=[...h.matchAll(/(?:href|src)="([^"]+)"/g)].map(x=>x[1]).concat([...h.matchAll(/url\("([^"]+)"\)/g)].map(x=>x[1]));
    for(const ref of refs){
      if(!/\.(css|js|png|jpg|jpeg|gif|svg|woff2?|ttf|mp4|webp)$/i.test(ref))continue;
      if(/^https?:/i.test(ref))continue;
      checked++; const t=path.resolve(d,ref);
      if(!fs.existsSync(t)){missing++; if(missing<=8)bad.push(r.dir+" / "+fn+" -> "+ref);}
    }
  }
}
console.log("local asset refs:",checked,"| MISSING:",missing);
console.log(bad.join("\n"));
// also: how many solutions still reference data-removed-abs (offsite) and show a sample
const withAbs=m.rows.filter(r=>{const d=path.join(OUT,r.dir);if(!fs.existsSync(d))return false;return fs.readdirSync(d).filter(x=>x.endsWith(".html")).some(fn=>fs.readFileSync(path.join(d,fn),"utf8").includes("data-removed-abs"));});
console.log("solutions containing removed-abs refs:",withAbs.length);
const s=path.join(OUT,withAbs[0].dir);
const hh=fs.readFileSync(path.join(s,fs.readdirSync(s).find(x=>x.endsWith(".html"))),"utf8");
const mm=[...hh.matchAll(/href="[^"]*"[^>]*data-removed-abs="1"/g)].slice(0,3);
console.log("sample removed:",JSON.stringify(mm.map(x=>x[0].slice(0,120))));
