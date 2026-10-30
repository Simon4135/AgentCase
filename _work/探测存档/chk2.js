
const fs=require("fs");
const m=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_tools/last_run.json","utf8"));
console.log("row keys:",JSON.stringify(Object.keys(m.rows[0])));
console.log("meta keys:",JSON.stringify(Object.keys(m).filter(k=>k!=="rows")));
console.log("sample row:",JSON.stringify(m.rows[0]));
const data=JSON.parse(fs.readFileSync("D:/WorkbuddyUseCase/_probe/v210_data.json","utf8"));
const S=data.SOLUTIONS;
console.log("SOLUTIONS total:",S.length,"| with src:",S.filter(x=>x.src).length);
const noSrc=S.filter(x=>!x.src);
console.log("no-src entries:",JSON.stringify(noSrc.map(x=>({sid:x.sid,t:x.t,ind:x.ind,ph:x.placeholder,status:x.status}))));
// check rows coverage of all src entries
const rowSids=new Set(m.rows.map(r=>r.sid));
const miss=S.filter(x=>x.src && !rowSids.has(x.sid));
console.log("src entries missing from run:",miss.length, JSON.stringify(miss.map(x=>x.sid)));
// the 4 HTD- ones
console.log("HTD- rows:",JSON.stringify(m.rows.filter(r=>r.hasTasks&&!r.hasPkg).map(r=>({sid:r.sid,t:r.t,pkg:r.pkg,note:r.note}))));
console.log("ind distribution:",JSON.stringify(m.rows.reduce((a,r)=>{a[r.ind||"(空)"]=(a[r.ind||"(空)"]||0)+1;return a;},{}),null,0));
