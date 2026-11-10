// After deploying the key file:
//   node scripts/indexnow.mjs https://waytosantiagoguide.com/en/ https://waytosantiagoguide.com/pt/
//   npm run build && node scripts/indexnow.mjs --sitemap
// HTTP 200/202 means accepted by IndexNow, not indexed by a search engine.
import { readFile } from 'node:fs/promises';

const host = 'waytosantiagoguide.com';
const key = 'b9aa1a86efc11c496442ef74a2c40dcb';
const keyLocation = `https://${host}/${key}.txt`;
const decodeXml = value => value.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'");

try {
  const args = process.argv.slice(2);
  if (!args.length || (args.some(a => a.startsWith('--')) && !(args.length === 1 && args[0] === '--sitemap'))) {
    throw new Error('Usage: node scripts/indexnow.mjs URL [URL ...] OR --sitemap');
  }
  const rawUrls = args[0] === '--sitemap'
    ? [...(await readFile(new URL('../dist/sitemap-0.xml', import.meta.url), 'utf8')).matchAll(/<loc>\s*([^<]+)\s*<\/loc>/g)].map(m => decodeXml(m[1].trim()))
    : args;
  const urlList = [...new Set(rawUrls.map(value => {
    const url = new URL(value);
    if (url.hostname !== host || !['https:', 'http:'].includes(url.protocol) || url.port || url.username || url.password) {
      throw new Error(`URL must belong to ${host}: ${value}`);
    }
    url.hash = '';
    return url.href;
  }))];
  if (!urlList.length || urlList.length > 10000) throw new Error('Provide between 1 and 10,000 distinct URLs.');

  let verification;
  try {
    verification = await fetch(keyLocation, { signal: AbortSignal.timeout(15000), redirect: 'error' });
    if (!verification.ok || (await verification.text()) !== key) throw new Error(`HTTP ${verification.status} or incorrect file contents`);
  } catch (error) {
    throw new Error(`Public key verification failed at ${keyLocation}: ${error.message}. Deploy the key file before submitting. No POST sent.`);
  }
  const response = await fetch('https://api.indexnow.org/IndexNow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ host, key, keyLocation, urlList }),
    signal: AbortSignal.timeout(15000),
    redirect: 'error',
  });
  const accepted = response.status === 200 || response.status === 202;
  console.log(`HTTP ${response.status}: ${accepted ? 'accepted; acceptance does not mean indexing' : 'not accepted'} (${urlList.length} URLs).`);
  if (!accepted) process.exitCode = 1;
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
