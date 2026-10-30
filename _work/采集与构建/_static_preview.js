const http=require('http'), fs=require('fs'), path=require('path'), url=require('url');
const ROOT='D:/WorkbuddyUseCase';
const MIME={'.html':'text/html; charset=utf-8','.md':'text/plain; charset=utf-8','.csv':'text/csv; charset=utf-8','.css':'text/css; charset=utf-8','.zip':'application/zip','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.js':'text/javascript'};
http.createServer((req,res)=>{
  let p=decodeURIComponent(url.parse(req.url).pathname);
  if(p==='/')p='/索引.html';
  const f=path.join(ROOT,p);
  if(!f.startsWith(path.resolve(ROOT))){res.writeHead(403);return res.end('no');}
  fs.readFile(f,(e,b)=>{ if(e){res.writeHead(404);return res.end('404');}
    res.writeHead(200,{'Content-Type':MIME[path.extname(f).toLowerCase()]||'application/octet-stream'});
    res.end(b); });
}).listen(18777,'127.0.0.1',()=>console.log('serving http://127.0.0.1:18777/'));
