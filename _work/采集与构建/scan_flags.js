const fs=require('fs'), path=require('path');
const TOP='D:/WorkbuddyUseCase';
const LIB=path.join(TOP,'WorkBuddy解决方案库');
const dirs=fs.readdirSync(LIB).filter(d=>/^\d{3}_/.test(d)).sort();
const strip = s => s.replace(/<style[\s\S]*?<\/style>/gi,' ').replace(/<script[\s\S]*?<\/script>/gi,' ')
  .replace(/<!--[\s\S]*?-->/g,' ').replace(/<\/?[a-zA-Z][^>]*>/g,' ')
  .replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/\s+/g,' ');

function zipList(buf){
  let e=-1; for(let i=buf.length-22;i>=0 && i>buf.length-66000;i--){ if(buf.readUInt32LE(i)===0x06054b50){ e=i; break; } }
  if(e<0) return null;
  const n=buf.readUInt16LE(e+10), cdOff=buf.readUInt32LE(e+16); const out=[]; let p=cdOff;
  for(let i=0;i<n;i++){ if(buf.readUInt32LE(p)!==0x02014b50) break;
    const nl=buf.readUInt16LE(p+28), el=buf.readUInt16LE(p+30), cl=buf.readUInt16LE(p+32);
    out.push(buf.slice(p+46,p+46+nl).toString('utf8')); p+=46+nl+el+cl; }
  return out;
}

const O={};
const agg={mcp:0, expo:0, up:0, txt:0, human:0, chain:0, sys:0, disc:0, deploy:0};
for(const d of dirs){
  const p=path.join(LIB,d);
  let html='';
  const htmlFiles=fs.readdirSync(p).filter(f=>/\.html$/i.test(f));
  for(const f of htmlFiles) html += fs.readFileSync(path.join(p,f),'utf8');
  const t=strip(html);
  const mdF=path.join(p,'提示词与说明.md');
  const md=fs.existsSync(mdF)?fs.readFileSync(mdF,'utf8'):'';
  const mdS=strip(md);

  const o={};
  o.mcp = /MCP/.test(t) || /MCP/.test(mdS) ? 1 : 0;
  o.expo = /导出|导出来|导出的/.test(mdS) ? 1 : 0;
  o.up = /上传|拖入|附件|一起拖进|我一起放进|材料都放|扔进来/.test(mdS) ? 1 : 0;
  o.txt = /粘贴|直接说|一句话|说几句|口头|口述|自然语言|用聊天/.test(mdS) ? 1 : 0;
  o.human = /人工审批|人工确认|人工复核|需人工|由人确认|人工把关|人工判断|人工选版|由人拍板/.test(mdS) ? 1 : 0;
  o.disc = (/不宣称已接入客户生产系统/.test(t) ? 1 : 0) || (/脱敏构造数据|演示模式/.test(t) ? 1 : 0);
  const lm=[...t.matchAll(/衔接\s*([^，。；、\n]{2,40})/g)].map(m=>m[1].trim());
  o.chain = lm.length;
  o.chainTxt = lm.slice(0,3).join(' / ').slice(0,90);
  const SYSK=[['ERP',/\bERP\b/],['POS',/\bPOS\b/],['CRM',/\bCRM\b/],['BI',/\bBI\b/],['OA',/\bOA\b/],['MES',/\bMES\b/],['WMS',/\bWMS\b/],['PLM',/\bPLM\b/],['SRM',/\bSRM\b/]];
  o.sysHit = SYSK.filter(s=>s[1].test(t)).map(s=>s[0]);
  o.sys = o.sysHit.length ? 1 : 0;

  const zf=fs.readdirSync(p).filter(f=>/\.zip$/.test(f));
  if(zf.length){
    const list=zipList(fs.readFileSync(path.join(p,zf[0]))) || [];
    const ins=list.filter(n=>/输入参考文件\//.test(n) && !n.endsWith('/'));
    const exts=[...new Set(ins.map(n=>(n.match(/\.([A-Za-z0-9]+)$/)||[,'?'])[1].toLowerCase()))].sort();
    o.zin = exts.join('+');
    o.zmd = list.filter(n=>/^references\//.test(n) && /\.md$/i.test(n)).length;
  } else { o.zin=''; o.zmd=0; }

  O[d]=o;
  for(const k of ['mcp','expo','up','txt','human','chain','sys','disc']) if(o[k]) agg[k]++;
}
console.log('=== 全库聚合（'+dirs.length+'）===');
for(const k in agg) console.log('  '+k+': '+agg[k]);
// 系统命中分布
const c={};for(const k in O)for(const s of O[k].sysHit)c[s]=(c[s]||0)+1;
console.log('sysHit:', JSON.stringify(c));
fs.writeFileSync(path.join(TOP,'_work','采集与构建','tech_flags.json'), JSON.stringify(O), 'utf8');
console.log('written tech_flags.json', Object.keys(O).length);
