const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const directoryPath = path.join(__dirname, 'public', 'images', 'courses');

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 

    files.forEach((file) => {
        if(file.endsWith('.png')){
            const filePath = path.join(directoryPath, file);
            const newFilePath = path.join(directoryPath, file.replace('.png', '.webp'));
            
            sharp(filePath)
                .webp({ quality: 80 })
                .toFile(newFilePath)
                .then(() => {
                    console.log('Converted: ' + file + ' -> ' + file.replace('.png', '.webp'));
                    // Eliminar el archivo .png original
                    fs.unlinkSync(filePath);
                })
                .catch(err => {
                    console.log('Error converting ' + file + ': ', err);
                });
        }
    });
});
