const fs = require('fs'), path = require('path');
const P = 'D:/WorkbuddyUseCase/_probe';
const items = fs.readdirSync(P, { withFileTypes: true });
const dirs = items.filter(e => e.isDirectory());
const files = items.filter(e => e.isFile());
console.log('--- subdirs ---');
for (const d of dirs) {
  const sub = fs.readdirSync(P + '/' + d.name);
  let b = 0; for (const f of sub) { try { b += fs.statSync(P + '/' + d.name + '/' + f).size; } catch (e) {} }
  console.log('  ' + d.name + '/  files=' + sub.length + '  ' + (b / 1048576).toFixed(1) + ' MB');
}
console.log('--- loose files by group ---');
const groups = { data: [], shot: [], bundle: [], JScode: [], other: [] };
for (const f of files) {
  const s = fs.statSync(P + '/' + f.name).size;
  if (/\.png$/i.test(f.name)) groups.shot.push(f.name + ' (' + Math.round(s / 1024) + 'K)');
  else if (/\.json$/i.test(f.name)) groups.data.push(f.name + ' (' + Math.round(s / 1024) + 'K)');
  else if (/\.html$/i.test(f.name)) groups.data.push(f.name + ' (' + Math.round(s / 1024) + 'K)');
  else if (/^(main|chunk)\.js$/.test(f.name)) groups.bundle.push(f.name + ' (' + Math.round(s / 1024) + 'K)');
  else if (/\.js$/i.test(f.name)) groups.JScode.push(f.name);
  else groups.other.push(f.name + ' (' + s + 'B)');
}
console.log('  [data/json/html] ' + groups.data.length + ': ' + groups.data.join(', '));
console.log('  [png] ' + groups.shot.length + ': ' + groups.shot.join(', '));
console.log('  [bundle] ' + groups.bundle.join(', '));
console.log('  [other] ' + groups.other.join(', '));
console.log('  [probe .js] ' + groups.JScode.length + ' files');
