const fs = require('fs')
const process = require('process');

function moveFile(oldPath, newPath) {
  fs.rename(oldPath, newPath, function (err) {
    console.error(err);
  });
}

try {
  process.chdir('./dist');
  fs.mkdirSync('archive-engine');
  moveFile('index.html', './archive-engine/index.html');
  moveFile('assets', './archive-engine/assets');
  moveFile('home.html', 'index.html');
} catch (error) {
  console.error(error);
}
