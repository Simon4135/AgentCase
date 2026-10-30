
const fs=require('fs');
(async()=>{
  const u='https://workbuddy-space-static.codebuddy.work/page/XDAj9uPGyFKYk1zicA86ni/29/deep-dives/rfq-quote.html';
  const r=await fetch(u); const t=await r.text();
  fs.writeFileSync('D:\\\\WorkbuddyUseCase\\\\_probe\\\\rfq-quote.html',t);
  console.log('status',r.status,'len',t.length);
  const links=[...new Set([...t.matchAll(/(?:href|src)="([^"]+)"/g)].map(m=>m[1]))];
  console.log('links:',links.length); links.forEach(l=>console.log('  ',l));
  for(const kw of ['推荐任务','Live Demo','场景引入','install_skill','prompt-text','tab-']){
    const c=(t.match(new RegExp(kw,'g'))||[]).length; console.log('['+kw+'] x'+c);
  }
  const m=/<title[^>]*>([^<]*)<\\/title>/.exec(t); console.log('title:',m&&m[1]);
})();
