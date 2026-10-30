const fs = require('fs'), vm = require('vm');
const TOP = 'D:\\WorkbuddyUseCase\\';
function mk(tag){
  var el = {
    tagName:(tag||'DIV').toUpperCase(), innerHTML:'', textContent:'', value:'', id:'',
    dataset:{}, style:{}, children:[], _attrs:{},
    classList:{ _s:{}, add:function(c){this._s[c]=1;}, remove:function(c){delete this._s[c];},
      toggle:function(c,f){ if(f===undefined) f=!this._s[c]; if(f) this._s[c]=1; else delete this._s[c]; return f; },
      contains:function(c){ return !!this._s[c]; } },
    addEventListener:function(){}, removeEventListener:function(){},
    querySelector:function(){ return null; },
    querySelectorAll:function(sel){ return this._all || []; },
    getElementsByTagName:function(){ return []; },
    getBoundingClientRect:function(){ return { top:0,left:0,width:0,height:0 }; },
    appendChild:function(c){ this.children.push(c); return c; },
    setAttribute:function(k,v){ this._attrs[k]=v; }, getAttribute:function(k){ return this._attrs[k]||null; },
    dispatchEvent:function(){ return true; }, focus:function(){}, scrollIntoView:function(){}
  };
  return el;
}
function run(file, label){
  var html = fs.readFileSync(file, 'utf8');
  var js = [];
  var re = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi, m;
  while ((m = re.exec(html))) js.push(m[1]);
  var store = {};
  var doc = {
    body: mk('body'), documentElement: mk('html'),
    getElementById: function(id){ if(!store[id]) { store[id]=mk('div'); store[id].id=id; } return store[id]; },
    querySelector: function(){ return null; },
    querySelectorAll: function(sel){
      if (sel === 'section') { var a=[]; for(var i=0;i<15;i++) a.push(mk('section')); return a; }
      return [];
    },
    createElement: function(t){ return mk(t); },
    addEventListener: function(){}
  };
  var ctx = { document: doc, window: { addEventListener:function(){}, scrollTo:function(){}, scrollY:0, localStorage:{ getItem:function(){return null;}, setItem:function(){} } },
    localStorage:{ getItem:function(){return null;}, setItem:function(){} }, console:console, JSON:JSON, Math:Math, Date:Date,
    encodeURI:encodeURI, parseInt:parseInt, parseFloat:parseFloat, isNaN:isNaN, Event:function(t){ this.type=t; },
    MutationObserver:function(){ this.observe=function(){}; }, setTimeout:setTimeout, Array:Array, Object:Object, String:String, Number:Number };
  ctx.window.document = doc; ctx.globalThis = ctx;
  var errs = [];
  js.forEach(function(s, i){
    try { vm.createContext(ctx); vm.runInContext(s, ctx, { timeout: 20000 }); }
    catch(e){ errs.push('script[' + i + ']: ' + e.message); }
  });
  var sbBody = store['wbsbBody'] ? (store['wbsbBody'].innerHTML || '') : '';
  var cnt = function(s){ return (sbBody.split(s).length - 1); };
  console.log('=== ' + label + '  errs=' + (errs.length ? JSON.stringify(errs) : 'none'));
  console.log('    sidebar html len=' + sbBody.length + '  导航项(a.sbi)=' + cnt('class="sbi"') + '  分组=' + cnt('class="sbt"') + '  chips=' + cnt('<button data-c=') + '  分隔=' + cnt('class="sbdiv"'));
  console.log('    mirror=' + (store['wbsbMirror'] ? 'yes' : 'no') + '  foot=' + (store['wbsbFoot'] ? (store['wbsbFoot'].innerHTML||'').length : 'n/a') + '  title=' + (store['wbsbTitle'] ? store['wbsbTitle'].textContent : 'n/a'));
  console.log('    sb-cfg=' + (ctx.window.__SB ? 'yes' : 'no') + '  pageSec=' + (store['tb'] ? (store['tb'].innerHTML||'').split('<tr').length - 1 : (store['kpis'] ? 'n/a' : '?')) + '  kpis=' + (store['kpis'] ? (store['kpis'].innerHTML||'').length : 'n/a'));
}
run(TOP + '索引.html', '索引.html');
run(TOP + '分析.html', '分析.html');
run(TOP + 'AI接入企业系统调研.html', 'AI接入企业系统调研.html');
