
const fs=require("fs"),path=require("path");
const OUT="D:/WorkbuddyUseCase/WorkBuddy解决方案库";
const m=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/last_run.json","utf8"));

// 1) the 4 HTD- (has tasks, no pkg): inspect their tasks page for any zip/install hint
const four=m.rows.filter(r=>r.hasTasks&&!r.hasPkg);
for(const r of four){
  const p=path.join(OUT,r.dir,"推荐任务.html");
  const h=fs.readFileSync(p,"utf8");
  console.log("sid"+r.sid,"|",r.t,"| len",h.length,"| zip?",h.includes(".zip"),"| install_skill?",h.includes("install_skill"),"| buddyApp?",h.includes("buddyApp")||h.includes("易启"),"| prompt div?",h.includes("wbSkillPrompt"));
}
// 2) remnant external refs across all local html
let ext=new Set(), extCount=0, offsite=0;
const bad=[];
for(const r of m.rows){
  const d=path.join(OUT,r.dir); if(!fs.existsSync(d))continue;
  for(const f of fs.readdirSync(d).filter(x=>x.endsWith(".html"))){
    const h=fs.readFileSync(path.join(d,f),"utf8");
    for(const mm of h.matchAll(/(?:src|href)="(https?:\/\/[^"]+)"/g)){ ext.add(mm[1].replace(/\?.*$/,"")); extCount++; }
    if(h.includes("data-removed-abs")) offsite++;
  }
}
console.log("external refs remaining:",extCount,"unique:",ext.size);
console.log([...ext].slice(0,12).join("\n"));
console.log("files still containing data-removed-abs:",offsite);
// 3) leftover local-file integrity: every ../_assets ref exists?
let missing=0,checked=0;
for(const r of m.rows){
  const d=path.join(OUT,r.dir); if(!fs.existsSync(d))continue;
  for(const f of fs.readdirSync(d).filter(x=>x.endsWith(".html"))){
    const h=fs.readFileSync(path.join(d,f),"utf8");
    for(const mm of h.matchAll(/"(..\/[^"]+\.(?:css|js|png|jpg|jpeg|svg|woff2?|ttf))"/g)){
      checked++; const target=path.resolve(d,mm[1]); if(!fs.existsSync(target)){missing++; if(missing<=5)console.log("  MISSING",r.dir,f,"->",mm[1]);}
    }
  }
}
console.log("local asset refs checked:",checked,"| missing:",missing);
