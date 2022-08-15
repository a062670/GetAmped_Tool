const fs = require('fs');

const currPath = './dist/electron/GetAmpedTool-win32-ia32';
const newPath = './dist/electron/GetAmpedTool-win32-ia32';

fs.rename(currPath, newPath, function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Successfully renamed the directory.');
  }
});
