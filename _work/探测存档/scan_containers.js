const fs=require('fs'),path=require('path');
const ROOT='D:/WorkbuddyUseCase/WorkBuddy解决方案库';
const rows=JSON.parse(fs.readFileSync('D:/WorkbuddyUseCase/_tools/last_run.json','utf8')).rows;
const clsCount={};
const detail={};
for(const r of rows){
  const p=path.join(ROOT,r.dir,'场景引入.html');
  if(!fs.existsSync(p))continue;
  const h=fs.readFileSync(p,'utf8');
  for(const m of h.matchAll(/class="([^"]+)"/g)) for(const c of m[1].split(/\s+/)) clsCount[c]=(clsCount[c]||0)+1;
}
const interesting=['case','case-info','lbl','pv','pv-grid','val','ev','amt','dp','dp-h','dp-b','en-c','et','ei','ed','lv-c','lt','ld','g3','g2','tier','kpi','stat','metric','sum','concl','note','hint','tip'];
console.log('=== candidate containers (page counts) ===');
interesting.forEach(c=>console.log(String(clsCount[c]||0).padStart(5)+'  .'+c));
// 采样 case-info 与 amt 结构
function dump(dir,needle,len){
  const p=path.join(ROOT,dir,'场景引入.html'); if(!fs.existsSync(p))return;
  const h=fs.readFileSync(p,'utf8'); const i=h.indexOf(needle); if(i<0){console.log('['+dir+'] '+needle+' NF');return;}
  console.log('=== ['+dir+'] '+needle+' ===');
  console.log(h.slice(i-60,i+len).replace(/<!--[\s\S]*?-->/g,'').replace(/ data-page-node-id="[^"]*"/g,'').replace(/\s+/g,' '));
}
dump('087_部门人力盘点','case-info',700);
dump('002_合同条款确认','class="amt"',500);
