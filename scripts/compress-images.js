/**
 * One-shot image compression for portfolio assets.
 * Resizes oversized originals and emits both .webp and re-encoded .jpg
 * into img/optimized/. Originals in img/ stay untouched as the canonical source.
 *
 * Run: node scripts/compress-images.js
 */
import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'img', 'optimized');

// Display dimensions (2x for retina) per image
const targets = [
  { src: 'img/crm.jpg',             width: 800, height: 400, fit: 'cover' },
  { src: 'img/traffic-signs.jpg',   width: 800, height: 400, fit: 'cover' },
  { src: 'img/EKG.jpg',             width: 800, height: 400, fit: 'cover' },
  { src: 'img/manufactureDBMS.jpg', width: 800, height: 400, fit: 'cover' },
  { src: 'img/avatar.jpg',          width: 576, height: 576, fit: 'cover' },
];

const fmt = (bytes) => (bytes / 1024).toFixed(1) + ' KB';

async function compressOne({ src, width, height, fit }) {
  const srcAbs = path.join(root, src);
  const base = path.basename(src, path.extname(src));
  const webpOut = path.join(outDir, `${base}.webp`);
  const jpgOut  = path.join(outDir, `${base}.jpg`);

  const srcBytes = (await fs.stat(srcAbs)).size;

  const pipeline = sharp(srcAbs).resize({ width, height, fit, position: 'attention' });

  await pipeline.clone().webp({ quality: 80, effort: 5 }).toFile(webpOut);
  await pipeline.clone().jpeg({ quality: 82, mozjpeg: true }).toFile(jpgOut);

  const webpBytes = (await fs.stat(webpOut)).size;
  const jpgBytes  = (await fs.stat(jpgOut)).size;

  return { src, srcBytes, webpBytes, jpgBytes };
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });

  let total = { src: 0, webp: 0, jpg: 0 };
  console.log(`\nCompressing ${targets.length} images → img/optimized/\n`);
  console.log('  source                            original →   webp |   jpg');
  console.log('  ' + '-'.repeat(72));

  for (const t of targets) {
    const r = await compressOne(t);
    total.src  += r.srcBytes;
    total.webp += r.webpBytes;
    total.jpg  += r.jpgBytes;
    console.log(
      `  ${r.src.padEnd(34)}${fmt(r.srcBytes).padStart(9)} → ${fmt(r.webpBytes).padStart(7)} | ${fmt(r.jpgBytes).padStart(7)}`
    );
  }

  console.log('  ' + '-'.repeat(72));
  console.log(`  TOTAL${' '.repeat(33)}${fmt(total.src).padStart(9)} → ${fmt(total.webp).padStart(7)} | ${fmt(total.jpg).padStart(7)}`);
  const savedWebp = (1 - total.webp / total.src) * 100;
  console.log(`\n  WebP savings: ${savedWebp.toFixed(1)}%\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
