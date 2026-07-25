// Downloads every image referenced by the frozen dataset (scripts/image-manifest.json)
// into public/img/frozen/**, so the portfolio site is fully self-contained once the
// CDN is gone. Safe to re-run: existing non-empty files are skipped.
//
// Run:  node scripts/mirror-images.mjs
import { readFileSync, mkdirSync, existsSync, statSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const manifest = JSON.parse(readFileSync(join(ROOT, 'scripts', 'image-manifest.json'), 'utf-8'))

const CONCURRENCY = 12
const MAX_RETRIES = 4

async function fetchWithRetry(url) {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetch(url, { redirect: 'follow' })
      if (res.status === 404) return { status: 404 }
      if (!res.ok) throw new Error('HTTP ' + res.status)
      const buf = Buffer.from(await res.arrayBuffer())
      if (buf.length === 0) throw new Error('empty body')
      return { status: 200, buf }
    } catch (e) {
      if (attempt === MAX_RETRIES) return { status: 'ERR', error: String(e) }
      await new Promise((r) => setTimeout(r, 300 * attempt))
    }
  }
}

let ok = 0, skipped = 0, missing = 0, failed = 0
const problems = []

async function worker(items) {
  for (const { url, local } of items) {
    const dest = join(ROOT, local)
    if (existsSync(dest) && statSync(dest).size > 0) { skipped++; continue }
    mkdirSync(dirname(dest), { recursive: true })
    const r = await fetchWithRetry(url)
    if (r.status === 200) { writeFileSync(dest, r.buf); ok++ }
    else if (r.status === 404) { missing++; problems.push('404  ' + url) }
    else { failed++; problems.push('FAIL ' + url + '  ' + r.error) }
  }
}

const chunks = Array.from({ length: CONCURRENCY }, () => [])
manifest.forEach((m, i) => chunks[i % CONCURRENCY].push(m))
await Promise.all(chunks.map(worker))

console.log(`downloaded=${ok} skipped=${skipped} missing(404)=${missing} failed=${failed} total=${manifest.length}`)
if (problems.length) {
  writeFileSync(join(ROOT, 'scripts', 'image-problems.txt'), problems.join('\n'))
  console.log('problem URLs written to scripts/image-problems.txt (first 10):')
  console.log(problems.slice(0, 10).join('\n'))
}
