const fs=require("fs"),path=require("path");
const OUT="D:/WorkbuddyUseCase/WorkBuddy解决方案库";
const m=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/last_run.json","utf8"));
const fam2=m.rows.filter(r=>{const p=path.join(OUT,r.dir,"LiveDemo.html");return fs.existsSync(p)&&/class="prompt-box"/.test(fs.readFileSync(p,"utf8"));});
let nDiv=0,multiBox=0,pbTextPerBox=[],headish=[];
for(const r of fam2){
  const h=fs.readFileSync(path.join(OUT,r.dir,"LiveDemo.html"),"utf8");
  const boxes=(h.match(/class="prompt-box"/g)||[]).length;
  const pbt=(h.match(/class="pb-text"/g)||[]).length;
  pbTextPerBox.push(boxes+"/"+pbt);
  if(boxes>1||pbt>1)multiBox++;
  // nested div inside pb-text?
  const mm=/<div[^>]*class="pb-text"[^>]*>([\s\S]*?)<\/div>/.exec(h);
  if(mm&&/<div/.test(mm[1]))nDiv++;
  // anything between prompt-box and pb-text?
  const mb=/<div[^>]*class="prompt-box"[^>]*>([\s\S]{0,400}?)<div[^>]*class="pb-text"/.exec(h);
  if(mb)headish.push(mb[1].replace(/<!--[\s\S]*?-->/g,"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim());
}
console.log("fam2 solutions:",fam2.length,"| boxes/pbtext:",pbTextPerBox.join(" "));
console.log("with >1 box or >1 pb-text:",multiBox,"| pb-text containing nested <div>:",nDiv);
console.log("text between box and pb-text:",JSON.stringify([...new Set(headish)]).slice(0,500));
