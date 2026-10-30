const fs=require('fs'), vm=require('vm');
const OUT='D:/WorkbuddyUseCase/WorkBuddy解决方案库/';

function mkEl(tag){
  const e={ tagName:tag||'div', _html:'', textContent:'', value:'', dataset:{}, style:{},
    classList:{add(){},remove(){},contains(){return false}},
    appendChild(){}, removeChild(){}, addEventListener(){}, setAttribute(){}, getAttribute(){return null},
    querySelector(){return mkEl('div')}, querySelectorAll(){return []},
    get innerHTML(){return this._html}, set innerHTML(v){this._html=v} };
  return e;
}
const store={};
function getEl(id){ return store[id] || (store[id]=mkEl('div')); }
const doc={ getElementById:getEl,
  querySelector(){return mkEl('div')}, querySelectorAll(){return []},
  createElement:t=>mkEl(t), addEventListener(){}, body:mkEl('body'), documentElement:mkEl('html') };

for (const f of ['索引.html','分析.html']) {
  const h=fs.readFileSync(OUT+f,'utf8');
  // pick the LAST inline script (the app script); earlier ones are tiny guards
  const bodies=[...h.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)].map(m=>m[1]);
  const body=bodies[bodies.length-1];
  const ctx={ console, document:doc, window:{addEventListener(){}}, addEventListener(){}, setTimeout, clearTimeout, location:{hash:''} };
  ctx.window.document=doc; ctx.globalThis=ctx;
  // pre-set filter controls
  for (const id of ['q','fInd','fRole','fTier','fPkg','fPrm','fRoi']) getEl(id).value='';
  let err=null;
  try { vm.createContext(ctx); vm.runInContext(body, ctx, {filename:f}); }
  catch(e){ err=e; }
  const tb=getEl('tb')._html||'';
  const rows=(tb.match(/<tr>/g)||[]).length;
  const det=(tb.match(/<tr class="detail"/g)||[]).length;
  console.log('=== '+f+'  error: '+(err? err.message : 'none'));
  console.log('   #tb rows '+rows+' | detail rows '+det+' | foot "'+(getEl('foot').textContent||'').slice(0,40)+'"');
  if (f.indexOf('分析')>=0) {
    ['secInd','secRole','secMx','flowIn','flowOut','flowSteps','secTier','secTierInd','secRoi','secScore','secScoreMx','secDiffTags','secThemes','kpis']
      .forEach(k=>{ const v=(getEl(k)._html||'').length; console.log('   '+k.padEnd(14)+' html '+v+(v===0?'   <-- EMPTY':'')); });
    console.log('   nScore='+getEl('nScore').textContent+' nDiff='+getEl('nDiff').textContent+' nRoi='+getEl('nRoi').textContent);
  }
}
