const path = require('path');
const fs = require('fs-extra');
const OUT_PATH = 'mpa';
const templateStr = fs.readFileSync(path.join(__dirname, 'template/iframe.ejs'), 'utf8');

// 替换 ejs 模版格式的字符串，如 <%= title %>: templateStr.replaceEJS("title","replaced title");
String.prototype.replaceEJS = function (regStr, replaceStr) {
  return this.replace(new RegExp(`<%=\\s*${regStr}\\s*%>`, 'g'), replaceStr);
};

// clear mpa
fs.emptyDirSync(path.resolve(__dirname, OUT_PATH));

// create mpa
const demoList = fs
  .readdirSync(path.join(__dirname, '../'))
  .filter((name) => name !== '.dev')
  .map((name) => {
    const content = fs.readFileSync(path.join(__dirname, '../', name), 'utf8');
    const title = /@title\s+(.+)\b/.exec(content)[1];
    const category = /@category\s+(.+)\b/.exec(content)[1];
    return {
      title,
      category,
      file: name.split('.ts')[0],
    };
  });

demoList.forEach(({ title, file }) => {
  const ejs = templateStr.replaceEJS('title', title).replaceEJS('url', `./${file}.ts`);

  fs.outputFileSync(path.resolve(__dirname, OUT_PATH, file + '.ts'), `import "../../${file}"`);
  fs.outputFileSync(path.resolve(__dirname, OUT_PATH, file + '.html'), ejs);
});

// output demolist
const demoSorted = {};
demoList.forEach(({ title, category, file }) => {
  if (!demoSorted[category]) {
    demoSorted[category] = [];
  }
  demoSorted[category].push({
    src: file,
    label: title,
  });
});

fs.outputJSONSync(path.join(__dirname, OUT_PATH, '.demoList.json'), demoSorted);

module.exports = {
  server: {
    open: true,
    host: "0.0.0.0",
    port: 3000
  },
  optimizeDeps: {
    exclude: ['oasis-engine'],
  },
};
