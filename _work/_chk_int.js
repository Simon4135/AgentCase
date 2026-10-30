const fs=require('fs');
const p='D:\\WorkbuddyUseCase\\AI接入企业系统调研.html';
const h=fs.readFileSync(p,'utf8');
const cnt=(re)=>(h.match(re)||[]).length;
console.log(JSON.stringify({
  bytes:Buffer.byteLength(h,'utf8'),
  doctype:cnt(/<!doctype html>/gi),
  htmlOpen:cnt(/<html/g), htmlClose:cnt(/<\/html>/g),
  headOpen:cnt(/<head>/g), headClose:cnt(/<\/head>/g),
  bodyOpen:cnt(/<body>/g), bodyClose:cnt(/<\/body>/g),
  section:cnt(/<section>/g), sectionClose:cnt(/<\/section>/g),
  divOpen:cnt(/<div[ >]/g), divClose:cnt(/<\/div>/g),
  table:cnt(/<table>/g), tableClose:cnt(/<\/table>/g),
  ext:cnt(/https?:\/\/(?!github\.com)[^"']*/g),
  extRes:cnt(/<script[^>]+src=/gi)+cnt(/<link[^>]+href=/gi),
  placeholder:cnt(/__|TODO|XXX/g),
  hrefsExternal:cnt(/href="https?:\/\//g)
},null,1));
// 内联脚本语法检查
const m=h.match(/<script>([\s\S]*?)<\/script>/g)||[];
const vm=require('vm');
m.forEach((s,i)=>{ const code=s.replace(/^<script>/,'').replace(/<\/script>$/,''); try{ new vm.Script(code); console.log('script['+i+'] len='+code.length+' SYNTAX OK'); }catch(e){ console.log('script['+i+'] SYNTAX ERR '+e.message); } });
