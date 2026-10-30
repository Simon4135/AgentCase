const fs=require('fs');
const h=fs.readFileSync('D:/WorkbuddyUseCase/WorkBuddy解决方案库/索引.html','utf8');
console.log('bytes:',h.length);
console.log('placeholder left:', h.indexOf('/*__DATA__*/')>=0);
const m=h.match(/const DATA = (\[[\s\S]*?\]);\n/);
if(!m){console.log('DATA not matched'); process.exit(1);}
const d=JSON.parse(m[1]);
console.log('rows:',d.length);
console.log('with val:',d.filter(r=>r.val).length,'| with roi:',d.filter(r=>r.roi&&r.roi.speed).length);
console.log('with roles:',d.filter(r=>r.roles).length,'| with ev:',d.filter(r=>r.ev&&r.ev.length).length);
const roleSet=new Set(); d.forEach(r=>String(r.roles||'').split('、').forEach(x=>x&&roleSet.add(x)));
console.log('unique roles:',roleSet.size);
const inds=new Set(d.map(r=>r.ind).filter(Boolean)); console.log('unique industries:',inds.size);
// sanity: check a known roi row
const s=d.find(r=>r.n==='011'); console.log('011 sample:',JSON.stringify({t:s.t,val:s.val.slice(0,50),roi:s.roi,steps:s.steps,kinds:s.kinds,sk:s.skinds}));
// check links resolve
let miss=0,zipmiss=0;
for(const r of d){ if(!fs.existsSync('D:/WorkbuddyUseCase/WorkBuddy解决方案库/'+r.d+'/场景引入.html'))miss++; if(r.pk&&!fs.existsSync('D:/WorkbuddyUseCase/WorkBuddy解决方案库/'+r.d+'/'+r.pn))zipmiss++; }
console.log('missing intro:',miss,'| missing zip:',zipmiss);
