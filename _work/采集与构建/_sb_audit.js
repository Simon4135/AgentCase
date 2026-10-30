
const fs=require('fs'),path=require('path'),crypto=require('crypto'),vm=require('vm');
const TOP='D:/WorkbuddyUseCase';
function sha(p){return crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex').slice(0,16);}
function walk(d,acc){for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,e.name);if(e.isDirectory())walk(p,acc);else{const s=fs.statSync(p);acc.n++;acc.b+=s.size;}}return acc;}
console.log('=== 顶层 ===');
for(const e of fs.readdirSync(TOP,{withFileTypes:true})){
  const p=path.join(TOP,e.name);
  if(e.isDirectory()){const a=walk(p,{n:0,b:0});console.log('DIR ',e.name,'files='+a.n,(a.b/1048576).toFixed(1)+' MB');}
  else{const s=fs.statSync(p);console.log('FILE',e.name,s.size+'B','sha='+sha(p));}
}
console.log('');
console.log('=== 交付物细节 ===');
const idx=fs.readFileSync(TOP+'/索引.html','utf8');
const ana=fs.readFileSync(TOP+'/分析.html','utf8');
const res=fs.readFileSync(TOP+'/AI接入企业系统调研.html','utf8');
const rd=fs.readFileSync(TOP+'/README.md','utf8');
const csv=fs.readFileSync(TOP+'/全量清单.csv','utf8');
console.log('索引.html sections? rows=', (idx.match(/__DATA__/g)||[]).length===0?'no-placeholder':'HAS-PLACEHOLDER');
console.log('分析.html sections=', (ana.match(/<section/g)||[]).length, 'partdiv=', (ana.match(/class="partdiv"/g)||[]).length);
console.log('调研.html sections=', (res.match(/<section/g)||[]).length, 'extLinks=', (res.match(/href="http/g)||[]).length);
console.log('README.md 二级章节=', (rd.match(/^## /gm)||[]).length, 'lines=', rd.split('\n').length, 'sidebarNote=', rd.includes('常驻导航栏'));
console.log('CSV 行=', csv.split(/\r?\n/).filter(x=>x.length).length, 'BOM=', csv.charCodeAt(0)===0xFEFF);
// 每页脚本语法
for (const [n,h] of [['索引',idx],['分析',ana],['调研',res]]) {
  const scripts=[...h.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)].map(m=>m[1]);
  let ok=0; for(const s of scripts){try{new vm.Script(s);ok++;}catch(e){console.log('  FAIL',n,e.message);}}
  console.log(n+' scripts='+scripts.length+' ok='+ok);
}
// 方案库
const lib=TOP+'/WorkBuddy解决方案库';
const dirs=fs.readdirSync(lib,{withFileTypes:true}).filter(e=>e.isDirectory());
const bad=dirs.filter(e=>!/^\d{3}_/.test(e.name));
console.log('方案目录=',dirs.length,'非规范名=',bad.length);
