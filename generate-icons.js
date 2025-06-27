const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sizes = {
  'mipmap-mdpi': 48,
  'mipmap-hdpi': 72,
  'mipmap-xhdpi': 96,
  'mipmap-xxhdpi': 144,
  'mipmap-xxxhdpi': 192
};

const sourceIcon = path.join(__dirname, 'assets', 'logo1.png');
const androidResPath = path.join(__dirname, 'android', 'app', 'src', 'main', 'res');

async function generateIcons() {
  for (const [dir, size] of Object.entries(sizes)) {
    const targetDir = path.join(androidResPath, dir);
    const targetPath = path.join(targetDir, 'ic_launcher.png');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Resize and save the icon
    await sharp(sourceIcon)
      .resize(size, size)
      .toFile(targetPath);
    
    console.log(`Generated ${size}x${size} icon in ${dir}`);
  }
}

generateIcons().catch(console.error); 