const fs=require("fs"),path=require("path");
const OUT="D:/WorkbuddyUseCase/WorkBuddy解决方案库";
const h=fs.readFileSync(path.join(OUT,"106_组织诊断","LiveDemo.html"),"utf8");
for(const mm of h.matchAll(/<[^>]*class="[^"]*prompt[^"]*"[^>]*>/g)) console.log("TAG:",mm[0]);
const i=h.indexOf("AI 提示词卡片");
const seg=h.slice(i,i+2200);
console.log("--- raw seg head:",seg.slice(0,300).replace(/\s+/g," "));
const strip=s=>s.replace(/<button[\s\S]*?<\/button>/g,"").replace(/<[^>]+>/g," ").replace(/&nbsp;/g," ").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/\s+/g," ").trim();
console.log("--- TEXT:",strip(seg).slice(0,700));
