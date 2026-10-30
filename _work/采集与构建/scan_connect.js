const fs=require('fs'), path=require('path');
const TOP='D:/WorkbuddyUseCase';
const LIB=path.join(TOP,'WorkBuddy解决方案库');
const dirs=fs.readdirSync(LIB).filter(d=>/^\d{3}_/.test(d)).sort();
const strip = s => s.replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<script[\s\S]*?<\/script>/gi,' ')
  .replace(/<!--[\s\S]*?-->/g,' ').replace(/<\/?[a-zA-Z][^>]*>/g,' ')
  .replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"');

// 只扫「提示词与说明.md」（用户实际要执行的指令）
let connectSamples=[], loginSamples=[], exportSamples=[];
let cPages=0,lPages=0,ePages=0;
for(const d of dirs){
  const p=path.join(LIB,d,'提示词与说明.md');
  if(!fs.existsSync(p)) continue;
  let md=fs.readFileSync(p,'utf8');
  const hasC=/对接|集成|打通|接口|直连|回写|写回|同步到/.test(md);
  const hasL=/登录|账号密码|凭据|Token|密钥|凭证/.test(md);
  const hasE=/导出|下载.{0,6}报表|系统导出|从.{0,8}(?:系统|ERP|MES|CRM|OA|WMS).{0,6}(?:导出|拉取)/.test(md);
  if(hasC){ cPages++; if(connectSamples.length<26){ const m=md.match(/[^\n]{0,110}(?:对接|集成|打通|接口|直连|回写|写回)[^\n]{0,110}/); if(m) connectSamples.push('['+d.slice(0,4)+'] '+m[0].replace(/\s+/g,' ').trim()); } }
  if(hasL){ lPages++; if(loginSamples.length<12){ const m=md.match(/[^\n]{0,90}(?:登录|账号密码|凭据|Token|密钥)[^\n]{0,90}/); if(m) loginSamples.push('['+d.slice(0,4)+'] '+m[0].replace(/\s+/g,' ').trim()); } }
  if(hasE){ ePages++; if(exportSamples.length<14){ const m=md.match(/[^\n]{0,100}(?:导出|系统导出)[^\n]{0,100}/); if(m) exportSamples.push('['+d.slice(0,4)+'] '+m[0].replace(/\s+/g,' ').trim()); } }
}
console.log('提示词与说明.md 中出现「对接/集成/打通/接口/回写」: '+cPages+' 页');
console.log('--- 样本（看是「要求对接」还是「提及系统」）---');
connectSamples.forEach(s=>console.log('  '+s));
console.log('');
console.log('出现「登录/账号密码/凭据/Token/密钥」: '+lPages+' 页');
loginSamples.forEach(s=>console.log('  '+s));
console.log('');
console.log('出现「导出/系统导出」: '+ePages+' 页');
exportSamples.forEach(s=>console.log('  '+s));
