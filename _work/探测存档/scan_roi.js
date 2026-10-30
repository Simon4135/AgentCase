const fs=require("fs"),path=require("path");
const ROOT="D:/WorkbuddyUseCase/WorkBuddy解决方案库";
const rows=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/last_run.json","utf8"));
const list=Array.isArray(rows)?rows:rows.rows||rows.results||[];
console.log("rows:",list.length,"keys:",Object.keys(list[0]).join(","));
// role coverage
let withRoles=0; const roleCount={};
for(const r of list){ if(r.roles&&r.roles.length){withRoles++; r.roles.forEach(x=>roleCount[x]=(roleCount[x]||0)+1);} }
console.log("withRoles:",withRoles,"/",list.length);
console.log("roles:",JSON.stringify(roleCount));
// ind x tier
const x={};
for(const r of list){ const k=(r.ind||"(空)")+" | "+(r.tier||"?").charAt(0); x[k]=(x[k]||0)+1; }
console.log("=== ind x tier ==="); Object.entries(x).sort().forEach(([k,v])=>console.log(String(v).padStart(4)+"  "+k));
// sample value-ish text from a few pages
const pats=[/从[^，。；]{2,20}(?:缩(?:短|减)|降(?:到|至)|减少?)[^，。；]{2,20}/g, /(?:效(?:率|果)|人效|产能|周转|准确率|及时率)[^，。；]{0,12}(?:提升|提高|上升|增加)[^，。；]{0,18}/g, /\d+(?:\.\d+)?\s*(?:小时|分钟|天|周|月|倍|%|％)[^，。；]{0,30}(?:缩(?:短|减)|降|省|提升|减少)/g];
const files=list.slice(0,60).map(r=>path.join(ROOT,r.dir||"",("场景引入.html")));
let printed=0;
for(const f of files){ if(!fs.existsSync(f))continue; const h=fs.readFileSync(f,"utf8").replace(/<\/?[a-zA-Z][^>]*>/g," ").replace(/\s+/g," ");
  for(const p of pats){ const m=h.match(p); if(m&&m.length){ if(printed++<14){ console.log("--- "+path.basename(path.dirname(f))); console.log("   "+m.slice(0,4).join(" | ")); } break; } }
}
