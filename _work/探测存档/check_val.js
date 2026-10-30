const fs=require('fs');
const d=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/index_data.json","utf8"));
const isScore=s=>/^痛感\s*\d/.test(s)||/^评分口径/.test(s)||/^\d+(\.\d+)?\s*$/.test(s);
let badVal=0, badEv=0, pagesWithScore=0;
const badSamples=[];
for(const r of d){
  if(r.val&&isScore(r.val)){badVal++; if(badSamples.length<8)badSamples.push(r.n+' '+r.t+' :: '+r.val.slice(0,60));}
  let has=false;
  for(const x of (r.ev||[])) if(isScore(x)){badEv++;has=true;}
  if(has)pagesWithScore++;
}
console.log('pages:',d.length);
console.log('val that is a score line:',badVal);
console.log('pages whose ev contains a score line:',pagesWithScore);
console.log('total score-entries inside ev:',badEv);
badSamples.forEach(s=>console.log('  '+s));
console.log('');
console.log('--- what does val look like overall: first-60-char distribution of prefixes ---');
const pref={};
for(const r of d){ const v=(r.val||'').slice(0,10); pref[v]=(pref[v]||0)+1; }
Object.entries(pref).sort((a,b)=>b[1]-a[1]).slice(0,12).forEach(e=>console.log('  '+e[1]+'  '+e[0]));
console.log('');
console.log('--- compare: how does val differ from ev[0] / cmp.new ---');
let fromEv=0,fromCv=0,fromCmp=0;
for(const r of d){ if(!r.val)continue; if(r.ev&&r.ev.length&&r.val===r.ev[0].slice(0,300))fromEv++; else if(r.cv&&r.cv.length&&r.val===(r.cv[0].h+'：'+r.cv[0].t).slice(0,300))fromCv++; else if(r.cmp&&r.cmp.new&&r.val===r.cmp.new)fromCmp++; }
console.log('val sourced from ev[0]:',fromEv,'| cv[0]:',fromCv,'| cmp.new:',fromCmp,'| other:',d.filter(r=>r.val).length-fromEv-fromCv-fromCmp);
