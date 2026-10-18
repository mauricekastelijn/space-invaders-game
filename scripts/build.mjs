import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const source = path.join(root, 'dist');
const output = path.join(root, '_site');
const required = ['index.html', 'style.css', 'game.js', 'engine.js', 'icon.svg',
  'vendor/three.module.js', 'vendor/three.core.js', 'vendor/THREE-LICENSE.txt'];
// Fail before publishing an incomplete release.
for (const file of required) {
  const content = await readFile(path.join(source, file));
  if (!content.length) throw new Error(`Empty release asset: ${file}`);
}
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(source, output, { recursive: true });
await writeFile(path.join(output, '.nojekyll'), '');
console.log('Built standalone GitHub Pages release in _site/');
