
const fs=require("fs");
const d=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_probe/v210_data.json","utf8"));
const noSrc=d.SOLUTIONS.filter(x=>!x.src);
console.log("entries without src:",noSrc.length, JSON.stringify(noSrc));
console.log("sid range:",Math.min(...d.SOLUTIONS.map(x=>x.sid)),"-",Math.max(...d.SOLUTIONS.map(x=>x.sid)),"| count",d.SOLUTIONS.length);
const m=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/last_run.json","utf8"));
console.log("downloaded dirs:",m.rows.length);
// directory naming: is it sid+1?
console.log("first 3 dirs:",JSON.stringify(m.rows.slice(0,3).map(r=>r.sid+" -> "+r.dir)));
console.log("last 3 dirs:",JSON.stringify(m.rows.slice(-3).map(r=>r.sid+" -> "+r.dir)));
