const fs=require('fs'), vm=require('vm');
const html=fs.readFileSync('D:/WorkbuddyUseCase/分析.html','utf8');
const m=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
function mkEl(id){ return { id, innerHTML:'', textContent:'', style:{}, dataset:{}, value:'', className:'',
  querySelectorAll:()=>[], querySelector:()=>null, addEventListener:()=>{}, classList:{add(){},remove(){},toggle(){}},
  appendChild(){}, setAttribute(){}, getAttribute(){return null;} }; }
const store={};
[...m[0][1].matchAll(/getElementById\((['"])([^'"]+)\1\)/g)].map(x=>x[2])
 .concat([...m[0][1].matchAll(/el\((['"])([^'"]+)\1\)/g)].map(x=>x[2]))
 .forEach(id=>{ if(!store[id]) store[id]=mkEl(id); });
const doc={ getElementById:(id)=>{ if(!store[id]) store[id]=mkEl(id); return store[id]; },
  querySelectorAll:()=>[], querySelector:()=>null, addEventListener:()=>{}, createElement:mkEl, body:mkEl('body') };
const ctx={ document:doc, console, JSON, Math, Date, Object, Array, String, Number, encodeURI, decodeURI };
ctx.window=ctx; ctx.globalThis=ctx;
try{ vm.createContext(ctx); new vm.Script(m[0][1].replace('/*__DATA__*/[]','[]'),{filename:'a.js'}).runInContext(ctx); console.log('RUN OK'); }
catch(e){ console.log('RUN FAIL: '+e.message); console.log(e.stack.split('\n').slice(0,3).join('\n')); }
['secVerdict','flowSys','flowAct','secChain','flowSteps2','secLimit','guideGood','guideBad','guideDiff','kpis'].forEach(id=>{
  const e=store[id]; const h=e?String(e.innerHTML||''):'(absent)';
  console.log('  '+id.padEnd(13)+' len='+h.length);
});
