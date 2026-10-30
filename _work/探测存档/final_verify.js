const fs=require('fs'), path=require('path'), vm=require('vm');
const OUT='D:/WorkbuddyUseCase/WorkBuddy解决方案库';
const st=fs.statSync(OUT);
console.log('=== 顶层产物 ===');
for (const f of fs.readdirSync(OUT).filter(x=>fs.statSync(path.join(OUT,x)).isFile()))
  console.log('  '+f.padEnd(20)+ (fs.statSync(path.join(OUT,f)).size/1024).toFixed(0)+' KB');

console.log('\n=== README 章节 ===');
const md=fs.readFileSync(OUT+'/README.md','utf8');
md.split('\n').filter(l=>/^## /.test(l)).forEach(l=>console.log('  '+l));
console.log('  README bytes:', md.length);

console.log('\n=== CSV ===');
const csv=fs.readFileSync(OUT+'/全量清单.csv','utf8');
const lines=csv.split('\r\n');
console.log('  行数:',lines.length,'| BOM:',csv.charCodeAt(0)===0xFEFF);
console.log('  表头:',lines[0].replace(/^\uFEFF/,''));
console.log('  样例:',lines[1].slice(0,200));
// column count consistency
const hdr=lines[0].replace(/^\uFEFF/,'').split(',').length;
let bad=0; lines.slice(1).filter(Boolean).forEach(l=>{ if(l.split(',').length!==hdr) bad++; });
console.log('  列数不一致行:',bad,'(表头',hdr,'列)');

console.log('\n=== 索引.html 冒烟 ===');
const h=fs.readFileSync(OUT+'/索引.html','utf8');
console.log('  bytes:',h.length,'| placeholder left:',h.indexOf('/*__DATA__*/')>=0);
console.log('  筛选控件:',['q','fInd','fRole','fTier','fPkg','fPrm','fRoi','reset'].map(i=>i+(h.indexOf('id="'+i+'"')>=0?'✓':'✗')).join(' '));
console.log('  新增列:',h.indexOf('业务价值 / ROI 说明')>=0?'✓':'✗');

console.log('\n=== 分析.html 冒烟 ===');
const a=fs.readFileSync(OUT+'/分析.html','utf8');
console.log('  bytes:',a.length,'| placeholder left:',a.indexOf('/*__DATA__*/')>=0);
console.log('  区块:',['行业维度','角色维度','交叉矩阵','交互维度','形态维度','业务价值 / ROI 维度','官方价值评分维度','最大差异点','价值主题词'].map(t=>t+(a.indexOf(t)>=0?'✓':'✗')).join(' '));
console.log('  navlinks 互相引用:', (h.indexOf('分析.html')>=0?'索引→分析✓':'索引→分析✗'), (a.indexOf('索引.html')>=0?'分析→索引✓':'分析→索引✗'));
