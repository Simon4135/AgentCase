
const fs = require("fs");
const m = JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/last_run.json","utf8"));
console.log("total", m.total, "ok", m.ok, "partial", m.partial, "failed", m.failed);
const pat = {};
for (const r of m.rows) {
  const k = (r.hasIntro?"H":"-")+(r.hasTasks?"T":"-")+(r.hasDemo?"D":"-")+(r.hasPkg?"Z":"-");
  pat[k] = (pat[k]||0)+1;
}
console.log("pattern distribution:", JSON.stringify(pat, null, 1));
// group partials by note
const notes = {};
for (const r of m.rows) { if (r.hasIntro && r.hasTasks && r.hasPkg) continue; for (const n of (r.notes||[])) { const key = n.replace(/\[[0-9]+\]/,"[N]").slice(0,60); notes[key]=(notes[key]||0)+1; } }
console.log("notes:", JSON.stringify(notes, null, 1));
// sample of H--- rows
const hOnly = m.rows.filter(r=>r.hasIntro && !r.hasTasks);
console.log("intro-only count:", hOnly.length);
console.log("samples:");
for (const r of hOnly.slice(0,8)) console.log("  sid"+r.sid, r.t, "|", r.src);
// do these H--- have a pkg?
console.log("H--- with pkg:", m.rows.filter(r=>r.hasIntro&&!r.hasTasks&&r.hasPkg).length);
// HTD- (has tasks, no pkg)
console.log("HTD- count:", m.rows.filter(r=>r.hasTasks&&!r.hasPkg).length);
