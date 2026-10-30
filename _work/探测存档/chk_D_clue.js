const fs=require("fs"),path=require("path");
const OUT="D:/WorkbuddyUseCase/WorkBuddy解决方案库";
const m=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/last_run.json","utf8"));
const d=m.rows.filter(r=>(r.tier||"").charAt(0)==="D");
console.log("remaining D-tier:",d.length);
// any page in these dirs with a code-ish/prompt-ish container?
const clue=/你是一位|请你|请基于|请帮我|帮我做|角色[:：]|Role|#\s*提示词|Prompt/i;
for(const r of d){
  const dir=path.join(OUT,r.dir);
  for(const fn of fs.readdirSync(dir).filter(x=>x.endsWith(".html"))){
    const h=fs.readFileSync(path.join(dir,fn),"utf8");
    const t=h.replace(/<script[\s\S]*?<\/script>/g,"").replace(/<style[\s\S]*?<\/style>/g,"").replace(/<!--[\s\S]*?-->/g,"").replace(/<\/?[a-zA-Z][^>]*>/g," ").replace(/&nbsp;/g," ").replace(/\s+/g," ");
    const mm=clue.exec(t);
    if(mm)console.log("  ",r.dir,"/",fn,"->",JSON.stringify(t.slice(Math.max(0,mm.index-60),mm.index+150)));
  }
}
