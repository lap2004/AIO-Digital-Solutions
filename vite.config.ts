import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
// @ts-expect-error - plain ESM helper, no types needed
import { scanData } from './scripts/data-scanner.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(ROOT, 'data');
const MANIFEST = path.join(ROOT, 'src', 'data', 'generated', 'image-manifest.json');
const MIME: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
};

/**
 * Generates the product manifest from ./data, serves the real images at
 * /data-assets/* during dev, and copies ./data into dist/data-assets on build.
 * This is how the catalog is driven by REAL data in E:\Camanh\data.
 */
function aioDataPlugin(): Plugin {
  function writeManifest() {
    const manifest = scanData(ROOT);
    fs.mkdirSync(path.dirname(MANIFEST), { recursive: true });
    fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
    // eslint-disable-next-line no-console
    console.log(`\n[aio-data] Catalog built from ./data — ${manifest.count} products.\n`);
  }

  return {
    name: 'aio-data-plugin',
    buildStart() {
      writeManifest();
    },
    configureServer(server) {
      writeManifest();
      // Serve the original images in place, no copying.
      server.middlewares.use('/data-assets', (req, res, next) => {
        try {
          const url = decodeURI((req.url ?? '').split('?')[0]);
          const rel = url.split('/').map(decodeURIComponent).join('/');
          const filePath = path.join(DATA_DIR, rel);
          if (!filePath.startsWith(DATA_DIR) || !fs.existsSync(filePath)) return next();
          const ext = path.extname(filePath).toLowerCase();
          res.setHeader('Content-Type', MIME[ext] ?? 'application/octet-stream');
          res.setHeader('Cache-Control', 'public, max-age=86400');
          fs.createReadStream(filePath).pipe(res);
        } catch {
          next();
        }
      });
      // Watch the data folder and regenerate on change.
      server.watcher.add(DATA_DIR);
      server.watcher.on('add', (p) => p.startsWith(DATA_DIR) && writeManifest());
      server.watcher.on('unlink', (p) => p.startsWith(DATA_DIR) && writeManifest());
    },
    closeBundle() {
      // Copy real images into the build output so production serves them too.
      const outDir = path.join(ROOT, 'dist', 'data-assets');
      if (!fs.existsSync(DATA_DIR)) return;
      fs.cpSync(DATA_DIR, outDir, { recursive: true });
      // eslint-disable-next-line no-console
      console.log('[aio-data] Copied ./data → dist/data-assets');
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [aioDataPlugin(), react()],
  resolve: {
    alias: {
      '@': path.resolve(ROOT, './src'),
    },
  },
  server: {
    port: 5173,
    open: true,
    fs: { allow: [ROOT] },
  },
  build: {
    target: 'es2020',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          charts: ['recharts'],
          motion: ['framer-motion'],
          table: ['@tanstack/react-table'],
        },
      },
    },
  },
});
