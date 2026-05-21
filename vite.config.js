import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

// Recursively find all HTML files
function findHtmlFiles(dir, files = {}, base = '') {
  const items = readdirSync(dir);
  for (const item of items) {
    const fullPath = join(dir, item);
    const relativePath = base ? `${base}/${item}` : item;
    if (statSync(fullPath).isDirectory() && !item.startsWith('.') && item !== 'node_modules' && item !== 'dist' && item !== 'vite-project') {
      findHtmlFiles(fullPath, files, relativePath);
    } else if (item.endsWith('.html')) {
      const name = relativePath.replace(/\//g, '-').replace('.html', '') || 'main';
      files[name] = fullPath;
    }
  }
  return files;
}

const htmlFiles = findHtmlFiles(__dirname);

export default defineConfig({
  base: '/',

  build: {
    outDir: 'dist',
    rollupOptions: {
      input: htmlFiles,
    },
  },

  server: {
    port: 3000,
    open: true,
  },

  preview: {
    port: 4173,
  },

  ssr: {
    external: ['three'],
  },
});
