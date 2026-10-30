const fs=require('fs'), path=require('path');
const TOP='D:/WorkbuddyUseCase';
const LIB=path.join(TOP,'WorkBuddy解决方案库');
const dirs=fs.readdirSync(LIB).filter(d=>/^\d{3}_/.test(d)).sort();
const strip = s => s.replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<script[\s\S]*?<\/script>/gi,' ')
  .replace(/<!--[\s\S]*?-->/g,' ').replace(/<\/?[a-zA-Z][^>]*>/g,' ')
  .replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/\s+/g,' ');

function grab(d){ // 返回该方案所有页面纯文本
  const p=path.join(LIB,d); let t='';
  for(const f of fs.readdirSync(p)) if(/\.(html|md)$/i.test(f)) t += strip(fs.readFileSync(path.join(p,f),'utf8')) + '\n';
  return t;
}
// 1) MCP 两例细看
for(const d of dirs.filter(x=>/^690_|^088_/.test(x))){
  const t=grab(d);
  console.log('===== '+d+' =====');
  const idxs=[]; let i=-1;
  while((i=t.indexOf('MCP', i+1))>=0 && idxs.length<8) idxs.push(i);
  idxs.forEach(i=>console.log('   …'+t.slice(Math.max(0,i-160), i+200).replace(/\s+/g,' ')+'…'));
  console.log('');
}
// 2) 输入/输出/连接动作词频（仅统计「提示词与说明.md」里的提示词段）
const verbs={
  upFile: /上传|传入|提供(?:以下|如下|这些)?文件|把(?:文件|附件)发|拖入|附件|我发(?:你|给)|已(?:经)?上传/gi,
  exportSys: /导出|下载(?:自|的)?报表|从.{0,8}(?:系统|ERP|MES|CRM|OA|WMS)里?(?:导出|拉|取)|系统导出/gi,
  manual: /手工|手动|人工|照(?:着)?(?:这个)?表|把.{0,6}数据.{0,4}给/gi,
  connect: /对接|集成|打通|接口|API|直连|双向|同步|回写到|写回|连接(?:器)?/gi,
  loginSys: /登录|账号密码|凭据|Token|密钥|凭证/gi,
  uploadPrompt: /请(?:把|将).{0,12}(?:上传|提供)/gi,
};
const agg={}; for(const k of Object.keys(verbs)) agg[k]={pages:0,total:0,ex:[]};
const perPage=[];
for(const d of dirs){
  const p=path.join(LIB,d); const mdPath=path.join(p,'提示词与说明.md');
  const md=fs.existsSync(mdPath)?fs.readFileSync(mdPath,'utf8'):'';
  const rec={d};
  for(const [k,re] of Object.entries(verbs)){
    re.lastIndex=0; const m=md.match(re);
    if(m&&m.length){ agg[k].pages++; agg[k].total+=m.length; if(agg[k].ex.length<5) agg[k].ex.push(d+' ×'+m.length+' '+m.slice(0,2).join('/')); }
    rec[k]=m?m.length:0;
  }
  perPage.push(rec);
}
console.log('=== 提示词与说明.md 全文动作词（693 份）===');
for(const [k,v] of Object.entries(agg)) console.log('  '+k.padEnd(13)+' 页数 '+String(v.pages).padStart(4)+'  次数 '+String(v.total).padStart(6)+'   '+v.ex.slice(0,3).join(' | '));
fs.writeFileSync(path.join(TOP,'_work','采集与构建','tech_verbs.json'), JSON.stringify({agg,perPage},null,1));
