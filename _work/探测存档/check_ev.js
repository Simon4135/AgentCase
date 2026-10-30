const fs=require('fs');
const d=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/index_data.json","utf8"));
console.log('sample ev arrays:');
let n=0;
for(const r of d){ if(r.ev&&r.ev.length&&n<6){ console.log('--- '+r.n+' '+r.t); r.ev.forEach(x=>console.log('   ['+x.length+'] '+x.slice(0,180))); n++; } }
console.log('--- length stats of ev[0] ---');
const L=d.filter(r=>r.ev&&r.ev.length).map(r=>r.ev[0].length).sort((a,b)=>a-b);
console.log('count',L.length,'min',L[0],'p50',L[Math.floor(L.length/2)],'p90',L[Math.floor(L.length*0.9)],'max',L[L.length-1]);
console.log('--- ev entries containing 口径 count ---');
let c=0; for(const r of d) for(const x of (r.ev||[])) if(x.indexOf('口径')>=0) c++;
console.log('ev entries with 口径:',c);
console.log('--- keys of a row ---', Object.keys(d[0]).join(','));
console.log('--- pain sample ---', d[0].pain.slice(0,120));
