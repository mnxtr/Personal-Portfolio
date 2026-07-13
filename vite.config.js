import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

/**
 * Recursively find all HTML files for multi-page build
 * @param {string} dir - Directory to search
 * @param {Object} files - Accumulator for found files
 * @param {string} base - Base path for relative paths
 * @returns {Object} Object with filename: filepath mappings
 */
function findHtmlFiles(dir, files = {}, base = '') {
  const items = readdirSync(dir);

  for (const item of items) {
    const fullPath = join(dir, item);
    const relativePath = base ? `${base}/${item}` : item;
    const isDir = statSync(fullPath).isDirectory();
    const isExcludedDir = [
      '.',
      '..',
      'node_modules',
      'dist',
      'vite-project',
      'website',
      'scripts',
    ].includes(item);

    if (isDir && !isExcludedDir) {
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
    emptyOutDir: true,
    sourcemap: false,
    minify: true,
    rollupOptions: {
      input: htmlFiles,
      output: {
        manualChunks: {
          'three': ['three'],
        },
      },
    },
    reportCompressedSize: true,
    chunkSizeWarningLimit: 500,
  },

  server: {
    port: 3000,
    open: true,
    cors: true,
  },

  preview: {
    port: 4173,
  },

  ssr: {
    external: ['three'],
  },

  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV === 'development'),
  },
});
