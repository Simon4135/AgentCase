const fs=require('fs');
const OUT='D:/WorkbuddyUseCase/WorkBuddy解决方案库';

// --- proper CSV parse (quote-aware) ---
function parseCSV(text){
  const rows=[]; let cur=[],f='',q=false;
  for(let i=0;i<text.length;i++){const c=text[i];
    if(q){ if(c==='"'){ if(text[i+1]==='"'){f+='"';i++;} else q=false; } else f+=c; }
    else if(c==='"') q=true;
    else if(c===','){ cur.push(f); f=''; }
    else if(c==='\n'){ cur.push(f); f=''; if(cur.length>1||cur[0]!=='') rows.push(cur); cur=[]; }
    else if(c!=='\r') f+=c;
  }
  if(f!==''||cur.length){ cur.push(f); rows.push(cur); }
  return rows;
}
const csv=fs.readFileSync(OUT+'/全量清单.csv','utf8').replace(/^\uFEFF/,'');
const rows=parseCSV(csv);
console.log('CSV rows:',rows.length,'| header cols:',rows[0].length);
const widths={}; rows.forEach((r,i)=>{widths[r.length]=(widths[r.length]||0)+1;});
console.log('column-count histogram:',JSON.stringify(widths));
const bad=rows.filter(r=>r.length!==rows[0].length);
console.log('malformed rows:',bad.length);
bad.slice(0,3).forEach(r=>console.log('   len',r.length,'->',JSON.stringify(r.slice(0,3))));
console.log('rows with ROI:',rows.slice(1).filter(r=>r[16]).length);
console.log('rows with value score:',rows.slice(1).filter(r=>r[13]).length);
console.log('rows with diff:',rows.slice(1).filter(r=>r[12]).length);

// --- README ---
const md=fs.readFileSync(OUT+'/README.md','utf8');
const L=md.split('\n');
console.log('\nREADME lines:',L.length,'bytes:',md.length);
const tbl=L.filter(l=>/^\| \d{3} \|/.test(l)).length;
console.log('全量清单 table rows:',tbl);
console.log('总览表行:');
L.slice(L.findIndex(l=>/^## 一、/.test(l)), L.findIndex(l=>/^## 二、/.test(l))).filter(l=>l.startsWith('|')).forEach(l=>console.log('   '+l));
console.log('\n价值口径表:');
const v0=L.findIndex(l=>/^## 五、/.test(l)), v1=L.findIndex(l=>/^## 六、/.test(l));
L.slice(v0,v1).filter(l=>l.startsWith('|')||l.startsWith('>')).forEach(l=>console.log('   '+l.slice(0,180)));
