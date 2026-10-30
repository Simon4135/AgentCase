
const fs=require("fs"),path=require("path");
const C=require("D:/WorkbuddyUseCase/_tools/wb_core.js");
const m=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/last_run.json","utf8"));
const hOnly=m.rows.filter(r=>r.hasIntro && !r.hasDemo);
console.log("intro-but-no-demo rows:", hOnly.length, "of", m.rows.filter(r=>r.hasIntro).length);

// find first live-demos href on N sample intros using flexible nav regex
(async()=>{
  const sample = hOnly.filter((_,i)=>i%Math.ceil(hOnly.length/12)===0).slice(0,12);
  for (const r of sample) {
    const g = await C.getText(r.src);
    if (!g.ok) { console.log("sid"+r.sid, "FAIL", g.status); continue; }
    const t=g.text;
    const all = [...t.matchAll(/href="([^"]*live-demos[^"]*)"/g)].map(x=>x[1]);
    const sub = (/<nav[^>]*class="subnav"[^>]*>/i.exec(t)||[])[0] || "(no subnav tag)";
    console.log("sid"+r.sid, String(r.t).slice(0,18), "| navTag:", sub.slice(0,60), "| liveDemos refs:", JSON.stringify([...new Set(all)]).slice(0,160));
  }
})();
