const fs=require('fs'), path=require('path');
const LIB='D:/WorkbuddyUseCase/WorkBuddy解决方案库';
const dirs=fs.readdirSync(LIB).filter(d=>/^\d{3}_/.test(d)).sort();
const strip = s => s.replace(/<!--[\s\S]*?-->/g,' ').replace(/<\/?[a-zA-Z][^>]*>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/\s+/g,' ').trim();

const h=fs.readFileSync(path.join(LIB,'001_图纸询价智能报价','推荐任务.html'),'utf8');
const i=h.indexOf('class="task"');
console.log('--- 001 task block sample (raw) ---');
console.log(h.slice(i-40, i+700));

// 全量任务数 & 提示词字符
let tasks=0, chars=0, pages=0, demoPrompts=0, demoChars=0;
for(const d of dirs){
  const f=path.join(LIB,d,'推荐任务.html');
  if(fs.existsSync(f)){
    pages++;
    const s=fs.readFileSync(f,'utf8');
    const arts=[...s.matchAll(/<article\b[^>]*class="task"[^>]*>([\s\S]*?)<\/article>/g)];
    tasks+=arts.length;
    for(const m of arts){ const tp=m[1].match(/<p[^>]*class="tp"[^>]*>([\s\S]*?)<\/p>/); if(tp) chars+=strip(tp[1]).length; }
  }
}
console.log('');
console.log('=== 提示词规模 ===');
console.log('  含推荐任务页的方案: '+pages+' | 任务总条数: '+tasks);
console.log('  推荐任务提示词正文累计: '+chars.toLocaleString()+' 字符（约 '+(chars/10000).toFixed(1)+' 万字）');
console.log('  平均每条: '+(tasks?Math.round(chars/tasks):0)+' 字符');
