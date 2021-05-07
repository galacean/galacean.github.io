const glob = require('glob');
const fsExtra = require('fs-extra');
const path = require('path');
const fs = require('fs');
const siteConfig = require('../../siteconfig.json')


glob(`${siteConfig.typedocSource}/packages/**/src/index.ts`, {realpath: true}, function(er, files) {
  var re = new RegExp(/([^test]+).ts/);

  var tsFiles = [];

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    var res = re.exec(file);
    console.log('[Typedoc entry file]:', file);

    if (!res) continue;

    tsFiles.push(`"${file}"`);
  }

  fs.writeFile('./scripts/typedoc/tsfiles.js', `module.exports = [${tsFiles.join(',')}];`, function(err) {});
});