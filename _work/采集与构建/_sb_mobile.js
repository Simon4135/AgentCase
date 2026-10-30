<!-- 窄屏抽屉：≤900px 时侧栏默认收起，点 ☰ 或滚出遮罩关闭 -->
<script>
(function(){
  var B = document.body;
  var q = window.matchMedia('(max-width:900px)');
  var sc = document.createElement('div'); sc.id = 'wbsbScrim'; B.appendChild(sc);
  function setScrim(){ sc.classList.toggle('on', q.matches && !B.classList.contains('sb-hide')); }
  function toMobile(){ if (q.matches) { B.classList.add('sb-hide'); } }
  toMobile(); setScrim();
  sc.addEventListener('click', function(){ B.classList.add('sb-hide'); setScrim(); });
  var ob = document.getElementById('wbopen');
  if (ob) ob.addEventListener('click', function(){ setTimeout(setScrim, 0); });
  try {
    q.addEventListener('change', function(e){
      if (e.matches) { B.classList.add('sb-hide'); } else { B.classList.remove('sb-hide'); sc.classList.remove('on'); }
      setScrim();
    });
  } catch (err) {}
})();
</script>
