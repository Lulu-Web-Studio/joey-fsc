import assert from 'node:assert/strict';

// Run against a built local server: node scripts/check-seo.mjs http://localhost:3000
const base = process.argv[2];
assert(base, 'Provide the URL of the running site');
const routes = [
  '/', '/service/tooth-extractions', '/service/dental-implants',
  '/service/wisdom-teeth-removal', '/service/facial-trauma',
  '/service/botox-and-filler', '/service/teeth-in-a-day',
  '/areas-we-serve/fairfield', '/areas-we-serve/milford/dental-implants',
  '/areas-we-serve/shelton/dental-implants', '/blog/what-to-eat-after-tooth-extraction',
];
const results = [];
for (const path of routes) {
  const response = await fetch(new URL(path, base), {headers: {'User-Agent': 'Twitterbot'}});
  assert.equal(response.status, 200, path);
  const html = await response.text();
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${path}: one H1`);
  assert.match(html, /<link rel="canonical" href="https?:\/\/[^\"]+"/, `${path}: canonical`);
  assert.doesNotMatch(html, /<meta name="robots" content="[^"]*noindex/, `${path}: indexable`);
  assert.match(html, /href="tel:2032617800"/, `${path}: phone link`);
  if (path === '/') assert.match(html, /<title>Oral Surgeons in Trumbull, CT \| Facial Surgery Center<\/title>/);
  if (path === '/service/teeth-in-a-day') {
    const description = html.match(/<meta name="description" content="([^"]*)"/)[1];
    assert.equal(description.length, 158, 'Preserve All-on-X description');
    assert.match(html, /href="\/blog\/implant-supported-dentures-vs-all-on-x"/);
  }
  if (path === '/blog/what-to-eat-after-tooth-extraction') assert.match(html, /href="\/service\/tooth-extractions"/);
  results.push(path);
}
const missing = await fetch(new URL('/service/seo-check-nonexistent', base), {headers: {'User-Agent': 'Twitterbot'}});
assert.equal(missing.status, 404, 'Unknown service must be a 404 for non-streaming crawlers');
assert.match(await missing.text(), /noindex/, 'Unknown service must be noindex');
const sitemap = await fetch(new URL('/sitemap.xml', base));
assert.equal(sitemap.status, 200);
assert.match(await sitemap.text(), /\/service\/tooth-extractions<\/loc>/);
console.log(`PASS: ${results.length} pages, unknown-service 404/noindex, and extraction sitemap entry.`);
