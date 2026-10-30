/* ---------- 15 怎么选第一个 ---------- */
(function () {
  const nPkg = DATA.filter(function (r) { return r.pk; }).length;
  const nEasy = DATA.filter(function (r) { return r.score && r.score.diff === 1; }).length;
  const nRoi = DATA.filter(function (r) { return r.roi && r.roi.speed; }).length;
  const nExcel = DATA.filter(function (r) { return (r.kinds || []).indexOf('Excel') >= 0; }).length;
  const nZin1 = DATA.filter(function (r) { return r.zin && r.zin.indexOf('+') < 0; }).length;
  const nHuman = DATA.filter(function (r) { return r.human; }).length;
  const nChain = DATA.filter(function (r) { return r.chain; }).length;

  const GOOD = [
    ['这个场景要的那份文件，你手头就有', '最理想是一份 Excel：' + nExcel + ' 个方案的主产物是 Excel 类文件，' + nZin1 + ' 个方案的技能包输入只有单一类型（不用你去凑多种格式）。'],
    ['官方评分把它标成「落地难度 1」', '难度 1（最易）的方案有 ' + nEasy + ' 个。评分公式把落地难度放在分母 —— 官方自己的说法是「需要先对接 POS / ERP 才能用的场景，分数会被压得很低」。'],
    ['它带技能包（A 类）', '只有 ' + nPkg + ' 个方案配了技能包 zip。有包意味着取数口径、判定规则、产出模板都是现成的，装完就能跑；没包的（C 类）要自己把提示词和输入材料对齐。'],
    ['官方在同一张对照卡里写清了改造前后耗时', '目前只有 ' + nRoi + ' 个方案做到这一点 —— 这类方案的价值主张最容易被你自己验证。']
  ];
  const BAD = [
    ['要求你「先把数据整理规范」', '官方把这类前提写成「不要求…先…」，说明它简化掉了这一步。反过来说：如果你的数据本来就很乱，先做清洗类场景（如 BOM 脏数据清洗、一物多码归并）会更顺。'],
    ['需要对接业务系统才能跑', '这类场景在官方评分里会吃亏，现实里你还要协调 IT。全库真正做系统对接的方案是 0 个。'],
    ['指望它替你「拍板」', nHuman + ' 个方案明确要求人工审批 / 确认 / 复核 / 把关。它是「AI 出草稿、人做判断」，不是无人化。'],
    ['指望它和上下游自动接力', '跨场景自动衔接的方案基本没有（明确写「衔接 X」的只有 ' + nChain + ' 个）。文件在场景之间的搬运仍要人做。']
  ];

  el('guideGood').innerHTML = GOOD.map(function (g, i) {
    return '<div class="gcard g"><span class="gi">' + (i + 1) + '</span><div><h5>' + esc(g[0]) + '</h5><p>' + g[1] + '</p></div></div>';
  }).join('');
  el('guideBad').innerHTML = BAD.map(function (g, i) {
    return '<div class="gcard b"><span class="gi">' + (i + 1) + '</span><div><h5>' + esc(g[0]) + '</h5><p>' + g[1] + '</p></div></div>';
  }).join('');

  const cnt = {};
  DATA.forEach(function (r) { if (r.score) { const d = r.score.diff; cnt[d] = (cnt[d] || 0) + 1; } });
  const dk = Object.keys(cnt).map(Number).sort(function (a, b) { return a - b; });
  const mx = Math.max.apply(null, dk.map(function (d) { return cnt[d]; }));
  el('guideDiff').innerHTML = dk.map(function (d) {
    const c = cnt[d];
    return '<div class="cmpbar g" data-d="' + d + '"><div class="lb">落地难度 ' + d + '</div>' +
      '<div class="tt"><div class="ff" style="width:' + (c / mx * 100).toFixed(1) + '%"></div></div>' +
      '<div class="vv">' + c + ' <small>' + pct(c, DATA.length).toFixed(0) + '%</small></div></div>';
  }).join('');
  el('guideDiff').querySelectorAll('.cmpbar').forEach(function (x) {
    x.addEventListener('click', function () {
      const d = +x.dataset.d;
      showList('落地难度 ' + d, DATA.filter(function (r) { return r.score && r.score.diff === d; }), '官方评分公式里的分母：落地难度（1 = 最容易落地）');
    });
  });
})();
