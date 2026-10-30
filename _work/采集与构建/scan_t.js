const fs=require('fs'), path=require('path');
const LIB='D:/WorkbuddyUseCase/WorkBuddy解决方案库';
const dirs=fs.readdirSync(LIB).filter(d=>/^\d{3}_/.test(d)).sort();
const strip = s => s.replace(/<!--[\s\S]*?-->/g,' ').replace(/<\/?[a-zA-Z][^>]*>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/\s+/g,' ').trim();
const h=fs.readFileSync(path.join(LIB,'001_图纸询价智能报价','推荐任务.html'),'utf8');
console.log('len', h.length);
const cls=[...new Set((h.match(/class="[^"]*"/g)||[]))];
console.log('classes:', JSON.stringify(cls.slice(0,30)));
// 任务块
const arts=[...h.matchAll(/<article\b[^>]*>/g)];
console.log('articles:', arts.length, arts.slice(0,3).map(m=>m[0]));
const tps=[...h.matchAll(/<p class="tp">([\s\S]*?)<\/p>/g)];
console.log('tp blocks:', tps.length, tps.length?strip(tps[0][1]).slice(0,80):'');
const sk=[...h.matchAll(/id="wbSkillPrompt"[^>]*>([\s\S]*?)<\/div>/g)];
console.log('wbSkillPrompt:', sk.length, sk.length?strip(sk[0][1]).slice(0,80):'');
