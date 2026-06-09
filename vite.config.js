import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
// @ts-expect-error - plain ESM helper, no types needed
import { scanData } from './scripts/data-scanner.mjs';
const ROOT = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(ROOT, 'public', 'images', 'products');
const MANIFEST = path.join(ROOT, 'src', 'data', 'generated', 'image-manifest.json');
/**
 * Generates the product manifest from ./public/images/products.
 * Images are automatically served by Vite from the public directory.
 */
function aioDataPlugin() {
    function writeManifest() {
        const manifest = scanData(ROOT);
        fs.mkdirSync(path.dirname(MANIFEST), { recursive: true });
        fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2));
        // eslint-disable-next-line no-console
        console.log(`\n[aio-data] Catalog built from ./public/images/products — ${manifest.count} products.\n`);
    }
    return {
        name: 'aio-data-plugin',
        buildStart() {
            writeManifest();
        },
        configureServer(server) {
            writeManifest();
            // Watch the data folder and regenerate on change.
            server.watcher.add(DATA_DIR);
            server.watcher.on('add', (p) => p.startsWith(DATA_DIR) && writeManifest());
            server.watcher.on('unlink', (p) => p.startsWith(DATA_DIR) && writeManifest());
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
