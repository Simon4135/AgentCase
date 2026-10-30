const fs=require("fs");
const C=require("D:/WorkbuddyUseCase/_tools/wb_core.js");
const cases=[
 ["001_图纸询价智能报价","A"],
 ["087_部门人力盘点","C"],
 ["040_社群周内容包","D"],
 ["396_认证与检测报告条款符合性核对","D"]
];
for(const [d,t] of cases){
  const p="D:/WorkbuddyUseCase/WorkBuddy解决方案库/"+d+"/场景引入.html";
  if(!fs.existsSync(p)){console.log(d,"MISSING");continue;}
  const I=C.parseIntro(fs.readFileSync(p,"utf8"));
  console.log("=== ["+t+"] "+d+" | title="+JSON.stringify(I.title)+" | sections="+I.sections.length);
  I.sections.forEach((s,i)=>console.log("   "+(i+1)+") "+s.h+"  <"+(s.sub||"")+">  body="+s.body.length+" chars :: "+s.body.slice(0,90).replace(/\n/g," ")));
}
