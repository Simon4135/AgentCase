
const fs=require("fs"),path=require("path");
const OUT="D:/WorkbuddyUseCase/WorkBuddy解决方案库";
const m=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/last_run.json","utf8"));
const plain=s=>s.replace(/<button[\s\S]*?<\/button>/g,"").replace(/<!--[\s\S]*?-->/g,"").replace(/<[^>]+>/g," ").replace(/&nbsp;/g," ").replace(/\s+/g," ").trim();
let withDemoPrompt=0, demoPromptTotal=0, hasRich=0;
const stat={richDemoPrompt:0,twoDemoPrompt:0,twoNoPrompt:0};
const samples=[];
for(const r of m.rows){
  const d=path.join(OUT,r.dir);
  const p=path.join(d,"LiveDemo.html");
  if(!fs.existsSync(p))continue;
  const h=fs.readFileSync(p,"utf8");
  const blocks=[...h.matchAll(/<div[^>]*class="prompt"[^>]*>([\s\S]*?)<\/div>/g)].map(x=>plain(x[1])).filter(Boolean);
  if(blocks.length){withDemoPrompt++;demoPromptTotal+=blocks.length;
    if(r.hasTasks)stat.richDemoPrompt++; else stat.twoDemoPrompt++;
    if(!r.hasTasks&&samples.length<5)samples.push(r.sid+" "+r.t.slice(0,16)+" :: "+blocks[0].slice(0,90));
  } else if(!r.hasTasks) stat.twoNoPrompt++;
  if(r.hasTasks)hasRich++;
}
console.log("solutions with >=1 demo prompt:",withDemoPrompt,"| total demo prompts:",demoPromptTotal,"| avg",(demoPromptTotal/withDemoPrompt).toFixed(1));
console.log("stat:",JSON.stringify(stat));
console.log("two-page examples with demo prompt:\n"+samples.join("\n"));
// also check demo page for skill/zip references (local, fast)
let zipRef=0,skillRef=0,skillNames=new Set();
for(const r of m.rows){
  const p=path.join(OUT,r.dir,"LiveDemo.html"); if(!fs.existsSync(p))continue;
  const h=fs.readFileSync(p,"utf8");
  if(/\.zip/.test(h))zipRef++;
  if(/Skill 兜底|技能包|install_skill/.test(h))skillRef++;
}
console.log("demos mentioning .zip:",zipRef,"| mentioning skill/技能包:",skillRef);
