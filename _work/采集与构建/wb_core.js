// -*- coding: utf-8 -*-
// WorkBuddy 解决方案库 — 解析核心
const fs = require('fs');
const path = require('path');
const STATIC = 'https://workbuddy-space-static.codebuddy.work';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
async function get(url, referer, tries = 3) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url, { headers: Object.assign({ 'User-Agent': UA }, referer ? { Referer: referer } : {}) });
      if (r.status === 404) return { ok: false, status: 404, url };
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const buf = Buffer.from(await r.arrayBuffer());
      return { ok: true, status: r.status, buf: buf, url: url, ctype: r.headers.get('content-type') || '' };
    } catch (e) { if (i === tries - 1) return { ok: false, status: 0, url: url, err: String(e.message || e) }; await new Promise(s => setTimeout(s, 400 * (i + 1))); }
  }
}
async function getText(u, ref) { const r = await get(u, ref); if (r.ok) { r.text = r.buf.toString('utf8'); } return r; }
const stripComments = h => h.replace(/<!--[\s\S]*?-->/g, '');
const decode = s => s.replace(/&nbsp;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&#x27;/gi, "'").replace(/&amp;/g, '&').replace(/&#(\d+);/g, (m, d) => { try { return String.fromCodePoint(+d); } catch (e) { return m; } });
const plain = s => decode(stripComments(String(s).replace(/<br\s*\/?>/gi, '\n').replace(/<\/(p|div|li|h[1-6]|tr|article|section)>/gi, '\n').replace(/<\/?[a-zA-Z][^>]*>/g, ''))).replace(/\r/g, '').replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
const safe = (s, n) => String(s).replace(/[\\/:*?"<>|\r\n\t]/g, '_').replace(/\s+/g, ' ').trim().slice(0, n || 80);
function parseTasks(html) {
  const out = { title: '', lead: '', skillPrompt: '', tasks: [], intro: [] };
  let m = /<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(html); if (m) out.title = plain(m[1]);
  m = /<p[^>]*class="lead"[^>]*>([\s\S]*?)<\/p>/i.exec(html); if (m) out.lead = plain(m[1]);
  m = /<div[^>]*id="wbSkillPrompt"[^>]*>([\s\S]*?)<\/div>/i.exec(html);
  if (m) out.skillPrompt = plain(m[1]).replace(/\n?复制\s*$/, '').trim();
  const re = /<article[^>]*class="task"[^>]*>([\s\S]*?)<\/article>/gi;
  while ((m = re.exec(html))) {
    const b = m[1];
    const no = /<span[^>]*class="no"[^>]*>([\s\S]*?)<\/span>/i.exec(b);
    const ttl = /<h3[^>]*class="ttl"[^>]*>([\s\S]*?)<\/h3>/i.exec(b);
    const star = /<span[^>]*class="star"[^>]*>([\s\S]*?)<\/span>/i.exec(b);
    const tp = /<p[^>]*class="tp"[^>]*>([\s\S]*?)<\/p>/i.exec(b);
    out.tasks.push({ no: no ? plain(no[1]) : String(out.tasks.length + 1).padStart(2, '0'), ttl: ttl ? plain(ttl[1]) : '', star: star ? plain(star[1]) : '', prompt: tp ? plain(tp[1]) : '' });
  }
  const blk = /<h2[^>]*class="h"[^>]*>([\s\S]*?)<\/h2>\s*(?:<p[^>]*class="subline"[^>]*>([\s\S]*?)<\/p>)?/gi;
  while ((m = blk.exec(html))) out.intro.push({ h: plain(m[1]), sub: m[2] ? plain(m[2]) : '' });
  return out;
}
function parseIntro(html) {
  // 「场景引入」页的真实结构：<section class="blk"><h2 class="h"><span class="num">一</span>标题</h2>
  //   <p class="subline">副标题</p> … 正文 … 可再嵌套若干 <h2 class="h">
  // （旧版曾按 h2.sec-title 解析，与实际页面不符，会导致正文整段丢失。）
  const o = { title: '', lead: '', sections: [] };
  let m = /<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(html); if (m) o.title = plain(m[1]);
  m = /<p[^>]*class="lead"[^>]*>([\s\S]*?)<\/p>/i.exec(html); if (m) o.lead = plain(m[1]);
  const heads = [...html.matchAll(/<h2[^>]*class="h(?:\s[^"]*)?"[^>]*>([\s\S]*?)<\/h2>/gi)];
  for (let i = 0; i < heads.length; i++) {
    const H = heads[i];
    // 标题里带 <span class="num">一</span>，取出序号并去掉，避免「一一、」这种重复编号
    const num = /<span[^>]*class="num"[^>]*>([\s\S]*?)<\/span>/i.exec(H[1]);
    const label = plain(H[1].replace(/<span[^>]*class="num"[^>]*>[\s\S]*?<\/span>/i, ''));
    const from = H.index + H[0].length;
    const to = (i + 1 < heads.length) ? heads[i + 1].index : html.length;
    let body = html.slice(from, to);
    const sm = /<p[^>]*class="subline"[^>]*>([\s\S]*?)<\/p>/i.exec(body);
    const sub = sm ? plain(sm[1]) : '';
    if (sm) body = body.slice(0, sm.index) + body.slice(sm.index + sm[0].length);
    body = plain(body).slice(0, 6000);
    if (!label && !body) continue;
    o.sections.push({ h: (num ? plain(num[1]) + '、' : '') + label, sub: sub, body: body });
  }
  return o;
}
function localRefs(html) {
  const refs = new Set();
  const re = /(?:href|src)="([^"#?]+)"/g;
  let m;
  while ((m = re.exec(html))) {
    const u = m[1];
    if (/^(https?:|mailto:|tel:|data:|javascript:|\/\/)/i.test(u)) continue;
    if (u.charAt(0) === '/') continue;
    refs.add(u);
  }
  return Array.from(refs);
}
module.exports = { STATIC: STATIC, UA: UA, get: get, getText: getText, stripComments: stripComments, decode: decode, plain: plain, safe: safe, parseTasks: parseTasks, parseIntro: parseIntro, localRefs: localRefs };