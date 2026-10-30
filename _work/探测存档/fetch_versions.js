
const fs = require('fs');
const NID = 'ZljbYQzFpALFLcPwKPlct1';
(async () => {
  for (const v of [0,1,2,3]) {
    const url = 'https://workbuddy-space-static.codebuddy.work/page/' + NID + '/' + v + '/index.html';
    try {
      const r = await fetch(url);
      if (!r.ok) { console.log(v, 'status', r.status); continue; }
      const t = await r.text();
      fs.writeFileSync('D:\\WorkbuddyUseCase\\_probe\\index_v' + v + '.html', t);
      const title = (t.match(/<title[^>]*>([\s\S]*?)<\/title>/) || [])[1];
      console.log('v' + v, 'len=' + t.length, 'title=' + title);
      console.log('   hasSOLUTIONS=' + t.includes('var SOLUTIONS'), 'has场景引入=' + t.includes('场景引入'), 'has推荐任务=' + t.includes('推荐任务'), 'has pkg.zip=' + t.includes('pkg.zip'));
      const solCount = (t.match(/{t:"/g)||[]).length;
      console.log('   {t:" count=' + solCount);
    } catch(e) { console.log(v, 'ERR', e.message); }
  }
})();
