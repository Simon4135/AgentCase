const fs = require('fs'), path = require('path');
const dir = 'D:/WorkbuddyUseCase/WorkBuddy解决方案库';
const dirs = fs.readdirSync(dir, { withFileTypes: true }).filter(e => e.isDirectory()).map(e => e.name);
let totBytes = 0, totFiles = 0, noIntro = [], badZip = 0, mdNo = [];
function walk(p) { for (const e of fs.readdirSync(p, { withFileTypes: true })) { const q = p + '/' + e.name; if (e.isDirectory()) walk(q); else { totBytes += fs.statSync(q).size; totFiles++; } } }
for (const d of dirs) {
  const p = dir + '/' + d;
  const fsx = fs.readdirSync(p);
  if (!fsx.includes('场景引入.html')) noIntro.push(d);
  if (!fsx.includes('提示词与说明.md')) mdNo.push(d);
  for (const f of fsx) if (f.endsWith('.zip')) { const b = fs.readFileSync(p + '/' + f); if (b[0] !== 0x50 || b[1] !== 0x4b) badZip++; }
  walk(p);
}
for (const f of fs.readdirSync(dir)) if (fs.statSync(dir + '/' + f).isFile()) { totBytes += fs.statSync(dir + '/' + f).size; totFiles++; }
console.log('方案目录 =', dirs.length);
console.log('缺场景引入 =', noIntro.length, noIntro.slice(0, 5).join(','));
console.log('缺 md =', mdNo.length);
console.log('坏 zip =', badZip);
console.log('总文件 =', totFiles, '| 总字节 =', (totBytes / 1048576).toFixed(1) + ' MB');
const top = fs.readdirSync(dir).filter(f => fs.statSync(dir + '/' + f).isFile()).map(f => f + ' (' + Math.round(fs.statSync(dir + '/' + f).size / 1024) + ' KB)');
console.log('顶层文件 =', top.join(' | '));
