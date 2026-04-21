const sharp = require('sharp');
const fs = require('fs');
const src = 'assets/hero-woman.png';
(async () => {
  const img = sharp(src);
  const meta = await img.metadata();
  console.log(`Source: ${meta.width}x${meta.height}`);
  const cropW = meta.width - 60;
  const cropH = meta.height - 60;
  await sharp(src)
    .extract({ left: 0, top: 0, width: cropW, height: cropH })
    .resize({ width: 1400, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile('assets/hero-woman.webp');
  await sharp(src)
    .extract({ left: 0, top: 0, width: cropW, height: cropH })
    .resize({ width: 1400, withoutEnlargement: true })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile('assets/hero-woman.jpg');
  console.log('webp:', Math.round(fs.statSync('assets/hero-woman.webp').size / 1024) + ' KB');
  console.log('jpg:', Math.round(fs.statSync('assets/hero-woman.jpg').size / 1024) + ' KB');
})();
