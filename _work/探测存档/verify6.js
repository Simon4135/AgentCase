
const fs=require("fs"),path=require("path");
const OUT="D:/WorkbuddyUseCase/WorkBuddy解决方案库";
const m=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/last_run.json","utf8"));
let stat={},local=0,missing=0,ext=0,zipOk=0,zipBad=0,bad=[],mdOk=0;
const extDomains={};
for(const r of m.rows){
  const d=path.join(OUT,r.dir); if(!fs.existsSync(d)){bad.push("NO_DIR "+r.dir);continue;}
  const f=fs.readdirSync(d);
  const has=n=>f.includes(n);
  const k=(has("场景引入.html")?"H":"-")+(has("推荐任务.html")?"T":"-")+(has("LiveDemo.html")?"D":"-")+(f.some(x=>/^技能包_.*\.zip$/.test(x))?"Z":"-");
  stat[k]=(stat[k]||0)+1; if(has("提示词与说明.md"))mdOk++;
  for(const z of f.filter(x=>/^技能包_.*\.zip$/.test(x))){const fd=fs.openSync(path.join(d,z),"r");const b=Buffer.alloc(2);fs.readSync(fd,b,0,2,0);fs.closeSync(fd);(b[0]===0x50&&b[1]===0x4b)?zipOk++:(zipBad++,bad.push("BADZIP "+r.dir));}
  for(const fn of f.filter(x=>x.endsWith(".html"))){
    const h=fs.readFileSync(path.join(d,fn),"utf8");
    for(const mm of h.matchAll(/(?:href|src)="([^"]+)"/g)){const v=mm[1];
      if(/^https?:/i.test(v)){ext++; try{extDomains[new URL(v).host]=(extDomains[new URL(v).host]||0)+1;}catch(e){} continue;}
      if(v==="#"||v.startsWith("data:")||v.startsWith("#"))continue;
      if(/\.(css|js|png|jpg|jpeg|gif|svg|woff2?|ttf|mp4|webp)$/i.test(v)){local++; if(!fs.existsSync(path.resolve(d,v))){missing++;if(bad.length<8)bad.push(r.dir+"/"+fn+" -> "+v);}}
    }
  }
}
console.log("solutions:",m.rows.length,"| shapes:",JSON.stringify(stat));
console.log("md files:",mdOk,"| local asset refs:",local,"| MISSING:",missing);
console.log("preserved external links:",ext,"| distinct domains:",Object.keys(extDomains).length);
console.log("top domains:",Object.entries(extDomains).sort((a,b)=>b[1]-a[1]).slice(0,8).map(x=>x[0]+"("+x[1]+")").join(", "));
console.log("zip PK ok:",zipOk,"| bad:",zipBad);
console.log("problems:",bad.length); if(bad.length)console.log(bad.slice(0,8).join("\n"));
let total=0,files=0;
const walk=p=>{for(const e of fs.readdirSync(p,{withFileTypes:true})){const q=path.join(p,e.name);if(e.isDirectory())walk(q);else{total+=fs.statSync(q).size;files++;}}};
walk(OUT);
console.log("TOTAL:",(total/1048576).toFixed(1),"MB /",files,"files");
