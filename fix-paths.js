const fs = require('fs');
const path = require('path');

const filesToFix = [
  path.join(__dirname, 'src/data/courses.ts'),
  'C:\\Users\\52762\\.gemini\\antigravity-ide\\brain\\d4842921-74eb-481c-97af-7f512995a286\\tidb_cloud_setup.sql'
];

filesToFix.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    // Replace all .png and .jpg with .webp
    content = content.replace(/\.png/g, '.webp').replace(/\.jpg/g, '.webp');
    fs.writeFileSync(file, content);
    console.log(`Updated paths in ${file}`);
  }
});
