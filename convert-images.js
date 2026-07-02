const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Recursively get all files in a directory
function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });

  return arrayOfFiles;
}

const publicDir = path.join(__dirname, 'public');

try {
  const allFiles = getAllFiles(publicDir);
  const imageExtensions = ['.png', '.jpg', '.jpeg'];

  let processedCount = 0;

  allFiles.forEach(file => {
    const ext = path.extname(file).toLowerCase();
    
    if (imageExtensions.includes(ext)) {
      const dir = path.dirname(file);
      const baseName = path.basename(file, ext);
      const newFilePath = path.join(dir, `${baseName}.webp`);
      
      sharp(file)
        .webp({ quality: 80 })
        .toFile(newFilePath)
        .then(() => {
          console.log(`Converted: ${path.basename(file)} -> ${baseName}.webp`);
          // Eliminar el archivo original
          fs.unlinkSync(file);
        })
        .catch(err => {
          console.error(`Error converting ${file}: `, err);
        });
      
      processedCount++;
    }
  });

  if (processedCount === 0) {
    console.log('No se encontraron imágenes (.png, .jpg, .jpeg) para convertir en la carpeta public.');
  } else {
    console.log(`Iniciando conversión de ${processedCount} imágenes...`);
  }

} catch (err) {
  console.error("Error al leer los directorios: ", err);
}
