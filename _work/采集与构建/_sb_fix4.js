
const fs=require('fs');
const js = fs.readFileSync('D:/WorkbuddyUseCase/_work/采集与构建/_sb_mobile.js','utf8');
const files = [
 'D:/WorkbuddyUseCase/_work/采集与构建/index_template.html',
 'D:/WorkbuddyUseCase/_work/采集与构建/analysis_template.html',
 'D:/WorkbuddyUseCase/_work/_p_int3.html'
];
for (const f of files) {
  let h = fs.readFileSync(f,'utf8');
  const b0 = h.length;
  if (h.indexOf('id="wbsbScrim"') < 0) h = h.replace('</body>', js + '</body>');
  fs.writeFileSync(f,h,'utf8');
  console.log(f.split('/').pop(), b0+' -> '+h.length, 'scrim='+(h.indexOf('id="wbsbScrim"')>=0));
}
const cssFiles = [
 'D:/WorkbuddyUseCase/_work/采集与构建/index_template.html',
 'D:/WorkbuddyUseCase/_work/采集与构建/analysis_template.html',
 'D:/WorkbuddyUseCase/_work/_p_int1.html'
];
for (const f of cssFiles) {
  let h = fs.readFileSync(f,'utf8');
  const b0 = h.length;
  const oldB = fs.readFileSync('D:/WorkbuddyUseCase/_work/采集与构建/_old_mobile.txt','utf8');
  const newB = fs.readFileSync('D:/WorkbuddyUseCase/_work/采集与构建/_new_mobile.txt','utf8');
  if (h.indexOf('#wbsbScrim{') < 0) {
    if (h.indexOf(oldB) < 0) { console.log('  MISS old mobile block in', f.split('/').pop()); }
    else h = h.replace(oldB, newB);
  }
  fs.writeFileSync(f,h,'utf8');
  console.log('css', f.split('/').pop(), b0+' -> '+h.length, 'scrimCss='+(h.indexOf('#wbsbScrim{')>=0));
}
