const fs = require('fs'), path = require('path'), crypto = require('crypto');
const LIB = 'D:/WorkbuddyUseCase/WorkBuddy解决方案库';
const files = ['索引.html', '分析.html', 'README.md', '全量清单.csv'];
const out = {};
for (const f of files) {
  const p = path.join(LIB, f);
  const b = fs.readFileSync(p);
  out[f] = { bytes: b.length, sha: crypto.createHash('sha256').update(b).digest('hex').slice(0, 16) };
}
console.log(JSON.stringify(out, null, 1));
