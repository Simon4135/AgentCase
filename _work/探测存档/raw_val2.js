const fs=require("fs"),path=require("path");
const ROOT="D:/WorkbuddyUseCase/WorkBuddy解决方案库";
function slice(dir,needle,len){
  const h=fs.readFileSync(path.join(ROOT,dir,"场景引入.html"),"utf8");
  const i=h.indexOf(needle);
  if(i<0){console.log("["+dir+"] '"+needle+"' NOT FOUND");return;}
  console.log("=== ["+dir+"] "+needle+" ===");
  console.log(h.slice(i-140,i+len).replace(/<!--[\s\S]*?-->/g,"").replace(/ data-page-node-id="[^"]*"/g,"").replace(/\s+/g," "));
  console.log("");
}
slice("002_合同条款确认","核心价值",900);
slice("087_部门人力盘点","pv-grid",900);
slice("001_图纸询价智能报价","要准备什么",600);
