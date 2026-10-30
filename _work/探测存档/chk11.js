
const fs=require("fs");
const C=require("D:/WorkbuddyUseCase/_tools/wb_core.js");
(async()=>{
const m=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/last_run.json","utf8"));
const r=m.rows.find(x=>x.sid===310);
const g=await C.getText(r.demoUrl);
const h=g.text;
const i=h.indexOf('id="lp"');
console.log("=== raw around first prompt block ===");
console.log(h.slice(i-120,i+900));
console.log("=== counts: class=\"prompt\" :",(h.match(/class="prompt/g)||[]).length, "| cp( :",(h.match(/cp\('/g)||[]).length, "| dstep :",(h.match(/class="dstep/g)||[]).length);
})();
