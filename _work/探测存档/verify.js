
const fs=require("fs"),path=require("path");
const m=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/last_run.json","utf8"));
const OUT="D:/WorkbuddyUseCase/WorkBuddy解决方案库";
const rows=m.rows;
let stat={intro:0,tasks:0,demo:0,pkg:0,md:0,assets:0,dirs:0,missingDir:0};
const shapes={};
const bad=[];
for(const r of rows){
  const d=path.join(OUT,r.dir);
  if(!fs.existsSync(d)){ stat.missingDir++; bad.push(r.sid+" NO_DIR "+r.dir); continue; }
  stat.dirs++;
  const f=fs.readdirSync(d);
  const has=n=>f.includes(n);
  const hI=has("场景引入.html"), hT=has("推荐任务.html"), hD=has("LiveDemo.html"), hMD=has("提示词与说明.md");
  const hP=f.some(x=>/^技能包_.*\.zip$/.test(x));
  const hA=has("_assets")||has("assets");
  if(hI)stat.intro++; if(hT)stat.tasks++; if(hD)stat.demo++; if(hP)stat.pkg++; if(hMD)stat.md++; if(hA)stat.assets++;
  const k=(hI?"H":"-")+(hT?"T":"-")+(hD?"D":"-")+(hP?"Z":"-");
  shapes[k]=(shapes[k]||0)+1;
  if(!hI||!hMD) bad.push(r.sid+" missing core "+r.dir);
}
console.log("disk verification over",rows.length,"rows");
console.log(JSON.stringify(stat));
console.log("shapes:",JSON.stringify(shapes));
console.log("problems:",bad.length, bad.slice(0,15));

// does every partial now have a demo on disk?
const partials=rows.filter(r=>!r.hasPkg);
let pNoDemo=0,pNoTasks=0;
for(const r of partials){ const d=path.join(OUT,r.dir); if(!fs.existsSync(d))continue; const f=fs.readdirSync(d);
  if(!f.includes("LiveDemo.html")){pNoDemo++; if(pNoDemo<=6)console.log("  partial-no-demo:",r.sid,r.t);}
  if(!f.includes("推荐任务.html"))pNoTasks++;
}
console.log("partials:",partials.length,"| of those missing demo:",pNoDemo,"| missing tasks:",pNoTasks);

// pkg zip integrity: test magic bytes for all zips
const {execSync}=require("child_process");
let zOk=0,zBad=[];
for(const r of rows){ const d=path.join(OUT,r.dir); if(!fs.existsSync(d))continue;
  const z=fs.readdirSync(d).find(x=>/^技能包_.*\.zip$/.test(x)); if(!z)continue;
  const fd=fs.openSync(path.join(d,z),"r"); const b=Buffer.alloc(4); fs.readSync(fd,b,0,4,0); fs.closeSync(fd);
  if(b[0]===0x50&&b[1]===0x4b) zOk++; else zBad.push(r.sid+" "+z);
}
console.log("zip magic PK ok:",zOk,"| corrupt:",zBad.length,zBad.slice(0,5));

// total size
let total=0,files=0;
const walk=p=>{for(const e of fs.readdirSync(p,{withFileTypes:true})){const q=path.join(p,e.name); if(e.isDirectory())walk(q); else {total+=fs.statSync(q).size;files++;}}};
walk(OUT);
console.log("TOTAL:",(total/1048576).toFixed(1),"MB in",files,"files");
