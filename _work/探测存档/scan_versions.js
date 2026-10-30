
const fs = require('fs');
const BASE = 'https://workbuddy-space-static.codebuddy.work';
const NID = 'ZljbYQzFpALFLcPwKPlct1';
(async () => {
  // 1) exact URLs from screenshot
  const exact = [
    BASE + '/page/C4lMIxqXQDzznN6KEtzzqft/1/install_skill.py',
    BASE + '/page/IN5WrKfFc3l53vzlPEJgpl/0/pkg.zip',
  ];
  for (const u of exact) {
    try { const r = await fetch(u); console.log('[exact]', r.status, r.headers.get('content-type'), r.headers.get('content-length')||'', u); }
    catch(e){ console.log('[exact] ERR', u, e.message); }
  }
  // 2) scan versions of hub node
  console.log('\n--- version scan ' + NID + ' ---');
  const found = [];
  for (let v = 0; v <= 40; v++) {
    const u = BASE + '/page/' + NID + '/' + v + '/index.html';
    try {
      const r = await fetch(u);
      if (!r.ok) continue;
      const t = await r.text();
      const title = (t.match(/<title[^>]*>([\s\S]*?)<\/title>/)||[])[1];
      const solN = (t.match(/\{t:"/g)||[]).length;
      console.log('v'+v, 'bytes='+t.length, '| ' + title + ' | solN=' + solN + ' | 场景引入=' + t.includes('场景引入') + ' 推荐任务=' + t.includes('推荐任务'));
      found.push({v, len: t.length, title, solN, hasTab: t.includes('推荐任务')});
    } catch(e) { console.log('v'+v, 'ERR', e.message); }
  }
  fs.writeFileSync('D:\\WorkbuddyUseCase\\_probe\\versions.json', JSON.stringify(found, null, 2));
})();
