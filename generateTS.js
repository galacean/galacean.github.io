const glob = require('glob');
const fsExtra = require('fs-extra');
const path = require('path');
const fs = require('fs');


glob('../../oasis/engine/packages/**/src/index.ts', {realpath: true}, function(er, files) {
  var re = new RegExp(/([^test]+).ts/);

  var tsFiles = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    var res = re.exec(file);
    console.log('file', file)

    if (!res) continue;

    tsFiles.push(`"${file}"`);
  }

  fs.writeFile('./tsfiles.js', `module.exports = [${tsFiles.join(',')}];`, function(err) {});
});