
const fs=require("fs"),path=require("path");
const OUT="D:/WorkbuddyUseCase/WorkBuddy解决方案库";
const m=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/last_run.json","utf8"));
// what is the ".zip" mention inside those 4 buddyApp tasks pages?
const four=m.rows.filter(r=>r.hasTasks&&!r.hasPkg);
for(const r of four){
  const h=fs.readFileSync(path.join(OUT,r.dir,"推荐任务.html"),"utf8");
  const idx=h.indexOf(".zip");
  console.log("sid"+r.sid, "ctx:", JSON.stringify(h.slice(Math.max(0,idx-260),idx+80)));
  break;
}
// also the 2 placeholder entries text
const data=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_probe/v210_data.json","utf8"));
console.log("placeholders raw:",JSON.stringify(data.SOLUTIONS.slice(690).map(x=>({sid:x.sid,t:x.t,ph:x.placeholder,roles:x.roles}))));
