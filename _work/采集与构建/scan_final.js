const fs=require('fs'), path=require('path');
const TOP='D:/WorkbuddyUseCase';
const LIB=path.join(TOP,'WorkBuddy解决方案库');
const dirs=fs.readdirSync(LIB).filter(d=>/^\d{3}_/.test(d)).sort();
const strip = s => s.replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<script[\s\S]*?<\/script>/gi,' ')
  .replace(/<!--[\s\S]*?-->/g,' ').replace(/<\/?[a-zA-Z][^>]*>/g,' ')
  .replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/\s+/g,' ');
const titles=dirs.map(d=>d.slice(4));

const R={};
// (a) 免责声明精确覆盖
R.disclaimFull=[]; R.disclaimAny=[];
// (b) 交叉衔接
R.crossLink={pages:0, ex:[]}; R.crossLinkTargets={};
// (c) 端到端
R.e2ePages=[];
// (d) 输入模态
R.inputUpload=0; R.inputPasteText=0; R.inputSystemExport=0;
// (e) 输出模态
R.outputFile=0; R.outputChatOnly=0;
// (f) 单点 vs 链路
R.multiStep=[]; R.stepCounts={};
// (g) 前置依赖（要装技能）
R.needInstall=0;

for(const d of dirs){
  const p=path.join(LIB,d);
  let html='';
  for(const f of fs.readdirSync(p)) if(/\.html$/i.test(f)) html += fs.readFileSync(path.join(p,f),'utf8');
  const t=strip(html);
  const mdPath=path.join(p,'提示词与说明.md');
  const md=fs.existsSync(mdPath)?fs.readFileSync(mdPath,'utf8'):'';
  const mdS=strip(md);

  if(/不宣称已接入客户生产系统|脱敏构造数据|演示模式/.test(t)) R.disclaimAny.push(d);
  if(/不宣称已接入客户生产系统/.test(t)) R.disclaimFull.push(d);

  // 交叉衔接：形如「衔接 培训需求分析/课件/SOP 生成」或「衔接<某方案名>」
  const lm=[...t.matchAll(/衔接\s*([^，。；、\n]{2,40})/g)].map(m=>m[1].trim());
  if(lm.length){ R.crossLink.pages++; if(R.crossLink.ex.length<10) R.crossLink.ex.push(d+' → '+lm.slice(0,3).join(' / '));
    for(const x of lm) { for(const tk of titles){ if(tk.length>=4 && x.indexOf(tk)>=0) R.crossLinkTargets[tk]=(R.crossLinkTargets[tk]||0)+1; } } }

  if(/端到端|全链路/.test(t)) R.e2ePages.push(d);

  // 输入：上传文件
  if(/上传|拖入|附件|把文件|一起放进|材料都放|放一起了|我发你|如下文件|以下几个文件/.test(mdS)) R.inputUpload++;
  if(/粘贴|直接说|一句话|聊一句|说几句|自然语言|口述|语音/.test(mdS)) R.inputPasteText++;
  if(/导出|导出来|系统导出|导出的/.test(mdS)) R.inputSystemExport++;

  // 输出
  if(/\.(?:xlsx|docx|pptx|pdf|csv|md|html)\b|Excel|Word|PPT|PDF|看板|仪表/.test(mdS)) R.outputFile++;
  else R.outputChatOnly++;

  // 步骤数（Live Demo 的环数）
  const sn=[...t.matchAll(/(\d+)\s*Step\s/gi)].map(m=>+m[1]);
  const mx=sn.length?Math.max(...sn):0;
  if(mx) { R.stepCounts[mx]=(R.stepCounts[mx]||0)+1; if(mx>=6) R.multiStep.push(d+'(×'+mx+')'); }

  if(/install_skill\.py/.test(mdS)) R.needInstall++;
}
console.log('=== (a) 免责声明 ===');
console.log('  含「不宣称已接入客户生产系统」: '+R.disclaimFull.length+' / 693');
console.log('  含「演示模式|脱敏构造数据|不宣称…」任一: '+R.disclaimAny.length+' / 693');
console.log('');
console.log('=== (b) 方案间「衔接」交叉引用 ===');
console.log('  出现「衔接 X」的方案数: '+R.crossLink.pages);
R.crossLink.ex.forEach(s=>console.log('    '+s));
const tg=Object.entries(R.crossLinkTargets).sort((a,b)=>b[1]-a[1]).slice(0,10);
console.log('  被衔接最多的方案: '+tg.map(([k,v])=>k+'×'+v).join(' | '));
console.log('');
console.log('=== (c) 端到端/全链路 用词 ===');
console.log('  命中方案数: '+R.e2ePages.length+' → '+R.e2ePages.slice(0,12).map(x=>x.slice(0,4)).join(', '));
console.log('');
console.log('=== (d)(e) 输入/输出模态（依据 提示词与说明.md）===');
console.log('  要上传/拖入文件: '+R.inputUpload+' 页');
console.log('  可纯文本/口述输入: '+R.inputPasteText+' 页');
console.log('  提到「导出」: '+R.inputSystemExport+' 页');
console.log('  产出文件型: '+R.outputFile+' 页 | 纯对话型: '+R.outputChatOnly+' 页');
console.log('');
console.log('=== (f) 步骤数分布 ===');
console.log('  '+JSON.stringify(R.stepCounts));
console.log('  ≥6 步: '+R.multiStep.length+' → 样本 '+R.multiStep.slice(0,8).join(', '));
console.log('');
console.log('=== (g) 需先装技能包 ===');
console.log('  '+R.needInstall+' 页（提示词含 install_skill.py）');
fs.writeFileSync(path.join(TOP,'_work','采集与构建','tech_final.json'), JSON.stringify(R,null,1));
