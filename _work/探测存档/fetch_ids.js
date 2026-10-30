
const fs = require('fs');
const ids = ['ZljbYQzFpALFLcPwKPlct1', 'Eo9L7laQtAJYEUZm1CIjM6', 'C4lMIxqXQDzznN6KEtzzqft', 'IN5WrKfFc3l53vzlPEJgpl'];
(async () => {
  for (const id of ids) {
    for (const v of [0,1]) {
      const url = 'https://workbuddy-space-static.codebuddy.work/page/' + id + '/' + v + '/index.html';
      const r = await fetch(url);
      if (!r.ok) { console.log(id, 'v'+v, 'status', r.status); continue; }
      const t = await r.text();
      const rootNode = (t.match(/<html data-page-node-id="([^"]+)"/)||[])[1];
      const title = (t.match(/<title[^>]*>([\s\S]*?)<\/title>/)||[])[1];
      console.log(id, 'v'+v, 'bytes=' + t.length, '| root=' + rootNode, '| title=' + title);
      console.log('    nav=' + (t.slice(t.indexOf('<nav'), t.indexOf('</nav>')).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim().slice(0,150)));
      console.log('    has场景引入=' + t.includes('场景引入'), 'has推荐任务=' + t.includes('推荐任务'), 'hasLiveDemo=' + t.includes('Live Demo'), 'hasSOLUTIONS=' + t.includes('var SOLUTIONS'), 'hasZip=' + t.includes('.zip'));
    }
  }
})();
