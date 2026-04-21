const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const src = 'C:/Users/Maya/OneDrive/Pictures/תמונה של מאיה.png';

const destinations = [
  { file: 'C:/Users/Maya/projects/landing-pages/birth-growth/assets/maya-portrait.png', size: 600 },
  { file: 'C:/Users/Maya/projects/landing-pages/oto-from-birth/assets/maya-portrait.png', size: 600 },
  { file: 'C:/Users/Maya/projects/landing-pages/דף-נחיתה-למדריך-חינמי/images/maya-portrait.jpg', size: 800, format: 'jpg' },
  { file: 'C:/Users/Maya/projects/bonding-corporate-site/src/assets/maya-portrait.png', size: 900 },
];

(async () => {
  const meta = await sharp(src).metadata();
  console.log(`Source: ${meta.width}x${meta.height} (${Math.round(fs.statSync(src).size/1024)} KB)`);

  for (const d of destinations) {
    let pipeline = sharp(src).resize({ width: d.size, height: d.size, fit: 'inside', withoutEnlargement: true });
    if (d.format === 'jpg' || d.file.endsWith('.jpg')) {
      pipeline = pipeline.jpeg({ quality: 88, mozjpeg: true });
    } else {
      pipeline = pipeline.png({ quality: 90, compressionLevel: 9 });
    }
    await pipeline.toFile(d.file);
    console.log(`✓ ${d.file} (${Math.round(fs.statSync(d.file).size/1024)} KB)`);
  }
})();
