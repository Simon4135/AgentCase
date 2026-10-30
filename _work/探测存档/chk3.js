
const fs=require("fs"),path=require("path");
const data=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_probe/v210_data.json","utf8"));
console.log("placeholder entries:",JSON.stringify(data.SOLUTIONS.filter(x=>!x.src)));

const OUT="D:/WorkbuddyUseCase/WorkBuddy解决方案库";
const m=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/last_run.json","utf8"));
// sanity: check a few H-D- demos are real pages, and md quality
const picks=[12,50,200,400,650];
for(const sid of picks){
  const r=m.rows.find(x=>x.sid===sid); if(!r)continue;
  const d=path.join(OUT,r.dir);
  const demo=path.join(d,"LiveDemo.html");
  const md=path.join(d,"提示词与说明.md");
  const dh=fs.existsSync(demo)?fs.readFileSync(demo,"utf8"):"";
  const mh=fs.existsSync(md)?fs.readFileSync(md,"utf8"):"";
  console.log("sid"+sid, r.dir.slice(0,26), "| demo", dh.length+"B", "title="+((/<title>([^<]*)<\/title>/.exec(dh)||[])[1]||"?"), "| md", mh.length+"B", "h2="+(mh.match(/^## .*/gm)||[]).length, "| tasks="+r.taskCount);
}
// list distinct md section headers of a rich one
const rich=m.rows.find(r=>r.hasPkg);
console.log("RICH SAMPLE:", rich.dir, "| md sections:", JSON.stringify((fs.readFileSync(path.join(OUT,rich.dir,"提示词与说明.md"),"utf8").match(/^#{1,3} .*/gm)||[]).slice(0,20)));
