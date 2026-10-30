
const fs = require("fs");
const dir = "D:/WorkbuddyUseCase/WorkBuddy解决方案库/001_图纸询价智能报价/";
for (const f of ["场景引入.html","推荐任务.html","LiveDemo.html"]) {
  const t = fs.readFileSync(dir+f,"utf8");
  const refs = [...new Set([...t.matchAll(/(?:href|src)="([^"]+)"/g)].map(m=>m[1]))];
  console.log(f, "->", JSON.stringify(refs));
}
