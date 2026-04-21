const sharp = require('sharp');
const fs = require('fs');

const images = [
  { src: 'assets/dna-image.png',               out: 'assets/cost-baby' },
  { src: 'assets/couple-after-birth.png',      out: 'assets/cost-couple' },
  { src: 'assets/mother-kids-bed.png',         out: 'assets/cost-family' },
  { src: 'assets/future-pregnancy-shadow.png', out: 'assets/cost-future' },
];

(async () => {
  for (const img of images) {
    await sharp(img.src).resize({ width: 800, withoutEnlargement: true }).webp({ quality: 78 }).toFile(`${img.out}.webp`);
    await sharp(img.src).resize({ width: 800, withoutEnlargement: true }).jpeg({ quality: 82, mozjpeg: true }).toFile(`${img.out}.jpg`);
    console.log(`✓ ${img.out}.webp (${Math.round(fs.statSync(`${img.out}.webp`).size/1024)} KB) / .jpg (${Math.round(fs.statSync(`${img.out}.jpg`).size/1024)} KB)`);
  }
  // Remove huge originals to save repo space
  for (const img of images) { fs.unlinkSync(img.src); console.log(`✗ removed ${img.src}`); }
})();
