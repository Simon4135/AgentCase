const fs = require('fs');
const dir = 'D:/WorkbuddyUseCase/WorkBuddy解决方案库';
const dirs = fs.readdirSync(dir, { withFileTypes: true }).filter(e => e.isDirectory()).map(e => e.name);
const nums = dirs.map(d => +d.slice(0, 3)).sort((a, b) => a - b);
console.log('dir count =', dirs.length);
const missing = [];
for (let i = 1; i <= Math.max(...nums); i++) if (!nums.includes(i)) missing.push(i);
console.log('max =', Math.max(...nums), '| missing nums =', missing.join(','));
// cross-check against the CSV
const csv = fs.readFileSync(dir + '/全量清单.csv', 'utf8').split(/\r?\n/).filter(x => x.trim());
console.log('csv lines =', csv.length);
const csvNums = csv.slice(1).map(l => +l.slice(0, 3));
console.log('csv nums missing =', (() => { const m = []; for (let i = 1; i <= Math.max(...csvNums); i++) if (!csvNums.includes(i)) m.push(i); return m.join(','); })());
