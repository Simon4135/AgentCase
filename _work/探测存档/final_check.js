const fs=require("fs"),path=require("path");
const OUT="D:/WorkbuddyUseCase/WorkBuddy解决方案库";
const m=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/last_run.json","utf8"));
// integrity sweep
let missing=0,checked=0,zipBad=0;
for(const r of m.rows){
  const d=path.join(OUT,r.dir); if(!fs.existsSync(d)){missing++;continue;}
  const f=fs.readdirSync(d);
  for(const fn of f.filter(x=>x.endsWith(".html"))){
    const h=fs.readFileSync(path.join(d,fn),"utf8");
    for(const mm of h.matchAll(/(?:href|src)="([^"]+)"/g)){
      const ref=mm[1];
      if(!/\.(css|js|png|jpg|jpeg|gif|svg|woff2?|ttf|mp4|webp)$/i.test(ref))continue;
      if(/^https?:/i.test(ref))continue;
      checked++;
      if(!fs.existsSync(path.resolve(d,ref))){missing++;if(missing<4)console.log("MISS",r.dir,fn,ref);}
    }
  }
  for(const z of f.filter(x=>x.endsWith(".zip"))){
    const b=Buffer.alloc(4);const fd=fs.openSync(path.join(d,z),"r");fs.readSync(fd,b,0,4,0);fs.closeSync(fd);
    if(b[0]!==0x50||b[1]!==0x4b)zipBad++;
  }
}
console.log("asset refs:",checked,"| problems:",missing,"| bad zips:",zipBad);
// index checks
const idx=fs.readFileSync(path.join(OUT,"索引.html"),"utf8");
const dm=/const DATA = (\[[\s\S]*?\]);\n/.exec(idx);
const DATA=JSON.parse(dm[1]);
console.log("索引.html:",(Buffer.byteLength(idx)/1024).toFixed(0),"KB | rows:",DATA.length,"| placeholder left:",idx.includes("__DATA__"));
const noDir=DATA.filter(x=>!fs.existsSync(path.join(OUT,x.d)));
console.log("index rows pointing at missing dirs:",noDir.length);
const noZip=DATA.filter(x=>x.pk&&!fs.existsSync(path.join(OUT,x.d,x.pn)));
console.log("index zip links broken:",noZip.length);
// counts
const cnt=(t)=>m.rows.filter(r=>(r.tier||"").charAt(0)===t).length;
console.log("A="+cnt("A"),"B="+cnt("B"),"C="+cnt("C"),"D="+cnt("D"));
let files=0,bytes=0;
const walk=p=>{for(const e of fs.readdirSync(p,{withFileTypes:true})){const q=path.join(p,e.name);if(e.isDirectory())walk(q);else{files++;bytes+=fs.statSync(q).size;}}};
walk(OUT);
console.log("TOTAL:",(bytes/1048576).toFixed(1),"MB /",files,"files");
console.log("root entries:",fs.readdirSync(OUT).filter(x=>!x.startsWith("_")&&!x.startsWith("00")||x==="_shared").length,"(dirs+files at root)");
console.log("top-level files:",fs.readdirSync(OUT).filter(x=>fs.statSync(path.join(OUT,x)).isFile()).join(", "));
