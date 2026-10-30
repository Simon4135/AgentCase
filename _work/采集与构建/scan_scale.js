const fs=require('fs'), path=require('path');
const TOP='D:/WorkbuddyUseCase';
const LIB=path.join(TOP,'WorkBuddy解决方案库');
const dirs=fs.readdirSync(LIB).filter(d=>/^\d{3}_/.test(d)).sort();
const strip = s => s.replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<script[\s\S]*?<\/script>/gi,' ')
  .replace(/<!--[\s\S]*?-->/g,' ').replace(/<\/?[a-zA-Z][^>]*>/g,' ').replace(/\s+/g,' ');

// (a) 「python/脚本」出现在什么上下文？是否只是 install 引导
let ctxSamples=[], onlyInstall=0;
for(const d of dirs.slice(0,40)){
  const html=strip(fs.readFileSync(path.join(LIB,d,'场景引入.html'),'utf8'));
  const idx=html.indexOf('脚本');
  if(idx<0) continue;
  const seg=html.slice(Math.max(0,idx-90), idx+110);
  if(/install_skill|技能装到本机|把技能装到/.test(seg)) onlyInstall++;
  if(ctxSamples.length<4) ctxSamples.push(d.slice(0,4)+' ‖ '+seg);
}
console.log('=== 「脚本/python」上下文（场景引入页样本）===');
console.log('  前 40 页中含「脚本」的上下文落在 install_skill 引导语里的: '+onlyInstall);
ctxSamples.forEach(s=>console.log('   '+s));

// (b) 推荐任务总数 / 提示词总量
let taskTotal=0, promptChars=0, skillMdBytes=[];
for(const d of dirs){
  const p=path.join(LIB,d);
  const f=path.join(p,'推荐任务.html');
  if(fs.existsSync(f)){
    const h=fs.readFileSync(f,'utf8');
    const arts=[...h.matchAll(/<article class="task">/g)].length;
    taskTotal+=arts;
    const ps=[...h.matchAll(/<p class="tp">([\s\S]*?)<\/p>/g)];
    for(const m of ps) promptChars+=strip(m[1]).length;
  }
}
console.log('');
console.log('=== 提示词规模 ===');
console.log('  推荐任务总数（A/B 类方案）: '+taskTotal);
console.log('  推荐任务提示词正文累计字符: '+promptChars.toLocaleString());

// (c) md 里的提示词总字符
let mdChars=0;
for(const d of dirs){ const f=path.join(LIB,d,'提示词与说明.md'); if(fs.existsSync(f)) mdChars+=fs.statSync(f).size; }
console.log('  693 个「提示词与说明.md」合计: '+(mdChars/1048576).toFixed(1)+' MB');

// (d) 技能包：同一个 SKILL.md 结构
const zf=[];
for(const d of dirs){ const p=path.join(LIB,d); for(const f of fs.readdirSync(p)) if(/\.zip$/.test(f)) zf.push({d,f}); }
console.log('');
console.log('=== 技能包数量 ===');
console.log('  zip 文件数: '+zf.length);
const skillNames={};
for(const d of dirs){ const p=path.join(LIB,d); for(const f of fs.readdirSync(p)) if(/^技能包_/.test(f)) skillNames[f]=1; }
console.log('  不同技能包文件名: '+Object.keys(skillNames).length);
