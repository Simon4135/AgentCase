const fs=require("fs"),path=require("path");
const ROOT="D:/WorkbuddyUseCase/WorkBuddy解决方案库";
const rows=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/last_run.json","utf8")).rows;
function show(dir,cls,label){
  const p=path.join(ROOT,dir,"场景引入.html");
  if(!fs.existsSync(p)){console.log(label,"missing");return;}
  const h=fs.readFileSync(p,"utf8");
  const i=h.search(new RegExp('class="[^"]*\\b'+cls+'\\b'));
  if(i<0){console.log(label+" ["+dir+"] ."+cls+" NOT FOUND");return;}
  console.log("=== "+label+" ["+dir+"] ."+cls+" ===");
  console.log(h.slice(i-60,i+900).replace(/<!--[\s\S]*?-->/g,"").replace(/ data-page-node-id="[^"]*"/g,"").replace(/\s+/g," "));
}
show("001_图纸询价智能报价","pv","A");
show("001_图纸询价智能报价","ev","A");
show("087_部门人力盘点","case","C");
show("002_合同条款确认","tier","A");
show("003_客户单据转订单","val","A");
