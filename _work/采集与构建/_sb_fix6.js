
const fs=require('fs');
const files=[
 'D:/WorkbuddyUseCase/_work/采集与构建/index_template.html',
 'D:/WorkbuddyUseCase/_work/采集与构建/analysis_template.html',
 'D:/WorkbuddyUseCase/_work/_p_int1.html'
];
const oldR = '  #wbopen{display:block;z-index:61}\n}';
const newR = '  #wbopen{display:block;z-index:61}\n  body:not(.sb-hide) #wbopen{display:none}\n}';
for(const f of files){
  let h=fs.readFileSync(f,'utf8');
  const b0=h.length;
  if (h.indexOf('body:not(.sb-hide) #wbopen{display:none}') < 0) {
    if (h.indexOf(oldR) < 0) { console.log('MISS', f.split('/').pop()); continue; }
    h = h.replace(oldR, newR);
    fs.writeFileSync(f,h,'utf8');
  }
  console.log('OK', f.split('/').pop(), b0+' -> '+h.length);
}
