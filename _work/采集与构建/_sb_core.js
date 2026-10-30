(function(){
  var C = window.__SB || {};
  var D = document, B = D.body;
  function id(x){ return D.getElementById(x); }
  var host = id('wbsbBody');
  function ea(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  var tEl = id('wbsbTitle'), sEl = id('wbsbSub');
  if (C.title && tEl) tEl.textContent = C.title;
  if (C.sub && sEl) sEl.textContent = C.sub;

  // ---- \u81ea\u52a8\u7ed9\u6b63\u6587 section \u7f16\u53f7\u951a\u70b9 ----
  if (C.autoSections) {
    var secs = Array.prototype.slice.call(D.querySelectorAll(C.autoSections));
    secs.forEach(function(s, i){ if (!s.id) s.id = 'sb-s' + (i + 1); });
  }

  var h = [];
  var tocIds = [];
  if (C.groups && C.groups.length) {
    C.groups.forEach(function(g){
      if (g.label) h.push('<div class="sbt">' + ea(g.label) + '</div>');
      (g.items || []).forEach(function(it){
        tocIds.push(it.id);
        h.push('<a class="sbi" href="#' + ea(it.id) + '" data-t="' + ea(it.id) + '"' +
          (it.hint ? ' title="' + ea(it.hint) + '"' : '') + '>' +
          (it.no ? '<span class="sbp">' + ea(it.no) + '</span>' : '<span class="ic">\u2022</span>') +
          '<span class="tx">' + ea(it.tx) + '</span>' +
          (it.ct ? '<span class="ct">' + ea(it.ct) + '</span>' : '') + '</a>');
      });
    });
  }

  if (C.chips && C.chips.length) {
    h.push('<div class="sbdiv"></div><div class="sbt">' + ea(C.chipsLabel || '\u5feb\u6377\u7b5b\u9009') + '</div><div class="sbq" id="wbsbChips">');
    C.chips.forEach(function(c, i){ h.push('<button data-c="' + i + '"' + (c.acc ? ' title="' + ea(c.acc) + '"' : '') + '>' + ea(c.tx) + '</button>'); });
    h.push('</div>');
  }

  if (C.links && C.links.length) {
    h.push('<div class="sbdiv"></div><div class="sbt">' + ea(C.linksLabel || '\u76f8\u5173\u9875\u9762') + '</div>');
    C.links.forEach(function(l){
      h.push('<a class="sbi" href="' + ea(l.href) + '"' + (l.t ? ' target="_blank"' : '') + '>' +
        '<span class="ic">' + ea(l.ic || '\u203a') + '</span><span class="tx">' + ea(l.tx) + '</span>' +
        (l.ct ? '<span class="ct">' + ea(l.ct) + '</span>' : '') + '</a>');
    });
  }

  h.push('<div class="sbdiv"></div>');
  h.push('<button class="sbi" id="wbsbTopBtn"><span class="ic">\u2191</span><span class="tx">\u56de\u5230\u9876\u90e8</span></button>');
  if (host) host.innerHTML = h.join('');

  var ft = id('wbsbFoot');
  if (ft) ft.innerHTML = (C.foot || '') + (C.mirror ? '<div id="wbsbMirror" style="margin-top:7px;color:#0f766e;font-weight:650;font-size:12px"></div>' : '');

  // ---- \u6298\u53e0 / \u5c55\u5f00 ----
  var KEY = 'wbsbHide';
  try { if (localStorage.getItem(KEY) === '1') B.classList.add('sb-hide'); } catch(e){}
  function toggle(){
    B.classList.toggle('sb-hide');
    try { localStorage.setItem(KEY, B.classList.contains('sb-hide') ? '1' : '0'); } catch(e){}
  }
  var bc = id('wbsbc'), ob = id('wbopen');
  if (bc) bc.addEventListener('click', toggle);
  if (ob) ob.addEventListener('click', toggle);
  D.addEventListener('keydown', function(e){
    if (e.key !== '[') return;
    var k = (e.target && e.target.tagName || '').toUpperCase();
    if (k === 'INPUT' || k === 'SELECT' || k === 'TEXTAREA') return;
    toggle();
  });

  // ---- \u56de\u5230\u9876\u90e8 ----
  var tp = id('wbtop'), tb = id('wbsbTopBtn');
  function top(){ window.scrollTo({ top: 0, behavior: 'smooth' }); }
  if (tp) tp.addEventListener('click', top);
  if (tb) tb.addEventListener('click', top);

  // ---- \u6eda\u52a8\uff1a\u9ad8\u4eae + \u56de\u9876\u6309\u94ae ----
  var nodes = tocIds.map(id).filter(Boolean);
  var as = tocIds.map(function(x){ return host ? host.querySelector('a[data-t="' + x + '"]') : null; });
  function spy(){
    if (tp) tp.classList.toggle('on', window.scrollY > 420);
    if (!nodes.length) return;
    var k = 0;
    for (var i = 0; i < nodes.length; i++) { if (nodes[i].getBoundingClientRect().top <= 130) k = i; }
    if (as[k]) as.forEach(function(a, j){ if (a) a.classList.toggle('on', j === k); });
  }
  window.addEventListener('scroll', spy, { passive: true });
  spy();

  // ---- \u5feb\u6377\u7b5b\u9009 chips ----
  if (C.chips && C.chips.length) {
    var box = id('wbsbChips');
    function sel(){ return C.chips.map(function(c){ var e = id(c.sel); return e ? e.value : ''; }); }
    function setChip(i){
      var c = C.chips[i];
      if (c.reset) {
        C.chips.forEach(function(x){ if (!x.reset) { var e = id(x.sel); if (e) e.value = ''; } });
      } else {
        var e = id(c.sel); if (!e) return;
        e.value = (e.value === c.val ? '' : c.val);
      }
      C.chips.forEach(function(x){ if (!x.reset) { var e2 = id(x.sel); if (e2) e2.dispatchEvent(new Event('change', { bubbles: true })); } });
      sync();
    }
    function sync(){
      if (!box) return;
      var cur = sel();
      box.querySelectorAll('button').forEach(function(b, i){
        var c = C.chips[i]; if (!c || c.reset) return;
        b.classList.toggle('on', cur[i] === c.val);
      });
    }
    if (box) box.querySelectorAll('button').forEach(function(b){
      b.addEventListener('click', function(){ setChip(+b.dataset.c); });
    });
    D.addEventListener('change', function(e){
      if (C.chips.some(function(c){ return c.sel === (e.target && e.target.id); })) sync();
    });
    sync();
    window.__SBsync = sync;
  }

  // ---- \u955c\u50cf\u5e95\u90e8\u8ba1\u6570\u5230\u4fa7\u680f ----
  if (C.mirror) {
    var src = id(C.mirror), dst = id('wbsbMirror');
    if (src && dst) {
      var upd = function(){ dst.textContent = src.textContent || ''; };
      upd();
      try { new MutationObserver(upd).observe(src, { childList: true, subtree: true, characterData: true }); } catch(e){}
    }
  }
})();