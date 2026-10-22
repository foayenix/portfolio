// Build every diagram into public/diagrams/, and refuse to if a label does not
// fit the box it is in.
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { complaints } from './_kit.mjs'

const HERE = dirname(fileURLToPath(import.meta.url))
const OUT = join(HERE, '..', 'public', 'diagrams')
const NAMES = ['ybs', 'proper', 'quire', 'sanko', 'pank', 'dansville']

mkdirSync(OUT, { recursive: true })

for (const name of NAMES) {
  const { default: html } = await import(`./${name}.mjs`)
  writeFileSync(join(OUT, `${name}.html`), html)
  console.log('wrote', `public/diagrams/${name}.html`)
}

const bad = complaints()
if (bad.length > 0) {
  console.error(`\n${bad.length} label(s) do not fit:`)
  for (const line of bad) console.error('  ' + line)
  process.exit(1)
}
console.log('every label fits its box')
