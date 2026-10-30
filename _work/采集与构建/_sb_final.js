
const fs=require('fs'),path=require('path'),vm=require('vm');
const TOP='D:/WorkbuddyUseCase';
const files=['索引.html','分析.html','AI接入企业系统调研.html'];
for(const f of files){
  const p=path.join(TOP,f);
  const h=fs.readFileSync(p,'utf8');
  const cnt=s=>{const m=h.match(new RegExp(s,'g'));return m?m.length:0;};
  const scripts=[...h.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)].map(m=>m[1]);
  let ok=0;for(const s of scripts){try{new vm.Script(s);ok++;}catch(e){console.log('  SYNTAX FAIL',f,e.message);}}
  console.log(f, h.length+'B', 'scripts='+scripts.length,'ok='+ok,
    'wbsb='+cnt('id="wbsb"'),'body='+cnt('id="wbsbBody"'),'open='+cnt('id="wbopen"'),
    'cfg='+cnt('window.__SB'),'cssMark='+cnt('左侧导航栏（wb-sidebar）'),
    'extRes='+cnt('src="http'),'ph='+cnt('__DATA__'));
}
const rd=fs.readFileSync(path.join(TOP,'README.md'),'utf8');
console.log('README',rd.length+'B','sidebarNote='+(rd.includes('常驻导航栏')),'secs='+(rd.match(/^## /gm)||[]).length,'lines='+rd.split('\n').length);
