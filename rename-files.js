const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, 'src', 'assests');

// Get all files in the assets directory
fs.readdir(assetsDir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach(file => {
    // Only process files with spaces in the name
    if (file.includes(' ')) {
      const oldPath = path.join(assetsDir, file);
      const newName = file.replace(/\s+/g, '-').toLowerCase();
      const newPath = path.join(assetsDir, newName);
      
      // Rename the file
      fs.rename(oldPath, newPath, err => {
        if (err) {
          console.error(`Error renaming ${file}:`, err);
        } else {
          console.log(`Renamed: ${file} -> ${newName}`);
        }
      });
    }
  });
});
