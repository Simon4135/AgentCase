const fs=require("fs"),path=require("path");
const OUT="D:/WorkbuddyUseCase/WorkBuddy解决方案库";
const m=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/last_run.json","utf8"));
// 1) truncation check on family1: does raw block contain nested </div> right after opening?
let nested=0,samples=[];
for(const r of m.rows){
  const p=path.join(OUT,r.dir,"LiveDemo.html"); if(!fs.existsSync(p))continue;
  const h=fs.readFileSync(p,"utf8");
  const mm=/<div[^>]*class="prompt"[^>]*id="[^"]*"[^>]*>([\s\S]*?)<\/div>/.exec(h);
  if(!mm)continue;
  const body=mm[1];
  if(/<div/.test(body)){nested++; if(samples.length<3)samples.push([r.dir,body.slice(0,300)]);}
}
console.log("family1 blocks containing nested <div>:",nested,"/",651);
samples.forEach(s=>console.log("  ",s[0],"::",s[1].replace(/\s+/g," ").slice(0,260)));
// 2) the 18 with nothing: check their intro page + any file for prompt-ish text
const fam2=m.rows.filter(r=>{const p=path.join(OUT,r.dir,"LiveDemo.html");return fs.existsSync(p)&&/class="prompt-box"/.test(fs.readFileSync(p,"utf8"));});
const f2set=new Set(fam2.map(r=>r.dir));
const rest=m.rows.filter(r=>!f2set.has(r.dir)).filter(r=>{const p=path.join(OUT,r.dir,"LiveDemo.html");return !fs.existsSync(p)||!/class="prompt"/.test(fs.readFileSync(p,"utf8"));});
console.log("=== remaining with no prompt in LiveDemo:",rest.length);
for(const r of rest.slice(0,6)){
  const d=path.join(OUT,r.dir);
  const files=fs.readdirSync(d);
  let hits=[];
  for(const fn of files.filter(x=>x.endsWith(".html"))){
    const h=fs.readFileSync(path.join(d,fn),"utf8");
    const c1=(h.match(/class="prompt"/g)||[]).length, c2=(h.match(/class="prompt-box"/g)||[]).length, c3=(h.match(/pb-text/g)||[]).length;
    hits.push(fn+"[p="+c1+",pb="+c2+",pbtext="+c3+"]");
  }
  console.log("  ",r.dir,"|",hits.join(" "));
}
