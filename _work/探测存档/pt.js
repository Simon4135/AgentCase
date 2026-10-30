
const C = require('D:/WorkbuddyUseCase/_tools/wb_core.js');
const fs = require('fs');
const h = fs.readFileSync('D:/WorkbuddyUseCase/_probe/rfq-quote-tasks.html','utf8');
const t = C.parseTasks(h);
console.log('title:', t.title);
console.log('lead:', t.lead);
console.log('skillPrompt len:', t.skillPrompt.length);
console.log('tasks:', t.tasks.length);
for (const x of t.tasks) console.log('  ' + x.no + ' [' + x.ttl + ']' + (x.star ? ' ★'+x.star : '') + ' :: ' + x.prompt.slice(0,70).replace(/\n/g,' '));
console.log('intro:', JSON.stringify(t.intro, null, 1).slice(0,600));
