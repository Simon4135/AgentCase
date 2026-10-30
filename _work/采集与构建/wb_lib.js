
// WorkBuddy 解决方案库 下载器
const fs = require('fs');
const path = require('path');

const STATIC = 'https://workbuddy-space-static.codebuddy.work';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

async function fetchBin(url, referer) {
  const r = await fetch(url, { headers: { 'User-Agent': UA, ...(referer ? { Referer: referer } : {}) } });
  if (!r.ok) return { ok: false, status: r.status, url };
  const buf = Buffer.from(await r.arrayBuffer());
  return { ok: true, status: r.status, buf, url, ctype: r.headers.get('content-type') };
}
async function fetchText(url, referer) {
  const r = await fetchBin(url, referer);
  return r.ok ? { ...r, text: r.buf.toString('utf8') } : r;
}

function stripComments(h) { return h.replace(/<!--[\s\S]*?-->/g, ''); }
function decode(s) {
  return s.replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&#x27;/gi, "'")
    .replace(/&amp;/g, '&').replace(/&#(\d+);/g, (m, d) => String.fromCodePoint(+d));
}
function text(s) { return decode(stripComments(s).replace(/<[^>]+>/g, '')).replace(/\r/g, '').trim(); }
function safeName(s) { return s.replace(/[\\/:*?"<>|\r\n\t]/g, '_').replace(/\s+/g, ' ').trim().slice(0, 80); }

module.exports = { STATIC, UA, fetchBin, fetchText, stripComments, decode, text, safeName };
