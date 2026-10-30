const fs = require('fs'), vm = require('vm');
const TOP = 'D:\\WorkbuddyUseCase\\';
const files = [TOP + '索引.html', TOP + '分析.html', TOP + 'AI接入企业系统调研.html'];
function mkEl(tag){
  var el = {
    tagName: (tag || 'DIV').toUpperCase(), innerHTML: '', textContent: '', value: '',
    dataset: {}, style: {}, children: [],
    classList: { _s: {}, add: function(c){ this._s[c]=1; }, remove: function(c){ delete this._s[c]; },
      toggle: function(c, f){ if (f === undefined) f = !this._s[c]; if (f) this._s[c]=1; else delete this._s[c]; return f; },
      contains: function(c){ return !!this._s[c]; } },
    addEventListener: function(){}, removeEventListener: function(){},
    querySelector: function(){ return null; },
    querySelectorAll: function(){ return []; },
    getBoundingClientRect: function(){ return { top: 0, left: 0, width: 0, height: 0 }; },
    appendChild: function(c){ this.children.push(c); return c; },
    setAttribute: function(){}, getAttribute: function(){ return null; },
    dispatchEvent: function(){}, focus: function(){}, scrollIntoView: function(){}
  };
  return el;
}
files.forEach(function(f){
  var html = fs.readFileSync(f, 'utf8');
  var scripts = [];
  var re = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi, m;
  while ((m = re.exec(html))) scripts.push(m[1]);
  var ok = 0, bad = [];
  scripts.forEach(function(s, i){
    try { new vm.Script(s); ok++; } catch(e){ bad.push(i + ': ' + e.message); }
  });
  var count = function(s){ return (html.split(s).length - 1); };
  console.log('--- ' + f.split('\\').pop() + '  bytes=' + Buffer.byteLength(html));
  console.log('    inline scripts=' + scripts.length + ' SYNTAX_OK=' + ok + (bad.length ? ' BAD=' + JSON.stringify(bad) : ''));
  console.log('    sidebar: wbsb=' + count('id="wbsb"') + ' body=' + count('id="wbsbBody"') + ' wbopen=' + count('id="wbopen"') + ' wbtop=' + count('id="wbtop"') + ' cssMarker=' + count('wb-sidebar') + ' cfgMarker=' + count('window.__SB'));
  var ext = (html.match(/<(script|link|img)[^>]*(src|href)="https?:/gi) || []).length;
  console.log('    external resource refs=' + ext + '  __DATA__left=' + count('/*__DATA__*/'));
});
