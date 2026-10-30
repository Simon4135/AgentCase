const fs=require('fs'),path=require('path');
const ROOT='D:/WorkbuddyUseCase/WorkBuddy解决方案库';
const rows=JSON.parse(fs.readFileSync('D:/WorkbuddyUseCase/_tools/last_run.json','utf8')).rows;
const plain=h=>h.replace(/<!--[\s\S]*?-->/g,' ').replace(/<\/?[a-zA-Z][^>]*>/g,' ')
  .replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/\s+/g,' ').trim();
const TU={'秒':1/60,'分钟':1,'小时':60,'个工作日':480,'工作日':480,'天':480,'周':2400,'个月':9600,'月':9600};
const TIME_RE=/(\d[\d,]*(?:\.\d+)?(?:\s*[-~～—到]\s*\d[\d,]*(?:\.\d+)?)?)\s*(个工作日|工作日|小时|分钟|秒|天|周|个月|月)/g;
const toMin=(n,u)=>{const k=TU[u];if(!k)return null;const p=String(n).replace(/,/g,'').split(/[-~～—到]/).map(x=>parseFloat(x)).filter(x=>!isNaN(x));if(!p.length)return null;return p.reduce((a,b)=>a+b,0)/p.length*k;};
function times(s){const out=[];let m;TIME_RE.lastIndex=0;while((m=TIME_RE.exec(s))){out.push({raw:m[1]+' '+m[2],min:toMin(m[1],m[2])});}return out;}
let pair=0,pairList=[];
for(const r of rows){
  const p=path.join(ROOT,r.dir,'场景引入.html');
  if(!fs.existsSync(p))continue;
  const t=plain(fs.readFileSync(p,'utf8'));
  const ts=times(t).filter(x=>x.min&&x.min>=0.5&&x.min<=60000);
  if(ts.length<2)continue;
  let best=null;
  for(let i=0;i<ts.length;i++)for(let j=0;j<ts.length;j++){
    if(i===j)continue; const a=ts[i],b=ts[j];
    if(a.min> b.min*2.5){ const ratio=a.min/b.min; if(!best||ratio>best.ratio) best={a,b,ratio:Math.round(ratio*10)/10}; }
  }
  if(best){pair++; if(pairList.length<12)pairList.push([r.dir,best.a.raw,best.b.raw,best.ratio]);}
}
console.log('pages with plausible time-contrast:',pair,'/',rows.length);
pairList.forEach(x=>console.log('  ['+x[0]+'] '+x[1]+' -> '+x[2]+'  ('+x[3]+'x)'));
