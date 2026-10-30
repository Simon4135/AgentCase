const fs=require("fs"),path=require("path");
const ROOT="D:/WorkbuddyUseCase/WorkBuddy解决方案库";
const rows=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/last_run.json","utf8")).rows;
const plain=h=>h.replace(/<[\s\S]*?>/g," ").replace(/<!--[\s\S]*?-->/g," ").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/\s+/g," ").trim();
function sect(h,cls){
  const i=h.search(new RegExp('class="[^"]*\\b'+cls+'\\b'));
  if(i<0)return "";
  const j=h.indexOf("</section>",i);
  return plain(h.slice(i, j<0?h.length:j));
}
const TIME=/([\d][\d,\.]*(?:\s*[-~到]\s*[\d\.]+)?)\s*(小时|分钟|天|周|个?工作日|秒|倍|月)/g;
let both=0,one=0,none=0,samples=[];
for(const r of rows){
  const p=path.join(ROOT,r.dir,"场景引入.html");
  if(!fs.existsSync(p))continue;
  const h=fs.readFileSync(p,"utf8");
  const oldT=sect(h,"old"), newT=sect(h,"new");
  const o=(oldT.match(TIME)||[]).slice(0,2), n=(newT.match(TIME)||[]).slice(0,2);
  if(o.length&&n.length){both++; if(samples.length<10)samples.push([r.dir,o.join("+"),n.join("+")]);} else if(o.length||n.length)one++; else none++;
}
console.log("both:"+both,"one:"+one,"none:"+none);
samples.forEach(s=>console.log("  ["+s[0]+"] old="+s[1]+"  ->  new="+s[2]));
