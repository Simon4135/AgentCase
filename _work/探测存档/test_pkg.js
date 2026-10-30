
const fs = require('fs');
const path = require('path');
(async () => {
  const candidates = [
    'https://workbuddy-space-static.codebuddy.work/page/INSWrkRFc3l53vz1PEJgPl/0/pkg.zip',
    'https://workbuddy-space-static.codebuddy.work/page/IN5WrKfFc3l53vzlPEJgpl/0/pkg.zip',
    'https://workbuddy-space-static.codebuddy.work/page/C4IMIxqXQDzznN6KEtzqft/1/install_skill.py',
  ];
  for (const u of candidates) {
    try {
      const r = await fetch(u, { redirect: 'follow' });
      console.log(r.status, r.headers.get('content-type'), r.headers.get('content-length'), '<-', u);
      if (r.status === 200) {
        const b = Buffer.from(await r.arrayBuffer());
        console.log('   bytes:', b.length, 'magic:', b.slice(0,4).toString('hex'), JSON.stringify(b.slice(0,80).toString('latin1')));
      }
    } catch (e) { console.log('ERR', u, e.message); }
  }
})();
