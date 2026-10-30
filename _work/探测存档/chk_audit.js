const fs=require("fs"),path=require("path");
const OUT="D:/WorkbuddyUseCase/WorkBuddy解决方案库";
const m=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/last_run.json","utf8"));
let onlyPb=0,onlyCls=0,both=0,none=0;
const ex=[];
for(const r of m.rows){
  const p=path.join(OUT,r.dir,"LiveDemo.html"); if(!fs.existsSync(p))continue;
  const h=fs.readFileSync(p,"utf8");
  const nCls=(h.match(/class="prompt"/g)||[]).length;
  const nPb=(h.match(/class="prompt-box"/g)||[]).length;
  if(nPb&&!nCls){onlyPb++; if(ex.length<5)ex.push(r.dir+" pb="+nPb+" c="+nCls+" tier="+r.tier+" dp="+r.demoPromptCount);}
  else if(nCls&&!nPb)onlyCls++;
  else if(nCls&&nPb)both++;
  else none++;
}
console.log("only prompt-box:",onlyPb,"| only class=prompt:",onlyCls,"| both:",both,"| neither:",none);
console.log(ex.join("\n"));
// how many solutions have pb-text blocks total (incl. intros)
let pbAny=0; for(const r of m.rows){const p=path.join(OUT,r.dir,"LiveDemo.html");
 if(fs.existsSync(p)&&fs.readFileSync(p,"utf8").includes("pb-text"))pbAny++;}
console.log("solutions containing pb-text:",pbAny);
console.log("md files with a prompt section:", m.rows.filter(r=>(r.demoPromptCount||0)>0).length);
