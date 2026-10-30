
const fs = require('fs');
(async () => {
  const u = 'https://workbuddy-space-static.codebuddy.work/page/ZljbYQzFpALFLcPwKPlct1/0/index.html';
  const r = await fetch(u);
  const t = await r.text();
  fs.writeFileSync('D:\\WorkbuddyUseCase\\_probe\\index0.html', t);
  console.log('status', r.status, 'len', t.length);
  console.log('--- head 1200 ---');
  console.log(t.slice(0, 1200));
  console.log('--- tail 600 ---');
  console.log(t.slice(-600));
  // count links to /page/
  const links = [...t.matchAll(/\/page\/([A-Za-z0-9_-]{10,30})/g)].map(m=>m[1]);
  console.log('--- /page/ refs unique:', new Set(links).size);
  console.log([...new Set(links)].slice(0,40).join('\n'));
  // count solution-ish anchors
  const anchors = [...t.matchAll(/<a[^>]+href="([^"]+)"[^>]*>/g)].map(m=>m[1]);
  console.log('--- anchors unique:', new Set(anchors).size);
  console.log([...new Set(anchors)].slice(0,60).join('\n'));
})();
