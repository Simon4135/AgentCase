const fs=require('fs'), path=require('path');
const TOP='D:/WorkbuddyUseCase';
const LIB=path.join(TOP,'WorkBuddy解决方案库');
const dirs=fs.readdirSync(LIB).filter(d=>/^\d{3}_/.test(d)).sort();
console.log('方案目录数 =', dirs.length);
// 看一个典型目录的构成
for(const d of [dirs[0], dirs[100]]){
  console.log('');
  console.log('== '+d+' ==');
  for(const f of fs.readdirSync(path.join(LIB,d))) {
    const p=path.join(LIB,d,f);
    const st=fs.statSync(p);
    console.log('   '+(st.isDirectory()?'DIR  ':'FILE ')+f+'  '+(st.isDirectory()?'':st.size+' B'));
  }
}
// 技能包内容抽样（看是否有代码）
const zips=[];
for(const d of dirs){ for(const f of fs.readdirSync(path.join(LIB,d))) if(/\.zip$/.test(f)) zips.push(path.join(LIB,d,f)); }
console.log('');
console.log('技能包 zip 总数 =', zips.length);
// 用 node 自带能力读 zip 目录：改用 PowerShell Expand-Archive 更简单，这里先打印样本路径
console.log('样本:'); zips.slice(0,3).forEach(z=>console.log('   '+z));
