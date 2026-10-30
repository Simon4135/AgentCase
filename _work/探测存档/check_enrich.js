const fs=require('fs');
const EN=JSON.parse(fs.readFileSync('D:/WorkbuddyUseCase/_tools/enrich.json','utf8'));
const ks=Object.keys(EN);
let n=0,bad=0;
const samples=[];
for(const k of ks){
  const e=EN[k];
  if(!e.nums)continue;
  n++;
  for(const s of e.nums){
    if(/px|rgba|border|font|margin|width|height|transform|opacity|0\.\d+s|ease|flex/i.test(s))bad++;
  }
  if(samples.length<12&&e.nums.length>=3)samples.push([k,e.nums]);
}
console.log('pages with nums:',n,'| suspicious tokens:',bad);
samples.forEach(([k,v])=>{console.log('--- '+k); v.slice(0,5).forEach(x=>console.log('    '+x));});
// 检查 ev 与 cv 覆盖
console.log('ev:',ks.filter(k=>EN[k].ev&&EN[k].ev.length).length);
console.log('cv:',ks.filter(k=>EN[k].cv&&EN[k].cv.length).length);
console.log('cmp:',ks.filter(k=>EN[k].cmp).length);
console.log('outs:',ks.filter(k=>EN[k].outs&&EN[k].outs.length).length);
console.log('srckinds:',ks.filter(k=>EN[k].srckinds).length);
console.log('kinds:',ks.filter(k=>EN[k].kinds).length);
const sk={}; for(const k of ks) for(const x of (EN[k].srckinds||[])) sk[x]=(sk[x]||0)+1;
console.log('srckinds dist:',JSON.stringify(sk));
const kd={}; for(const k of ks) for(const x of (EN[k].kinds||[])) kd[x]=(kd[x]||0)+1;
console.log('kinds dist:',JSON.stringify(kd));
