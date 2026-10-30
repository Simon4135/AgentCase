
const fs=require("fs"),path=require("path");
const C=require("D:/WorkbuddyUseCase/_tools/wb_core.js");
(async()=>{
const r=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/last_run.json","utf8")).rows.find(x=>x.sid===310);
console.log("sid310",r.t,"\ndemoUrl:",r.demoUrl);
const g=await C.getText(r.demoUrl);
const h=g.text;
console.log("len",h.length);
const i=h.indexOf("提示词");
console.log("--- ctx around 提示词 ---");
console.log(h.slice(Math.max(0,i-800),i+600).replace(/\n{2,}/g,"\n"));
})();
