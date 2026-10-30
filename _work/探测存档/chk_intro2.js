const fs=require("fs"),path=require("path");
const OUT="D:/WorkbuddyUseCase/WorkBuddy解决方案库";
const p=path.join(OUT,"001_图纸询价智能报价","场景引入.html");
const h=fs.readFileSync(p,"utf8");
const i=h.indexOf('class="h"');
console.log(h.slice(Math.max(0,i-700), i+1500));
