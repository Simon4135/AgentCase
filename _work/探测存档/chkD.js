const fs=require("fs"),path=require("path");
const OUT="D:/WorkbuddyUseCase/WorkBuddy解决方案库";
const m=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/last_run.json","utf8"));
const d=m.rows.filter(r=>r.tier.startswith?false:(r.tier||"").charAt(0)==="D");
console.log("D tier count:",d.length);
for(const r of d.slice(0,3)){
  const f=path.join(OUT,r.dir,"LiveDemo.html");
  const h=fs.readFileSync(f,"utf8");
  console.log("---",r.dir,"size",h.length,"| class=prompt:",(h.match(/class="prompt"/g)||[]).length,"| cp(:",(h.match(/cp\(/g)||[]).length,"| 复制:",(h.match(/复制/g)||[]).length);
  const t=h.replace(/<script[\s\S]*?<\/script>/g,"").replace(/<style[\s\S]*?<\/style>/g,"").replace(/<[^>]+>/g," ").replace(/\s+/g," ");
  console.log("   text sample:",t.slice(200,560));
}
