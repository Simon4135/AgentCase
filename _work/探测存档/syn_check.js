const fs=require('fs');
const OUT='D:/WorkbuddyUseCase/WorkBuddy解决方案库/';
for (const f of ['索引.html','分析.html']) {
  const h=fs.readFileSync(OUT+f,'utf8');
  // collect all inline <script> bodies (no src attr)
  const bodies=[...h.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)].map(m=>m[1]);
  console.log('=== '+f+' | bytes '+h.length+' | inline scripts '+bodies.length);
  bodies.forEach((b,i)=>{
    const p='D:/WorkbuddyUseCase/_probe/_syn_'+f.replace(/\W/g,'')+'_'+i+'.js';
    fs.writeFileSync(p,b,'utf8');
    try { new (require('vm').Script)(b,{filename:p}); console.log('  script['+i+'] len '+b.length+' : SYNTAX OK'); }
    catch(e){ console.log('  script['+i+'] len '+b.length+' : SYNTAX FAIL -> '+e.message); }
  });
  console.log('  placeholder left:', h.indexOf('/*__DATA__*/')>=0);
}
