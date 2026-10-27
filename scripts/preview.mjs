import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const pages = new Set([
  'index.html', 'schule.html', 'klassen.html', 'eltern.html',
  'aktuelles.html', 'kontakt.html', 'styles.css',
]);
const port = Number(process.env.PORT || 4173);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error('PORT muss eine ganze Zahl zwischen 1 und 65535 sein.');
  process.exit(1);
}

const server = createServer(async (request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' });
    response.end();
    return;
  }

  const pathname = new URL(request.url, 'http://127.0.0.1').pathname;
  const name = pathname === '/' ? 'index.html' : pathname.slice(1);

  if (name === 'favicon.ico') {
    response.writeHead(204);
    response.end();
    return;
  }

  if (!pages.has(name)) {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Seite nicht gefunden.');
    return;
  }

  try {
    const content = await readFile(new URL(name, root));
    response.writeHead(200, {
      'Content-Type': name.endsWith('.css') ? 'text/css; charset=utf-8' : 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
    });
    response.end(request.method === 'HEAD' ? undefined : content);
  } catch {
    response.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('Die Datei konnte nicht geladen werden.');
  }
});

server.on('error', (error) => {
  console.error(error.code === 'EADDRINUSE'
    ? `Port ${port} ist bereits belegt. Eine andere Portnummer kann über PORT gewählt werden.`
    : error.message);
  process.exit(1);
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Volksschule Kaplanhof: http://127.0.0.1:${port}`);
  console.log(`Projektordner: ${fileURLToPath(root)}`);
  console.log('Lokale Vorschau beenden: Strg+C');
});

process.on('SIGINT', () => server.close());
process.on('SIGTERM', () => server.close());
