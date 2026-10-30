
const fs = require("fs");
const C = require("D:/WorkbuddyUseCase/_tools/wb_core.js");
const DATA = JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_probe/v210_data.json","utf8"));
const crypto = require("crypto");
function parseSrc(src){ const m=/^\/page\/([^\/]+)\/([^\/]+)\/(.+)$/.exec(new URL(src).pathname); return m?{node:m[1],ver:m[2],rest:m[3],base:C.STATIC+"/page/"+m[1]+"/"+m[2]+"/"}:null; }
(async()=>{
  // gather distinct bases
  const bases = new Map();
  for (const s of DATA.SOLUTIONS) { if(!s.src) continue; const i=parseSrc(s.src); if(!i) continue; const k=i.node+"/"+i.ver; if(!bases.has(k)) bases.set(k,{...i,count:0,sample:s.src}); bases.get(k).count++; }
  console.log("distinct bases:", bases.size);
  const keys=[...bases.keys()];
  const pick = [keys[0], keys[1], keys[Math.floor(keys.length/2)], keys[keys.length-1]];
  const hashes={};
  for (const k of pick) {
    const b=bases.get(k);
    const a=await C.get(b.base+"shared/style.css");
    const c=await C.get(b.base+"shared/discrete-extra.css");
    hashes[k]=[a.ok?crypto.createHash("md5").update(a.buf).digest("hex").slice(0,10):"X"+a.status, c.ok?crypto.createHash("md5").update(c.buf).digest("hex").slice(0,10):"X"+c.status, a.ok?a.buf.length:0, c.ok?c.buf.length:0];
    console.log(k, b.count+"x", hashes[k].join(" "));
  }
  const uniq = new Set(Object.values(hashes).map(v=>v[0]+"/"+v[1]));
  console.log("unique css signatures among sample:", uniq.size);
  // how many bases total, and check first 12 bases for css presence
  let miss=0; const sigs={};
  for (const k of keys.slice(0,14)) {
    const b=bases.get(k);
    const a=await C.get(b.base+"shared/style.css");
    const c=await C.get(b.base+"shared/discrete-extra.css");
    const sig=(a.ok?crypto.createHash("md5").update(a.buf).digest("hex").slice(0,8):"X"+a.status)+"|"+(c.ok?crypto.createHash("md5").update(c.buf).digest("hex").slice(0,8):"X"+c.status);
    sigs[sig]=(sigs[sig]||0)+1;
    if(!a.ok||!c.ok) miss++;
  }
  console.log("css sig distribution over 14 bases:", JSON.stringify(sigs));
  console.log("bases missing css:", miss);
})();
