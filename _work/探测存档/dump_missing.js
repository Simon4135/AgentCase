const fs=require("fs"),path=require("path");
const ROOT="D:/WorkbuddyUseCase/WorkBuddy解决方案库";
function dump(dir){
  const h=fs.readFileSync(path.join(ROOT,dir,"场景引入.html"),"utf8");
  // list all h3 / card titles
  const t=[];
  for(const m of h.matchAll(/<h([34])[^>]*>([\s\S]*?)<\/h\1>/g)) t.push("h"+m[1]+": "+m[2].replace(/<[^>]*>/g,"").replace(/\s+/g," ").trim());
  const cls={};
  for(const m of h.matchAll(/class="([^"]+)"/g)) for(const c of m[1].split(/\s+/)) cls[c]=(cls[c]||0)+1;
  console.log("=== "+dir+" h3/h4:"); t.slice(0,25).forEach(x=>console.log("   "+x));
  console.log("   classes:", Object.entries(cls).sort((a,b)=>b[1]-a[1]).slice(0,20).map(x=>x[0]+":"+x[1]).join(" "));
}
["002_合同条款确认","005_异常分级与升级归口","030_经营利润异常会诊与行动审批","113_Offer 谈判测算"].forEach(d=>{try{dump(d)}catch(e){console.log(d,"ERR",e.message)}});
const dels=fs.readdirSync(ROOT).filter(d=>/^\d{3}_/.test(d));
console.log("dirs:",dels.length);
console.log("sample dirs:",dels.slice(0,3).join(" | "), "...", dels.slice(-3).join(" | "));
