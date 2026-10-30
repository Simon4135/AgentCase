const fs = require('fs');
const d = JSON.parse(fs.readFileSync('D:/WorkbuddyUseCase/_probe/v210_data.json', 'utf8'));
const S = d.SOLUTIONS;
console.log('SOLUTIONS len =', S.length);
const bySid = {};
for (const s of S) bySid[s.sid] = s;
for (const sid of [644, 645, 692, 693]) {
  const s = bySid[sid];
  console.log('sid', sid, '->', s ? JSON.stringify({ t: s.t, ind: s.ind, src: s.src, placeholder: s.placeholder }) : 'NOT IN ARRAY');
}
const withSrc = S.filter(s => s.src).length;
const ph = S.filter(s => s.placeholder).length;
console.log('with src =', withSrc, '| placeholder =', ph);
