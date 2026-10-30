const fs=require('fs'), path=require('path');
const TOP='D:/WorkbuddyUseCase';
const LIB=path.join(TOP,'WorkBuddy解决方案库');
const dirs=fs.readdirSync(LIB).filter(d=>/^\d{3}_/.test(d)).sort();
const strip = s => s.replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<script[\s\S]*?<\/script>/gi,' ')
  .replace(/<!--[\s\S]*?-->/g,' ').replace(/<\/?[a-zA-Z][^>]*>/g,' ')
  .replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"');

// 关系统名 + 连接动作，做否定/肯定分类
const SYS = /(?:ERP|MES|CRM|OA|WMS|SRM|PLM|PDM|SAP|金蝶|用友|钉钉|企业微信|飞书|泛软|帆软|Power ?BI|数据库|数据中台|业务系统|信息化系统)/;
const CONN = /(?:接入|对接|打通|集成|连接|直连|打通|连通|同步|回写|写回|嵌入|插件|API|接口)/;
const NEG = /(?:不(?:需|用|要)(?:要)?|无需|毋需|免|不必|没有|未(?:接入|打通|对接)|不依赖|脱离|零(?:接入|对接)|不需要)/;

const cls = { pos:{pages:0, samples:[]}, neg:{pages:0, samples:[]}, neutral:{pages:0} };
const sentHit = {};
function sentences(t){ return t.split(/(?<=[。！？；\n])/).map(s=>s.trim()).filter(s=>s.length>6 && s.length<400); }

const stats={
  mcpPages:[], disclaim:{pages:0,ex:[]}, humanLoop:{pages:0,ex:[]},
  embed:{pages:0,ex:[]}, e2e:{pages:0,ex:[]}, crossRef:{pages:0,ex:[]},
  codeRun:{pages:0,ex:[]}, sql:{pages:0,ex:[]}, apiCall:{pages:0,ex:[]},
};
const pagesWithSysConn = new Set();
const rowData={};
for(const d of dirs){
  const p=path.join(LIB,d); let raw='';
  for(const f of fs.readdirSync(p)) if(/\.(html|md)$/i.test(f)) raw += fs.readFileSync(path.join(p,f),'utf8');
  const t = strip(raw);
  const rec={pos:0,neg:0};
  for(const s of sentences(t)){
    if(SYS.test(s) && CONN.test(s)){
      if(NEG.test(s)){ rec.neg++; if(cls.neg.samples.length<40) cls.neg.samples.push(d+' ‖ '+s.slice(0,150)); }
      else { rec.pos++; if(cls.pos.samples.length<40) cls.pos.samples.push(d+' ‖ '+s.slice(0,150)); }
      pagesWithSysConn.add(d);
    }
  }
  if(rec.pos) cls.pos.pages++;
  if(rec.neg) cls.neg.pages++;
  rowData[d]=rec;

  if(/MCP/.test(t)) stats.mcpPages.push(d);
  if(/不宣称已接入客户生产系统|演示模式|脱敏构造数据/.test(t)){ stats.disclaim.pages++; if(stats.disclaim.ex.length<4) stats.disclaim.ex.push(d); }
  if(/人工审批|人工确认|人工复核|需人工|由人确认|人工把关/.test(t)){ stats.humanLoop.pages++; if(stats.humanLoop.ex.length<4) stats.humanLoop.ex.push(d); }
  if(/嵌入(?:到|进)?(?:现有|已有|企业)?(?:系统|OA|ERP|门户)|侧边栏|插件形式|在系统内|系统内嵌/.test(t)){ stats.embed.pages++; if(stats.embed.ex.length<4) stats.embed.ex.push(d); }
  if(/端到端|全链路|全流程打通|一条链|端到端流程/.test(t)){ stats.e2e.pages++; if(stats.e2e.ex.length<4) stats.e2e.ex.push(d); }
  if(/SELECT\s|INSERT\s+INTO|jdbc|数据库连接|连接数据库|SQL 查询/.test(t)){ stats.sql.pages++; if(stats.sql.ex.length<3) stats.sql.ex.push(d); }
  if(/requests\.(?:get|post)|httpx|fetch\(|axios|调用接口|API 调用/.test(t)){ stats.apiCall.pages++; if(stats.apiCall.ex.length<3) stats.apiCall.ex.push(d); }
}
console.log('=== 系统+连接动作 的句子分类 ===');
console.log('  肯定式（要求接入/对接/打通）: 页数 '+cls.pos.pages);
console.log('  否定式（无需/不用接入）    : 页数 '+cls.neg.pages);
console.log('  有一定式命中的方案页总数   : '+pagesWithSysConn.size);
console.log('');
console.log('--- 肯定式样本（前 12）---');
cls.pos.samples.slice(0,12).forEach(s=>console.log('   '+s));
console.log('');
console.log('--- 否定式样本（前 14）---');
cls.neg.samples.slice(0,14).forEach(s=>console.log('   '+s));
console.log('');
console.log('=== 其他指标 ===');
console.log('  MCP 页 ('+stats.mcpPages.length+'): '+stats.mcpPages.join(', '));
console.log('  演示免责（演示模式/脱敏构造数据/不宣称已接入生产系统）: '+stats.disclaim.pages+' 页  '+stats.disclaim.ex.join(', '));
console.log('  人工在环（人工审批/确认/复核）: '+stats.humanLoop.pages);
console.log('  嵌入现有系统: '+stats.embed.pages+'  '+stats.embed.ex.join(', '));
console.log('  端到端/全链路 表述: '+stats.e2e.pages+'  '+stats.e2e.ex.join(', '));
console.log('  SQL/数据库连接: '+stats.sql.pages+'  '+stats.sql.ex.join(', '));
console.log('  代码调接口(requests/fetch/axios): '+stats.apiCall.pages+'  '+stats.apiCall.ex.join(', '));
fs.writeFileSync(path.join(TOP,'_work','采集与构建','tech_class.json'), JSON.stringify({cls,stats:{mcp:stats.mcpPages,disclaim:stats.disclaim,pagesWithSysConn:pagesWithSysConn.size,humanLoop:stats.humanLoop.pages,embed:stats.embed.pages,e2e:stats.e2e.pages,sql:stats.sql.pages,apiCall:stats.apiCall.pages},rowData},null,1));
