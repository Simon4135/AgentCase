const fs=require("fs"),path=require("path");
const OUT="D:/WorkbuddyUseCase/WorkBuddy解决方案库";
const m=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/last_run.json","utf8"));
const patterns=["AI 提示词","提示词卡片","class=\"prompt","提示词：","Prompt","prompt:","这个提示词","以下提示词"];
const tally={}; for(const p of patterns)tally[p]=0;
const perRow=[];
for(const r of m.rows){
  const hits={};
  for(const fn of ["LiveDemo.html","场景引入.html","推荐任务.html"]){
    const p=path.join(OUT,r.dir,fn); if(!fs.existsSync(p))continue;
    const h=fs.readFileSync(p,"utf8");
    for(const pat of patterns) if(h.includes(pat)){hits[pat]=fn;tally[pat]++;}
  }
  perRow.push([r.dir,r.tier,hits]);
}
for(const k of Object.keys(tally)) console.log(k.padEnd(16),"->",tally[k]);
console.log("--- rows where 提示词 appears but tier=D or demoPromptCount=0:");
const odd=perRow.filter(([d,t,h])=>h["AI 提示词"]||h["提示词卡片"]||h["提示词："]);
console.log("count:",odd.length);
odd.slice(0,10).forEach(x=>console.log("  ",x[0],x[1],JSON.stringify(Object.keys(x[2]))));
