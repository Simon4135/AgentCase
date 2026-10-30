
const BASE = 'https://www.workbuddy.cn';
const nodeId = 'ZljbYQzFpALFLcPwKPlct1';
async function call(method, p, body) {
  const res = await fetch(BASE + p, {
    method,
    headers: { 'content-type': 'application/json', 'accept': 'application/json, text/plain, */*' },
    body: body ? JSON.stringify(body) : undefined
  });
  const text = await res.text();
  return { status: res.status, ct: res.headers.get('content-type'), len: text.length, body: text.slice(0, 2500) };
}
(async () => {
  const tests = [
    ['POST','/space/napi/view/query/node_info', { id: nodeId, type: 'node' }],
    ['POST','/space/napi/view/query/node_info', { id: nodeId, type: 'doc' }],
    ['POST','/space/api/view/query/pagechunk', { spaceId: nodeId, pageId: nodeId, limit: 200, chunkNumber: 0, chunked: 1 }],
    ['POST','/space/napi/view/query/pagechunk', { spaceId: nodeId, pageId: nodeId, limit: 200, chunkNumber: 0, chunked: 1 }],
    ['GET','/space/napi/view/query/node_info?id=' + nodeId + '&type=node', null],
  ];
  for (const [m, p, b] of tests) {
    try {
      const r = await call(m, p, b);
      console.log('\n### ' + m + ' ' + p + ' ' + (b ? JSON.stringify(b) : ''));
      console.log('status=' + r.status + ' ct=' + r.ct + ' len=' + r.len);
      console.log(r.body);
    } catch (e) { console.log('\n### ' + m + ' ' + p + ' ERROR ' + e.message); }
  }
})();
