const fs=require('fs'), path=require('path');
const TOP='D:/WorkbuddyUseCase';
const LIB=path.join(TOP,'WorkBuddy解决方案库');
const dirs=fs.readdirSync(LIB).filter(d=>/^\d{3}_/.test(d)).sort();

function zipList(buf){
  let e=-1; for(let i=buf.length-22;i>=0 && i>buf.length-66000;i--){ if(buf.readUInt32LE(i)===0x06054b50){ e=i; break; } }
  if(e<0) return null;
  const n=buf.readUInt16LE(e+10), cdOff=buf.readUInt32LE(e+16); const out=[]; let p=cdOff;
  for(let i=0;i<n;i++){ if(buf.readUInt32LE(p)!==0x02014b50) break;
    const nl=buf.readUInt16LE(p+28), el=buf.readUInt16LE(p+30), cl=buf.readUInt16LE(p+32);
    out.push(buf.slice(p+46,p+46+nl).toString('utf8')); p+=46+nl+el+cl; }
  return out;
}
// 输入参考文件的真实类型分布
const inExt={}, perPkg={};
for(const d of dirs){
  const p=path.join(LIB,d); const zf=fs.readdirSync(p).filter(f=>/\.zip$/.test(f));
  if(!zf.length) continue;
  const list=zipList(fs.readFileSync(path.join(p,zf[0]))); if(!list) continue;
  const ins=list.filter(n=>/输入参考文件\//.test(n) && !n.endsWith('/'));
  const exts=ins.map(n=>(n.match(/\.([A-Za-z0-9]+)$/)||[,'?'])[1].toLowerCase());
  perPkg[d]=exts;
  for(const e of exts) inExt[e]=(inExt[e]||0)+1;
}
console.log('=== 286 个技能包里「输入参考文件/」的真实文件类型 ===');
Object.entries(inExt).sort((a,b)=>b[1]-a[1]).forEach(([k,v])=>console.log('   .'+k.padEnd(6)+v));
// 每包输入文件数
const cnt=Object.values(perPkg).map(v=>v.length);
console.log('   每包输入文件数: min='+Math.min(...cnt)+' 中位='+cnt.sort((a,b)=>a-b)[Math.floor(cnt.length/2)]+' max='+Math.max(...cnt));
const sig=Object.entries(perPkg).map(([d,v])=>d.slice(0,4)+':'+[...new Set(v)].sort().join('+')).slice(0,8);
console.log('   形态样本: '+sig.join('  '));
// 纯 xlsx 包占比
const pureXlsx=Object.values(perPkg).filter(v=>v.every(e=>e==='xlsx')).length;
console.log('   输入全部为 .xlsx 的包: '+pureXlsx+' / '+Object.keys(perPkg).length);
// 引用/参考文档类型
const refExt={};
for(const d of dirs){
  const p=path.join(LIB,d); const zf=fs.readdirSync(p).filter(f=>/\.zip$/.test(f));
  if(!zf.length) continue;
  const list=zipList(fs.readFileSync(path.join(p,zf[0]))); if(!list) continue;
  for(const n of list.filter(n=>/^references\//.test(n) && !n.endsWith('/'))){ const e=(n.match(/\.([A-Za-z0-9]+)$/)||[,'?'])[1].toLowerCase(); refExt[e]=(refExt[e]||0)+1; }
}
console.log('');
console.log('=== references/ 目录（技能规格正文）文件类型 ===');
Object.entries(refExt).sort((a,b)=>b[1]-a[1]).forEach(([k,v])=>console.log('   .'+k.padEnd(6)+v));
fs.writeFileSync(path.join(TOP,'_work','采集与构建','tech_zip_types.json'), JSON.stringify({inExt, refExt, pureXlsx, total:Object.keys(perPkg).length},null,1));
