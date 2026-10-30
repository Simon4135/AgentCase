const fs=require('fs'), path=require('path'), zlib=require('zlib');
const TOP='D:/WorkbuddyUseCase';
const LIB=path.join(TOP,'WorkBuddy解决方案库');
const dirs=fs.readdirSync(LIB).filter(d=>/^\d{3}_/.test(d)).sort();

// —— 极简 zip 目录读取（只读 central directory，不解压）——
function zipList(buf){
  // 找 EOCD
  let e=-1;
  for(let i=buf.length-22;i>=0 && i>buf.length-66000;i--){ if(buf.readUInt32LE(i)===0x06054b50){ e=i; break; } }
  if(e<0) return null;
  const n=buf.readUInt16LE(e+10), cdOff=buf.readUInt32LE(e+16);
  const out=[]; let p=cdOff;
  for(let i=0;i<n;i++){
    if(buf.readUInt32LE(p)!==0x02014b50) break;
    const nameLen=buf.readUInt16LE(p+28), extraLen=buf.readUInt16LE(p+30), cmtLen=buf.readUInt16LE(p+32);
    const csize=buf.readUInt32LE(p+20), usize=buf.readUInt32LE(p+24);
    const name=buf.slice(p+46,p+46+nameLen).toString('utf8');
    out.push({name,csize,usize});
    p+=46+nameLen+extraLen+cmtLen;
  }
  return out;
}

const stats={zips:0, entries:0, ext:{}, hasCode:0, hasSkillMd:0, skillMdLens:[], sampleEntries:[]};
const perZip=[];
for(const d of dirs){
  const p=path.join(LIB,d);
  const zf=fs.readdirSync(p).filter(f=>/\.zip$/.test(f));
  if(!zf.length) continue;
  const buf=fs.readFileSync(path.join(p,zf[0]));
  const list=zipList(buf);
  if(!list){ console.log('BADZIP '+d); continue; }
  stats.zips++;
  let code=0, sk=0;
  for(const en of list){
    if(en.name.endsWith('/')) continue;
    stats.entries++;
    const ext=(en.name.match(/\.([A-Za-z0-9]+)$/)||[,'(none)'])[1].toLowerCase();
    stats.ext[ext]=(stats.ext[ext]||0)+1;
    if(['js','ts','py','mjs','cjs','sh','ps1','java','go','rb','php','sql','json','yaml','yml','toml'].includes(ext)) code++;
    if(/SKILL\.md$/i.test(en.name)){ sk++; stats.skillMdLens.push(en.usize); }
  }
  if(code) stats.hasCode++;
  if(sk) stats.hasSkillMd++;
  perZip.push({d, n:list.length, code, sk});
  if(stats.sampleEntries.length<3) stats.sampleEntries.push(d+' → '+list.map(x=>x.name).slice(0,12).join(', '));
}
console.log('技能包 zip 数 =', stats.zips, '| 条目总数 =', stats.entries);
console.log('含 SKILL.md 的包 =', stats.hasSkillMd, '| 含代码类文件的包 =', stats.hasCode);
console.log('SKILL.md 平均字节 =', Math.round(stats.skillMdLens.reduce((a,b)=>a+b,0)/stats.skillMdLens.length));
console.log('');
console.log('扩展名分布（top 20）:');
Object.entries(stats.ext).sort((a,b)=>b[1]-a[1]).slice(0,20).forEach(([k,v])=>console.log('   '+k.padEnd(12)+v));
console.log('');
console.log('样本条目:');
stats.sampleEntries.forEach(s=>console.log('   '+s));
fs.writeFileSync(path.join(TOP,'_work','采集与构建','zip_scan.json'), JSON.stringify({stats:{zips:stats.zips,entries:stats.entries,ext:stats.ext,hasCode:stats.hasCode,hasSkillMd:stats.hasSkillMd,skillMdAvg:Math.round(stats.skillMdLens.reduce((a,b)=>a+b,0)/stats.skillMdLens.length)},perZip},null,1));
console.log('');
console.log('条目数分布: min='+Math.min(...perZip.map(x=>x.n))+' max='+Math.max(...perZip.map(x=>x.n)));
console.log('code>0 的包数 =', perZip.filter(x=>x.code>0).length, '| code=0 的包数 =', perZip.filter(x=>x.code===0).length);
