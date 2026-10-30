const fs=require("fs"),path=require("path");
const ROOT="D:/WorkbuddyUseCase/WorkBuddy解决方案库";
const C=require("D:/WorkbuddyUseCase/_tools/wb_core.js");
const rows=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/last_run.json","utf8"));
// inspect section-3 ("换个做法之后") raw html structure for one page
const d="001_图纸询价智能报价";
const h=fs.readFileSync(path.join(ROOT,d,"场景引入.html"),"utf8");
const i=h.indexOf("换个做法之后");
console.log("=== raw slice around 换个做法之后 ===");
console.log(h.slice(i-400,i+2600).replace(/\n\s*\n/g,"\n"));
