const fs=require("fs");
const m=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/last_run.json","utf8"));
const d=m.rows.filter(r=>(r.tier||"").charAt(0)==="D");
console.log("D-tier ("+d.length+"):");
d.forEach(r=>console.log("  ",r.dir,"| tasks="+r.taskCount,"dp="+r.demoPromptCount));
