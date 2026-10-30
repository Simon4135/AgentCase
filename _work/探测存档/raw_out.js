const fs=require("fs"),path=require("path");
const h=fs.readFileSync("D:/WorkbuddyUseCase/WorkBuddy解决方案库/001_图纸询价智能报价/场景引入.html","utf8");
const i=h.indexOf("会产出什么");
console.log("=== 会产出什么 raw ===");
console.log(h.slice(i-200,i+1800).replace(/<!--[\s\S]*?-->/g,"").replace(/\s+/g," "));
