const fs=require('fs');
const h=fs.readFileSync('D:/WorkbuddyUseCase/WorkBuddy解决方案库/分析.html','utf8');
console.log('bytes:',h.length,'| placeholder left:', h.indexOf('/*__DATA__*/')>=0);
const i=h.indexOf('const DATA = ')+13;
const j=h.indexOf('];',i)+1;
const d=JSON.parse(h.slice(i,j));
console.log('rows:',d.length);
console.log('with val:',d.filter(r=>r.val).length,'| roi:',d.filter(r=>r.roi&&r.roi.speed).length);
console.log('with kinds:',d.filter(r=>r.kinds&&r.kinds.length).length,'| srckinds:',d.filter(r=>r.skinds&&r.skinds.length).length,'| steps>0:',d.filter(r=>r.steps>0).length);
const roleList=r=>String(r.roles||'').split('、').map(s=>s.trim()).filter(Boolean);
const roleE=(()=>{const m=new Map();for(const r of d)for(const k of roleList(r))m.set(k,(m.get(k)||0)+1);return [...m.entries()].sort((a,b)=>b[1]-a[1]);})();
console.log('roles:',roleE.length,'top5:',JSON.stringify(roleE.slice(0,5)));
const indE=(()=>{const m=new Map();for(const r of d){const k=r.ind||'（未标注行业）';m.set(k,(m.get(k)||0)+1);}return [...m.entries()].sort((a,b)=>b[1]-a[1]);})();
console.log('inds:',indE.length,'top5:',JSON.stringify(indE.slice(0,5)));
const sk={}; for(const r of d) for(const k of (r.skinds||[])) sk[k]=(sk[k]||0)+1;
console.log('skinds:',JSON.stringify(sk));
const kd={}; for(const r of d) for(const k of (r.kinds||[])) kd[k]=(kd[k]||0)+1;
console.log('kinds:',JSON.stringify(kd));
const tc={}; for(const r of d){const t=String(r.tier||'D').charAt(0);tc[t]=(tc[t]||0)+1;}
console.log('tiers:',JSON.stringify(tc));
const TH=['效率','准确','可追溯','标准化','自动','一键','口径','风险','预警','合规','对账','汇总','复盘','洞察','节省','减少','闭环','模板','责任','异常','分级','复用','沉淀','决策'];
const corpus=d.map(r=>(r.val||'')+' '+(r.ev||[]).join(' ')+' '+(r.cv||[]).map(c=>c.h+c.t).join(' '));
console.log('themes:',JSON.stringify(TH.map(t=>[t,corpus.filter(s=>s.indexOf(t)>=0).length]).filter(e=>e[1]>0).sort((a,b)=>b[1]-a[1])));
const roles=roleE.map(e=>e[0]), inds=indE.map(e=>e[0]);
const cnt={}; for(const r of d){const i2=r.ind||'（未标注行业）';for(const ro of roleList(r)){const k=i2+'|'+ro;cnt[k]=(cnt[k]||0)+1;}}
let mn=1e9,mx=0; for(const k in cnt){mn=Math.min(mn,cnt[k]);mx=Math.max(mx,cnt[k]);}
console.log('matrix cells:',Object.keys(cnt).length,'min:',mn,'max:',mx,'grid:',inds.length+'x'+roles.length);
