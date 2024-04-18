const fs = require('fs').promises;
const path = require('path');
const yaml = require('js-yaml');

const data = [];

const reg = /---\n([\s\S]*?)\n---/;

async function readMarkdownFiles(dir) {
  try {
    const files = await fs.readdir(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const fileStat = await fs.stat(filePath);
      if (fileStat.isFile() && /\.(md|markdown)$/i.test(path.extname(file))) {
        const content = await fs.readFile(filePath, 'utf8');
        const yamlContent = content.match(reg)[1];

        const { title, type, group } = yaml.load(yamlContent);
        data.push({
          file,
          title,
          directory: group ? `${type}-${group}` : type,
          content: content.replace(reg, '')
        })
      }
    }
  } catch (err) {
    console.error('Error reading directory:', err);
  }
}


async function main() {
  await readMarkdownFiles('docs');
  console.log(data);
}

main();