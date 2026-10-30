
const fs = require('fs');
const path = require('path');
const map = JSON.parse(fs.readFileSync('D:\\WorkbuddyUseCase\\_probe\\chunkmap.json','utf8'));
const BASE = 'https://static.workbuddy.cn/web/library/30ab9e7878c3d0870f1137731a85d4827eb62b1e/js/';
const outDir = 'D:\\WorkbuddyUseCase\\_probe\\chunks';
fs.mkdirSync(outDir, {recursive:true});
const ids = Object.keys(map.hashMap);
let done=0, fail=0;
async function one(id){
  const name = map.nameMap[id] ? map.nameMap[id] : id;
  const url = BASE + name + '.' + map.hashMap[id] + '.js';
  const out = path.join(outDir, name + '.js');
  try {
    const r = await fetch(url);
    if(!r.ok) { fail++; return; }
    const t = await r.text();
    fs.writeFileSync(out, t);
    done++;
  } catch(e){ fail++; }
}
(async()=>{
  const queue = [...ids];
  const workers = Array.from({length:16}, async()=>{
    while(queue.length){ const id = queue.shift(); if(id===undefined) break; await one(id); }
  });
  await Promise.all(workers);
  console.log('DONE ok='+done+' fail='+fail);
})();
