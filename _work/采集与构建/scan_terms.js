const fs=require('fs'), path=require('path');
const TOP='D:/WorkbuddyUseCase';
const LIB=path.join(TOP,'WorkBuddy解决方案库');
const dirs=fs.readdirSync(LIB).filter(d=>/^\d{3}_/.test(d)).sort();

const terms = {
  mcp: /MCP|Model Context Protocol|模型上下文协议/gi,
  mcpCfg: /mcp\.json|mcpServers|mcp server|MCP 服务器|MCP服务/gi,
  api: /\bAPI\b|接口对接|调用接口|REST|GraphQL/gi,
  code: /python|javascript|\b代码\b|脚本|script|函数|def |function\s*\(|import |HTML 代码|SQL/gi,
  erp: /\bERP\b|\bSAP\b|金蝶|用友|鼎捷|浪潮|Oracle EBS/gi,
  mes: /\bMES\b|制造执行系统/gi,
  crm: /\bCRM\b|销售易|纷享销客|Salesforce/gi,
  oa: /\bOA\b|致远|泛微|钉钉|企业微信|飞书|协同办公/gi,
  wms: /\bWMS\b|仓储管理系统/gi,
  srm: /\bSRM\b|供应商关系/gi,
  plm: /\bPLM\b|\bPDM\b/gi,
  bi: /\bBI\b|Power ?BI|Tableau|帆软|FineReport|数据仓库|数据中台/gi,
  db: /数据库|SQL|MySQL|SQLServer|Oracle 数据库|数据表|字段/gi,
  rpa: /\bRPA\b|机器人流程自动化/gi,
  agent: /Agent|智能体/gi,
  workflow: /workflow|工作流|流程引擎|编排|pipeline/gi,
  skill: /技能包|技能包（Skill）|Skill/gi,
  deepLink: /嵌入|集成到|对接系统|打通|互联|双向同步|回写/gi,
};

const hit = {}; for(const k of Object.keys(terms)) hit[k]={pages:0, total:0, samples:[]};
const row = [];
for(const d of dirs){
  const p=path.join(LIB,d);
  const files=fs.readdirSync(p).filter(f=>/\.(html|md)$/i.test(f));
  let text='';
  for(const f of files) text += fs.readFileSync(path.join(p,f),'utf8');
  // 去标签
  text = text.replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<script[\s\S]*?<\/script>/gi,' ');
  text = text.replace(/<[^>]*>/g,' ');
  const rec={d};
  for(const [k,re] of Object.entries(terms)){
    re.lastIndex=0;
    const m=text.match(re);
    if(m && m.length){ hit[k].pages++; hit[k].total+=m.length;
      if(hit[k].samples.length<6) hit[k].samples.push(d+' ×'+m.length+' → '+m.slice(0,3).join(' / '));
    }
    rec[k]=m?m.length:0;
  }
  row.push(rec);
}
console.log('=== 693 个方案的全文关键词命中（页数 / 总次数）===');
for(const [k,v] of Object.entries(hit)) console.log('  '+k.padEnd(11)+' 页数 '+String(v.pages).padStart(4)+'  次数 '+String(v.total).padStart(6));
console.log('');
console.log('=== 重点核实：MCP ===');
console.log('  MCP 命中样本:'); hit.mcp.samples.forEach(s=>console.log('    '+s));
console.log('  mcp 配置类命中样本:'); hit.mcpCfg.samples.forEach(s=>console.log('    '+s));
console.log('');
console.log('=== 重点核实：企业系统 ===');
for(const k of ['erp','mes','oa','crm','wms','srm','plm','bi','db','deepLink']) {
  console.log('  '+k+' 页数 '+hit[k].pages+' → '+hit[k].samples.slice(0,3).join(' | '));
}
fs.writeFileSync(path.join(TOP,'_work','采集与构建','tech_terms.json'), JSON.stringify({hit,row},null,1));
