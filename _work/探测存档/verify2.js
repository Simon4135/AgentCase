
const fs=require("fs"),path=require("path");
const OUT="D:/WorkbuddyUseCase/WorkBuddy解决方案库";
const m=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/last_run.json","utf8"));
const rows=m.rows;
let missing=0,checked=0,extLeft=0,offsite=0,zipOk=0,zipBad=0,stat={};
const badFiles=[];
for(const r of rows){
  const d=path.join(OUT,r.dir);
  if(!fs.existsSync(d)){badFiles.push("NO_DIR "+r.dir);continue;}
  const f=fs.readdirSync(d);
  const has=n=>f.includes(n);
  const k=(has("场景引入.html")?"H":"-")+(has("推荐任务.html")?"T":"-")+(has("LiveDemo.html")?"D":"-")+(f.some(x=>/^技能包_.*\.zip$/.test(x))?"Z":"-");
  stat[k]=(stat[k]||0)+1;
  for(const z of f.filter(x=>/^技能包_.*\.zip$/.test(x))){
    const fd=fs.openSync(path.join(d,z),"r");const b=Buffer.alloc(2);fs.readSync(fd,b,0,2,0);fs.closeSync(fd);
    if(b[0]===0x50&&b[1]===0x4b)zipOk++;else{zipBad++;badFiles.push("BADZIP "+r.dir);}
  }
  for(const fn of f.filter(x=>x.endsWith(".html"))){
    const h=fs.readFileSync(path.join(d,fn),"utf8");
    extLeft += [...h.matchAll(/(?:src|href)="(https?:\/\/[^"]+)"/g)].length;
    if(h.includes("data-removed-abs")) offsite++;
    for(const mm of h.matchAll(/(?:src|href|url\()\s*"?((?:\.\.\/|\.\/)?[^"')\s]*\.(?:css|js|png|jpg|jpeg|gif|svg|woff2?|ttf|mp4|webp))/g)){
      let ref=mm[1]; if(ref.startsWith("http"))continue;
      checked++; const t=path.resolve(d,ref.replace(/^url\(/,""));
      if(!fs.existsSync(t)){missing++; if(missing<=8)badFiles.push(r.dir+" "+fn+" -> "+ref);}
    }
  }
}
console.log("dirs:",rows.length,"| shapes:",JSON.stringify(stat));
console.log("local asset refs checked:",checked,"| MISSING:",missing);
console.log("external http refs remaining:",extLeft,"| files w/ data-removed-abs:",offsite);
console.log("zip PK ok:",zipOk,"| bad:",zipBad);
console.log("problems:",badFiles.length); console.log(badFiles.slice(0,10).join("\n"));
let total=0,files=0;
const walk=p=>{for(const e of fs.readdirSync(p,{withFileTypes:true})){const q=path.join(p,e.name);if(e.isDirectory())walk(q);else{total+=fs.statSync(q).size;files++;}}};
walk(OUT);
console.log("TOTAL:",(total/1048576).toFixed(1),"MB /",files,"files");
