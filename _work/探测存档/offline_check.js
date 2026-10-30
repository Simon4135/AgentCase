const fs = require('fs');
const dir = 'D:/WorkbuddyUseCase/WorkBuddy解决方案库';
for (const f of ['索引.html', '分析.html']) {
  const s = fs.readFileSync(dir + '/' + f, 'utf8');
  const net = (s.match(/fetch\(|XMLHttpRequest|\.load\(|import\(/g) || []).length;
  const srcTag = (s.match(/<script[^>]*\ssrc=/gi) || []).length;
  const extHref = (s.match(/<link[^>]*href="https?:/gi) || []).length;
  const imgSrc = (s.match(/<img[^>]*src="https?:/gi) || []).length;
  console.log(f, '| ext-script=' + srcTag, 'ext-css=' + extHref, 'ext-img=' + imgSrc, 'net-calls=' + net, 'size=' + s.length);
}
console.log('--- top level ---');
for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
  const p = dir + '/' + e.name;
  const sz = e.isDirectory() ? '' : ' ' + fs.statSync(p).size + 'B';
  console.log((e.isDirectory() ? '[D] ' : '[F] ') + e.name + sz);
}
