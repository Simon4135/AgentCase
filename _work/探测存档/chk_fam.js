const fs=require("fs"),path=require("path");
const OUT="D:/WorkbuddyUseCase/WorkBuddy解决方案库";
const m=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/last_run.json","utf8"));
let f1=0,f2=0,f12=0,f0=0; const list2=[];
for(const r of m.rows){
  const p=path.join(OUT,r.dir,"LiveDemo.html");
  if(!fs.existsSync(p)){f0++;continue;}
  const h=fs.readFileSync(p,"utf8");
  const a=/class="prompt"/.test(h);
  const b=/class="prompt-box"/.test(h);
  if(a&&b)f12++; else if(a)f1++; else if(b){f2++;list2.push(r.dir+" dp="+r.demoPromptCount+" tier="+r.tier);} else f0++;
}
console.log("family1 only (class=prompt):",f1);
console.log("family2 only (prompt-box):",f2);
console.log("both:",f12,"| neither:",f0);
console.log(list2.join("\n"));
