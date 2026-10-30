
const BASE = 'https://www.workbuddy.cn';
const nodeId = 'ZljbYQzFpALFLcPwKPlct1';
async function call(method, p, body) {
  const res = await fetch(BASE + p, { method, headers: { 'content-type': 'application/json', 'accept': 'application/json, text/plain, */*' }, body: body ? JSON.stringify(body) : undefined });
  const text = await res.text();
  return { status: res.status, ct: res.headers.get('content-type'), len: text.length, body: text.slice(0, 1200) };
}
(async () => {
  const getPaths = [
    '/space/api/view/query/pagechunk',
    '/space/api/view/query/page-database/query',
    '/space/api/view/query/records',
    '/space/api/view/query/subpages',
    '/space/api/view/query/descendants',
    '/space/api/view/get/backlinks',
    '/space/napi/view/query/descendants',
    '/api/view/query/downloadUrl',
    '/space/api/view/query/downloadUrl',
  ];
  for (const p of getPaths) {
    try {
      const r = await call('POST', p, { spaceId: nodeId, pageId: nodeId, nodeId, id: nodeId, type: 'node', limit: 50 });
      console.log('POST ' + p + ' -> ' + r.status + ' ' + r.body.replace(/\s+/g,' ').slice(0,200));
    } catch (e) { console.log('POST ' + p + ' ERR ' + e.message); }
  }
  // also: try to find the space id via node_info type space
  console.log('\n--- space lookup ---');
  const s = await call('POST','/space/napi/view/query/node_info',{ id: nodeId, type: 'space' });
  console.log(JSON.stringify(s));
})();
