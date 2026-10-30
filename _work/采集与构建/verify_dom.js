const fs=require('fs'),path=require('path'),vm=require('vm');
const TOP='D:/WorkbuddyUseCase';
function mkEl(){ const e={innerHTML:'',textContent:'',value:'',style:{},children:[],classList:{add(){},remove(){},toggle(){}},
  addEventListener(){},appendChild(){},querySelectorAll:()=>[],querySelector:()=>null,getAttribute:()=>null,setAttribute(){},focus(){},blur(){},click(){}}; return e; }
function run(file){
  const src=fs.readFileSync(path.join(TOP,file),'utf8');
  const inline=src.match(/<script>([\s\S]*?)<\/script>/g).map(s=>s.slice(8,-9)).join('\n');
  // 自动把所有 getElementById 的 id 建桩
  const wanted=[...new Set([...inline.matchAll(/getElementById\(\s*["'\x27]([^"'\x27]+)["'\x27]/g)].map(m=>m[1]))];
  const store={};
  for(const id of wanted) store[id]=mkEl();
  const doc={ getElementById:id=>store[id]||(store[id]=mkEl()), querySelectorAll:()=>[], querySelector:()=>null,
    addEventListener(){}, createElement:mkEl, body:mkEl(), documentElement:mkEl(), title:'' };
  const ctx={ document:doc, window:{addEventListener(){},matchMedia:()=>({matches:false,addEventListener(){}})}, console, location:{hash:''}, localStorage:{getItem:()=>null,setItem(){}}, setTimeout, encodeURIComponent, decodeURIComponent };
  ctx.window.document=doc; ctx.globalThis=ctx;
  let err=null; try{ vm.createContext(ctx); new vm.Script(inline).runInContext(ctx); }catch(e){ err=String(e.message).slice(0,200); }
  return { store, err, ids:wanted };
}
const ri=run('索引.html');
console.log('索引.html err:', ri.err||'none', '| 桩 id 数:', ri.ids.length);
const tb=ri.store.tb?ri.store.tb.innerHTML:'';
console.log('  #tb <tr> =', (tb.match(/<tr/g)||[]).length);
const hrefs=[...new Set((tb.match(/href="[^"]+"/g)||[]).map(h=>h.slice(6,-1)))];
console.log('  href 样本:'); hrefs.slice(0,4).forEach(h=>console.log('    '+h));
let ok=0,bad=0; const miss=[];
for(const h of hrefs){ if(h.startsWith('#')) continue; const p=path.join(TOP,decodeURIComponent(h)); if(fs.existsSync(p)) ok++; else { bad++; miss.push(h); } }
console.log('  href 磁盘存在: '+ok+' OK / '+bad+' MISSING');
miss.slice(0,6).forEach(m=>console.log('    MISSING: '+m));
console.log('  #foot:', (ri.store.foot?ri.store.foot.innerHTML:'').slice(0,120));
const ra=run('分析.html');
console.log('');
console.log('分析.html err:', ra.err||'none', '| 桩 id 数:', ra.ids.length);
for(const k of ['kpis','secInd','secMx','secRole','secScore','secScoreMx','secThemes','secDiffTags'])
  console.log('  '+k.padEnd(12)+' len=', (ra.store[k]?ra.store[k].innerHTML:'').length);
