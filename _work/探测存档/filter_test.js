const fs=require('fs'), vm=require('vm');
const OUT='D:/WorkbuddyUseCase/WorkBuddy解决方案库/';
function mkEl(tag){ return { tagName:tag||'div', _html:'', textContent:'', value:'', dataset:{}, style:{},
  classList:{add(){},remove(){},contains(){return false}}, appendChild(){}, removeChild(){}, addEventListener(){},
  setAttribute(){}, getAttribute(){return null}, querySelector(){return mkEl('div')}, querySelectorAll(){return []},
  get innerHTML(){return this._html}, set innerHTML(v){this._html=v} }; }
const store={}; const getEl=id=>store[id]||(store[id]=mkEl('div'));
const doc={ getElementById:getEl, querySelector:()=>mkEl('div'), querySelectorAll:()=>[], createElement:t=>mkEl(t), addEventListener(){}, body:mkEl('body') };

const h=fs.readFileSync(OUT+'索引.html','utf8');
const body=[...h.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)].map(m=>m[1]).pop();
const ctx={ console, document:doc, window:{addEventListener(){}}, addEventListener(){}, setTimeout, clearTimeout };
ctx.globalThis=ctx; vm.createContext(ctx); vm.runInContext(body,ctx,{filename:'index'});
for (const id of ['q','fInd','fRole','fTier','fPkg','fPrm','fRoi']) getEl(id).value='';
const tb=()=>getEl('tb')._html||'';
const count=()=>{ctx.render(); return (tb().match(/<tr>/g)||[]).length;};
const reset=()=>{for(const id of ['q','fInd','fRole','fTier','fPkg','fPrm','fRoi']) getEl(id).value='';};

console.log('baseline rows:', count());
getEl('fRole').value='法务'; console.log('fRole=法务 ->', count());
reset(); getEl('fRole').value='运营'; console.log('fRole=运营 ->', count());
reset(); getEl('fRoi').value='1'; console.log('fRoi=仅有量化 ->', count());
reset(); getEl('fInd').value='制造与工业'; console.log('fInd=制造与工业 ->', count());
reset(); getEl('fPkg').value='1'; console.log('fPkg=有技能包 ->', count());
reset(); getEl('fTier').value='C'; console.log('fTier=C ->', count());
reset(); getEl('fRole').value='法务'; getEl('fInd').value='金融'; console.log('法务+金融 ->', count());
reset(); getEl('q').value='图纸'; console.log('搜索"图纸" ->', count());
reset(); getEl('q').value='不要求'; console.log('搜索"不要求"(在最大差异点里) ->', count());

// sample the first row's value cell
reset(); ctx.render();
const m=tb().match(/<td class="v" id="v0">([\s\S]*?)<\/td>/);
console.log('\n--- 首行 业务价值单元格 ---');
console.log(m? m[1].replace(/></g,'>\n<').slice(0,700) : 'NOT FOUND');
// score badge presence across rows
const rows=tb();
console.log('\n官方评分徽章行数:', (rows.match(/官方评分/g)||[]).length);
console.log('展开按钮行数:', (rows.match(/展开价值详情/g)||[]).length);
console.log('最大差异点区块(详情内):', (rows.match(/最大差异点（官方原文/g)||[]).length);
