
const fs = require('fs');
const NID = 'ZljbYQzFpALFLcPwKPlct1';
(async () => {
  for (const v of [210, 209]) {
    const url = 'https://workbuddy-space-static.codebuddy.work/page/' + NID + '/' + v + '/index.html';
    const r = await fetch(url);
    if (!r.ok) { console.log('v'+v, 'status', r.status); continue; }
    const t = await r.text();
    fs.writeFileSync('D:\\WorkbuddyUseCase\\_probe\\index_v' + v + '.html', t);
    console.log('v'+v, 'bytes=' + t.length);
    console.log('  title=' + (t.match(/<title[^>]*>([\s\S]*?)<\/title>/)||[])[1]);
    console.log('  场景引入=' + t.includes('场景引入'), '推荐任务=' + t.includes('推荐任务'), 'LiveDemo=' + t.includes('Live Demo'));
    console.log('  install_skill=' + t.includes('install_skill'), 'pkg.zip=' + t.includes('pkg.zip'), '.zip count=' + ((t.match(/\.zip/g)||[]).length));
    console.log('  SOLUTIONS=' + t.includes('var SOLUTIONS'), 'solN=' + (t.match(/\{t:"/g)||[]).length);
    const zips = [...new Set([...t.matchAll(/[^"'\s()\\]{0,120}\.zip/g)].map(m=>m[0]))];
    console.log('  zip refs:'); zips.slice(0,40).forEach(z=>console.log('    ' + z));
  }
})();
