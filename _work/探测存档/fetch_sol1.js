
const fs = require('fs');
(async () => {
  const url = 'https://workbuddy-space-static.codebuddy.work/page/F72hKH4E4I351zD6GMbcFB/0/%E5%88%B6%E9%80%A0%E4%B8%9A%E5%9C%BA%E6%99%AF%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88_%E5%9B%BE%E7%BA%B8%E8%AF%A2%E4%BB%B7%E6%99%BA%E8%83%BD%E6%8A%A5%E4%BB%B7.html';
  const r = await fetch(url);
  const t = await r.text();
  fs.writeFileSync('D:\\WorkbuddyUseCase\\_probe\\sol1.html', t);
  console.log('status', r.status, 'len', t.length);
  // find zip / skill pkg links
  const zips = [...t.matchAll(/https?:[^"'\\s]+\.zip/g)].map(m=>m[0]);
  console.log('--- .zip refs:', zips.length);
  console.log([...new Set(zips)].slice(0,20).join('\n'));
  const pyps = [...t.matchAll(/https?:[^"'\\s]+install_skill\.py/g)].map(m=>m[0]);
  console.log('--- install_skill.py refs:', [...new Set(pyps)].length);
  console.log([...new Set(pyps)].slice(0,10).join('\n'));
  // find TASKS array
  for (const kw of ['var TASKS','TASKS =','RECOMMEND','推荐任务','tasks =']) {
    const i = t.indexOf(kw);
    console.log('--- [' + kw + '] idx=' + i);
  }
})();
