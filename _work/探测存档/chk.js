
const L = require('D:/WorkbuddyUseCase/_tools/wb_lib.js');
(async () => {
  const base = 'https://workbuddy-space-static.codebuddy.work/page/XDAj9uPGyFKYk1zicA86ni/29/';
  for (const f of ['shared/style.css','shared/discrete-extra.css','page/page_comm/inject.js','deep-dives/rfq-quote-tasks.html']) {
    const r = await L.fetchBin(base + f);
    console.log(r.ok ? r.status : r.status, (r.buf ? r.buf.length : 0) + 'B', r.ctype, '<-', f);
  }
  // inject.js from root
  const r2 = await L.fetchBin('https://workbuddy-space-static.codebuddy.work/page/page_comm/inject.js');
  console.log(r2.ok ? r2.status : r2.status, (r2.buf?r2.buf.length:0)+'B', '<- /page/page_comm/inject.js');
})();
