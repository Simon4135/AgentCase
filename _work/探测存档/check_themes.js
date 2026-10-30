const fs=require('fs');
const d=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/index_data.json","utf8"));
const corpus=d.map(r=>(r.val||'')+' '+(r.ev||[]).join(' ') + ' ' + (r.cv||[]).map(c=>c.h+c.t).join(' '));
// how many hit only in val? only in ev? only in cv?
for(const t of ['口径','效率','自动','模板','异常','风险']){
  let a=0,b=0,c=0;
  for(const r of d){
    const inVal=(r.val||'').indexOf(t)>=0;
    const inEv=(r.ev||[]).join(' ').indexOf(t)>=0;
    const inCv=(r.cv||[]).map(x=>x.h+x.t).join(' ').indexOf(t)>=0;
    if(inVal)a++; if(inEv)b++; if(inCv)c++;
  }
  console.log(t,'val:'+a,'ev:'+b,'cv:'+c);
}
console.log('--- raw text of 5 rows containing 口径 ---');
let n=0;
for(let i=0;i<d.length&&n<4;i++){ if((d[i].val||'').indexOf('口径')>=0){ console.log(d[i].n+' '+d[i].t+' :: '+d[i].val.slice(0,150)); n++; } }
console.log('--- how many val are empty ---', d.filter(r=>!r.val).length);
