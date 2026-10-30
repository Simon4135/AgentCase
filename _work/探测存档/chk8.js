
const fs=require("fs"),path=require("path");
const C=require("D:/WorkbuddyUseCase/_tools/wb_core.js");
const m=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/last_run.json","utf8"));
(async()=>{
// Do the 403 truly have no tasks page anywhere? probe alternates on a few samples
const two=m.rows.filter(r=>r.hasIntro&&!r.hasTasks).filter((_,i)=>i%Math.ceil(m.rows.filter(x=>x.hasIntro&&!x.hasTasks).length/5)===0).slice(0,5);
for(const r of two){
  const base=r.src.replace(/\/[^/]+$/,"/");
  const slug=(/\/([^/]+)\.html$/.exec(r.src)||[])[1];
  const cands=[slug+"-tasks.html","../deep-dives/"+slug+"-tasks.html",r.src.replace(/\.html$/,"-tasks.html")];
  const out=[];
  for(const c of cands){ const u=new URL(c,base).href; const g=await C.getText(u); out.push(c.split("/").pop()+"="+g.status); }
  // also scan the demo page for prompt-ish markers
  const gd=r.demoUrl?await C.getText(r.demoUrl):{ok:false,text:""};
  const hints=["wbSkillPrompt","task","复制","提示词","install_skill","pkg.zip"].map(k=>k+"="+(gd.text?gd.text.includes(k):"?"));
  console.log("sid"+r.sid, r.t.slice(0,14), "| alt:",out.join(","), "| demoScan:",hints.join(","));
}
})();
