import { cp, lstat, mkdir, readFile, readdir, unlink, writeFile } from 'node:fs/promises';
import { resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = resolve(root, '_site');

// Nur den fest zugeordneten Ausgabeordner innerhalb dieses Projekts leeren.
if (relative(root, output) !== '_site') {
  throw new Error('Ungültiger Ausgabeordner.');
}
const previousOutput = await lstat(output).catch(error => {
  if (error.code !== 'ENOENT') throw error;
  return null;
});
if (previousOutput?.isSymbolicLink()) {
  throw new Error('Der Ausgabeordner darf keine Verknüpfung sein.');
}

const entries = await readdir(root, { withFileTypes: true });
const websiteFiles = entries
  .filter(entry => entry.isFile() && /\.(html|css)$/i.test(entry.name))
  .map(entry => entry.name)
  .sort();

if (!websiteFiles.includes('index.html') || !websiteFiles.includes('styles.css')) {
  throw new Error('Die Startseite oder die gemeinsame CSS-Datei fehlt.');
}

// Verweise auf Dateien vor der Veröffentlichung kontrollieren.
let checkedReferences = 0;
for (const file of websiteFiles.filter(name => name.endsWith('.html'))) {
  const html = await readFile(resolve(root, file), 'utf8');
  for (const match of html.matchAll(/\b(?:href|src)\s*=\s*["']([^"']+)["']/gi)) {
    const reference = match[1];
    if (!reference || reference.startsWith('#') || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(reference)) continue;
    const pathname = decodeURIComponent(reference.split(/[?#]/)[0]);
    if (pathname.startsWith('/')) {
      throw new Error(`${file}: Bitte projektbezogene relative Links verwenden: ${reference}`);
    }
    const destination = resolve(root, pathname);
    const localPath = relative(root, destination);
    if (localPath.startsWith('..') || !localPath) {
      throw new Error(`${file}: Link liegt außerhalb der Website: ${reference}`);
    }
    const isPublished = websiteFiles.includes(localPath) || /^assets[\\/]/.test(localPath);
    if (!isPublished) {
      throw new Error(`${file}: Verweis auf eine nicht veröffentlichte Datei: ${reference}`);
    }
    const target = await lstat(destination).catch(() => null);
    if (!target || !target.isFile()) {
      throw new Error(`${file}: Verknüpfte Datei fehlt: ${reference}`);
    }
    checkedReferences++;
  }
}

await mkdir(output, { recursive: true });
// OneDrive kann das Löschen des Ausgabeordners selbst sperren. Daher nur
// die alten Dateien entfernen und die leeren Verzeichnisse beibehalten.
async function clearOutputFiles(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = resolve(directory, entry.name);
    const outputPath = relative(output, target);
    if (!outputPath || outputPath.startsWith('..')) {
      throw new Error('Ungültiger Pfad beim Leeren der Ausgabe.');
    }
    if (entry.isDirectory()) await clearOutputFiles(target);
    else await unlink(target);
  }
}
await clearOutputFiles(output);
for (const file of websiteFiles) {
  await cp(resolve(root, file), resolve(output, file));
}

// Künftige Bilder oder andere Medien können im Ordner assets liegen.
const assets = resolve(root, 'assets');
const assetsInfo = await lstat(assets).catch(error => {
  if (error.code !== 'ENOENT') throw error;
  return null;
});
if (assetsInfo) {
  if (!assetsInfo.isDirectory() || assetsInfo.isSymbolicLink()) {
    throw new Error('assets muss ein regulärer Ordner sein.');
  }
  await cp(assets, resolve(output, 'assets'), { recursive: true });
}
await writeFile(resolve(output, '.nojekyll'), '');
console.log(`${websiteFiles.length} Website-Dateien zusammengestellt; ${checkedReferences} lokale Dateiverweise geprüft.`);
console.log('Ausgabe: _site. Abgabedokumentation und Entwicklungsdateien werden nicht veröffentlicht.');
