
const fs=require("fs"),path=require("path");
const OUT="D:/WorkbuddyUseCase/WorkBuddy解决方案库";
const m=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/last_run.json","utf8"));
const r=m.rows.find(x=>x.sid===39);
console.log("sid39 row:", JSON.stringify({dir:r.dir,files:r.files,assets:r.assets,notes:r.notes,hasDemo:r.hasDemo}));
const d=path.join(OUT,r.dir);
console.log("on disk:", fs.readdirSync(d));
// also a HT-Z example (tasks but no demo)
const r2=m.rows.find(x=>x.hasTasks&&!x.hasDemo&&!x.hasPkg);
console.log("\nHT-Z example:", r2.sid, r2.t, JSON.stringify(r2.files), r2.src);
if(r2){ const d2=path.join(OUT,r2.dir); console.log("on disk:", fs.readdirSync(d2)); }
