const fs = require('fs');
const B = 'D:\\WorkbuddyUseCase\\_work\\采集与构建\\';
const W = 'D:\\WorkbuddyUseCase\\_work\\';
function rd(p){ return fs.readFileSync(p, 'utf8'); }
function cut(p){
  var s = rd(p);
  var i = s.indexOf('<script>\nwindow.__SB');
  if (i < 0) { console.log('NO SCRIPT BLOCK: ' + p); return null; }
  var e = s.indexOf('<\/script>', i);
  if (e < 0) throw new Error('unterminated');
  e += '<\/script>'.length;
  var blk = s.slice(i, e);
  var out = s.slice(0, i).replace(/\n+$/, '\n') + s.slice(e);
  fs.writeFileSync(p, out, 'utf8');
  console.log('CUT ' + p + ' -> block ' + blk.length + ' chars, remaining ' + out.length);
  return blk;
}
function pasteBefore(p, blk){
  var s = rd(p);
  var k = s.lastIndexOf('</body>');
  if (k < 0) throw new Error('no </body> in ' + p);
  var out = s.slice(0, k) + blk + '\n' + s.slice(k);
  fs.writeFileSync(p, out, 'utf8');
  console.log('PASTED into ' + p + ' -> ' + out.length + ' chars');
}
var b1 = cut(B + 'index_template.html');
var b2 = cut(B + 'analysis_template.html');
var b3 = cut(W + '_p_int1.html');
pasteBefore(B + 'index_template.html', b1);
pasteBefore(B + 'analysis_template.html', b2);
pasteBefore(W + '_p_int3.html', b3);
