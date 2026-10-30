const fs=require('fs');
const OUT='D:/WorkbuddyUseCase/WorkBuddy解决方案库/';
for (const f of ['索引.html','分析.html']) {
  const h=fs.readFileSync(OUT+f,'utf8');
  const ids=new Set([...h.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));
  const body=[...h.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)].map(m=>m[1])[0];
  const used=[...body.matchAll(/(?:getElementById\(|el\()\s*"([^"]+)"/g)].map(m=>m[1]);
  const missing=[...new Set(used)].filter(x=>!ids.has(x));
  console.log(f+': ids '+ids.size+', referenced '+new Set(used).size+', MISSING -> '+(missing.length?JSON.stringify(missing):'none'));
  // also check querySelector class/id usage that must exist
  const qs=[...body.matchAll(/querySelector(?:All)?\("\.([a-zA-Z][\w-]*)"/g)].map(m=>m[1]);
  const cls=new Set([...h.matchAll(/class="([^"]*)"/g)].flatMap(m=>m[1].split(/\s+/)));
  // classes created dynamically are fine; report only ones never seen anywhere in file
  const missCls=[...new Set(qs)].filter(c=>!cls.has(c) && h.indexOf(c)<0);
  console.log('   querySelector classes not present anywhere: '+(missCls.length?JSON.stringify(missCls):'none'));
}
