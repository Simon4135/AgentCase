
const BASE = 'https://www.workbuddy.cn';
const nodeId = 'ZljbYQzFpALFLcPwKPlct1';
async function call(p, body, extraHeaders={}) {
  const url = BASE + p;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'accept': 'application/json, text/plain, */*', ...extraHeaders },
    body: JSON.stringify(body)
  });
  const text = await res.text();
  return { url, status: res.status, ct: res.headers.get('content-type'), len: text.length, body: text.slice(0, 1500) };
}
(async () => {
  const tests = [
    ['/space/napi/view/query/node_info', { nodeId }],
    ['/space/napi/view/query/node_info', { pageId: nodeId }],
    ['/space/napi/view/query/node_info', { id: nodeId }],
    ['/api/view/query/pagechunk', { spaceId: nodeId, pageId: nodeId, limit: 200, chunkNumber: 0, chunked: 1 }],
  ];
  for (const [p, b] of tests) {
    try {
      const r = await call(p, b);
      console.log('\n### POST ' + p + ' ' + JSON.stringify(b));
      console.log('status=' + r.status + ' ct=' + r.ct + ' len=' + r.len);
      console.log(r.body);
    } catch (e) { console.log('\n### POST ' + p + ' ERROR ' + e.message); }
  }
})();
