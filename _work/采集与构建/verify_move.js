const fs=require('fs'), path=require('path'), crypto=require('crypto');
const TOP='D:/WorkbuddyUseCase';
const chk=(p)=>{ if(!fs.existsSync(p)) return 'MISSING';
  const b=fs.readFileSync(p); return b.length+' B / sha '+crypto.createHash('sha256').update(b).digest('hex').slice(0,12); };
console.log('=== 顶层 4 个交付物 ===');
for(const f of ['索引.html','分析.html','README.md','全量清单.csv'])
  console.log('  '+f.padEnd(14)+' -> '+chk(path.join(TOP,f)));
console.log('');
console.log('=== 索引/分析 链接前缀检查 ===');
const idx=fs.readFileSync(path.join(TOP,'索引.html'),'utf8');
const ana=fs.readFileSync(path.join(TOP,'分析.html'),'utf8');
for(const [n,s] of [['索引.html',idx],['分析.html',ana]]){
  const m=s.match(/\.\/WorkBuddy解决方案库\//g)||[];
  const bad=s.match(/"\.\/\d{3}_/g)||[];
  console.log('  '+n+': 新前缀 '+m.length+' 个 / 旧式 "./NNN_" '+bad.length+' 个');
}
console.log('');
console.log('=== 抽 3 个真实链接验证磁盘存在 ===');
const links=[...new Set((idx.match(/href="\.\/WorkBuddy解决方案库\/[^"]+"/g)||[]))].slice(0,3);
for(const l of links){
  const rel=l.slice(6,-1);
  const p=path.join(TOP, decodeURIComponent(rel));
  console.log('  '+rel+' -> '+(fs.existsSync(p)?'OK '+fs.statSync(p).size+' B':'MISSING'));
}
console.log('');
console.log('=== 方案库 693 目录 ===');
console.log('  dirs='+fs.readdirSync(path.join(TOP,'WorkBuddy解决方案库')).length);
