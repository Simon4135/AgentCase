
const fs=require("fs");
const C=require("D:/WorkbuddyUseCase/_tools/wb_core.js");
(async()=>{
  const g=await C.getText("https://workbuddy-space-static.codebuddy.work/page/XDAj9uPGyFKYk1zicA86ni/29/deep-dives/rfq-quote.html");
  const h=g.text;
  const all=[...h.matchAll(/(href|src)="([^"]*)"/g)].map(m=>m[2]);
  const abs=all.filter(v=>/^https?:|^\//.test(v));
  console.log("total refs",all.length,"| abs/root refs",abs.length);
  console.log(JSON.stringify([...new Set(abs)],null,1).slice(0,900));
  // external domains
  const doms={}; for(const a of abs){ try{ const u=new URL(a,"https://x.dev"); doms[u.host]=(doms[u.host]||0)+1; }catch(e){} }
  console.log("domains:",JSON.stringify(doms));
})();
