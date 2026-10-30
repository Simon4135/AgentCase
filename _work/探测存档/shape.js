const fs=require("fs");
const j=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/last_run.json","utf8"));
console.log("type:",Array.isArray(j)?"array":typeof j);
console.log("keys:",Object.keys(j).slice(0,20).join(","));
for(const k of Object.keys(j)){ const v=j[k]; console.log("  "+k+" -> "+(Array.isArray(v)?("array["+v.length+"]"):typeof v)); }
