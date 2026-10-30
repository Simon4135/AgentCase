const fs = require('fs');
const B = 'D:\\WorkbuddyUseCase\\_work\\采集与构建\\';
const W = 'D:\\WorkbuddyUseCase\\_work\\';
function rd(p){ return fs.readFileSync(p, 'utf8'); }
const CSS = rd(B + '_sb.css');
const SKEL = rd(B + '_sb.html');
const CORE = rd(B + '_sb_core.js');
function block(cfgFile){
  return '<script>\n' + rd(B + cfgFile).replace(/\s+$/, '') + '\n' + CORE.replace(/\s+$/, '') + '\n</script>\n';
}
function inject(src, cfgFile, extras){
  if (src.indexOf('wb-sidebar') >= 0) return { skip: true, out: src };
  var i = src.indexOf('</style>');
  if (i < 0) throw new Error('no </style>');
  var s = src.slice(0, i) + CSS + '\n' + src.slice(i);
  var j = s.indexOf('<body>');
  if (j < 0) throw new Error('no <body>');
  j += '<body>'.length;
  s = s.slice(0, j) + '\n' + SKEL + '\n' + block(cfgFile) + s.slice(j);
  (extras || []).forEach(function(p){
    if (s.indexOf(p[0]) < 0) throw new Error('missing anchor: ' + p[0]);
    s = s.replace(p[0], p[1]);
  });
  return { skip: false, out: s };
}
var jobs = [
  { file: B + 'index_template.html', cfg: '_sb_cfg_index.js', extras: [['<div class="bar">', '<div class="bar" id="sb-search">'], ['<table>', '<table id="sb-table">']] },
  { file: B + 'analysis_template.html', cfg: '_sb_cfg_analysis.js', extras: [] },
  { file: W + '_p_int1.html', cfg: '_sb_cfg_research.js', extras: [] }
];
jobs.forEach(function(j){
  var res = inject(rd(j.file), j.cfg, j.extras);
  if (res.skip) { console.log('SKIP (already has sidebar): ' + j.file); return; }
  fs.writeFileSync(j.file, res.out, 'utf8');
  console.log('INJECTED ' + j.file + '  bytes ' + Buffer.byteLength(res.out, 'utf8'));
});
