const fs=require('fs');
const EN=JSON.parse(fs.readFileSync('D:/WorkbuddyUseCase/_tools/enrich.json','utf8'));
const ks=Object.keys(EN);
console.log('enrich.json bytes:', fs.statSync('D:/WorkbuddyUseCase/_tools/enrich.json').size);
console.log('keys sample:', ks.slice(0,6).join(' | '));
const e=EN[ks.find(k=>EN[k].roi&&EN[k].roi.speed)]||EN[ks[0]];
console.log('--- sample entry (with roi if any) ---');
console.log(JSON.stringify(e,null,1).slice(0,2200));
// size estimate of a compact payload
let tot=0;
for(const k of ks){const x=EN[k];const p={val:x.val||'',ev:(x.ev||[]).slice(0,3),cv:(x.cv||[]).slice(0,2),outs:(x.outs||[]).slice(0,6),srcs:(x.srcs||[]).slice(0,6),nums:(x.nums||[]).slice(0,6),kinds:x.kinds||'',srckinds:x.srckinds||'',steps:x.steps|0,cmp:x.cmp||null,roi:x.roi||null};tot+=JSON.stringify(p).length;}
console.log('compact payload total chars:', tot);
