// Usage: npm run build && node scripts/check-inbound.mjs [--json]
// Body links: <main>, excluding nav/header/footer and breadcrumb containers.
import { readFile, stat } from 'node:fs/promises';
import { resolve, join, sep } from 'node:path';
const root = resolve('dist');
const host = 'waytosantiagoguide.com';
const decode = s => s.replace(/&(?:amp|quot|apos|lt|gt);|&#(x[\da-f]+|\d+);/gi, (m, n) => n ? String.fromCodePoint(n[0].toLowerCase() === 'x' ? parseInt(n.slice(1),16) : Number(n)) : ({'&amp;':'&','&quot;':'"','&apos;':"'",'&lt;':'<','&gt;':'>'}[m] ?? m));
const normal = p => p.replace(/\/+$/, '') || '/';
const xml = await readFile(join(root, 'sitemap-0.xml'), 'utf8');
const pages = [...new Set([...xml.matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)].map(m => normal(new URL(decode(m[1].trim())).pathname)))];
const inbound = new Map(pages.map(p => [p, new Set()]));
const broken = [], redirected = [];
const voids = new Set('area base br col embed hr img input link meta param source track wbr'.split(' '));
async function exists(path) {
  const file = resolve(root, '.' + decodeURIComponent(path));
  if (file !== root && !file.startsWith(root + sep)) return false;
  for (const p of [file, join(file, 'index.html')]) { try { if ((await stat(p)).isFile()) return true; } catch {} }
  return false;
}
for (const source of pages) {
  const html = await readFile(join(root, source, 'index.html'), 'utf8');
  const stack = [];
  for (const token of html.matchAll(/<!--[\s\S]*?-->|<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>|<\/?[a-z][^>]*>/gi)) {
    const tag = token[0];
    if (tag.startsWith('<!--') || /^<(script|style)\b/i.test(tag)) continue;
    const name = /^<\/?([\w-]+)/.exec(tag)[1].toLowerCase();
    if (tag.startsWith('</')) { const i = stack.findLastIndex(x => x.name === name); if(i >= 0) stack.length = i; continue; }
    const attrs = Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)].map(m => [m[1].toLowerCase(), decode(m[2] ?? m[3] ?? m[4])]));
    const excluded = ['nav','header','footer'].includes(name) || /breadcrumb/i.test([attrs.class, attrs.id, attrs['aria-label'], attrs.itemtype].join(' '));
    if(name === 'a' && attrs.href) {
      let url; try { url = new URL(attrs.href, `https://${host}${source}/`); } catch { broken.push({source, href:attrs.href}); continue; }
      if(!['https:','http:'].includes(url.protocol) || url.hostname !== host) continue;
      const target = normal(url.pathname);
      if(/\/best-albergues(?:\/|$)/.test(target)) redirected.push({source, href:attrs.href});
      if(!(await exists(target))) broken.push({source, href:attrs.href});
      if(target !== source && stack.some(x => x.name === 'main') && !stack.some(x => x.excluded) && !excluded) inbound.get(target)?.add(source);
    }
    if(!voids.has(name) && !tag.endsWith('/>')) stack.push({name, excluded});
  }
}
const counts = Object.fromEntries([...inbound].map(([p,s]) => [p,s.size]));
if(process.argv.includes('--json')) console.log(JSON.stringify({counts,broken,redirected}, null, 2));
else {
  console.table(Object.entries(counts).filter(([,n]) => n < 6).map(([page,origins]) => ({page,origins})));
  for(const x of broken) console.log('BROKEN', x.source, '->', x.href);
  for(const x of redirected) console.log('BEST-ALBERGUES', x.source, '->', x.href);
  console.log(`${pages.length} sitemap pages; ${broken.length} broken links; ${redirected.length} links to /best-albergues/.`);
}
if(broken.length || redirected.length) process.exitCode = 1;
