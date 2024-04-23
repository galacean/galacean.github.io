const fs = require('fs').promises;
const path = require('path');
const yaml = require('js-yaml');
const XLSX = require('xlsx');

const data = [];

// yaml content
const yamlReg = /---\n([\s\S]*?)\n---/;
const docLinkReg = /\${docs}/g;
const apiLinkReg = /\${api}/g;
const exampleLinkReg = /\${examples}/g;

async function readFiles(dir) {
  try {
    const files = await fs.readdir(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const fileStat = await fs.stat(filePath);
      if (fileStat.isFile() && /\.(md|markdown)$/i.test(path.extname(file))) {
        readMarkdownFile(file ,filePath)
      } else if (fileStat.isFile() && /\.(ts)$/i.test(path.extname(file))) {
        readTsFile(file, filePath)
      }
    }
  } catch (err) {
    console.error('Error reading directory:', err);
  }
}

async function readMarkdownFile(file, filePath) {
  let content = await fs.readFile(filePath, 'utf8');
  const yamlContent = content.match(yamlReg)[1];

  const { title, type, group } = yaml.load(yamlContent);
  // remove yaml content
  content = content.replace(yamlReg, '');

  // replace links
  content = content.replace(docLinkReg, 'https://galacean.antgroup.com/engine/docs/latest/cn/')
  content = content.replace(apiLinkReg, 'https://galacean.antgroup.com/engine/api/latest/')
  content = content.replace(exampleLinkReg, 'https://galacean.antgroup.com/engine/examples/latest/')

  data.push({
    // directory: group ? `${type}-${group}` : type,
    directory: '官方文档',
    title,
    keywords: '文档$教程',
    extends: '',
    refs: '',
    format: 'Markdown',
    content,
    remarks: `官网文档: https://galacean.antgroup.com/engine/docs/latest/cn/${file.replace(/(\.zh-CN)?\.md$/, '')}`
  })
}

async function readTsFile(file, filePath) {
  const content = await fs.readFile(filePath, 'utf8');

  data.push({
    directory: '官方文档',
    title: file,
    keywords: '示例$Demo$Example',
    extends: '',
    refs: '',
    format: 'Markdown',
    content,
    remarks: `官网示例: https://galacean.antgroup.com/engine/examples/latest/${file.replace(/\.ts$/, '')}`
  })
}


function writeExcel(data) {
  // 中英文表头映射
  const mapping = {
    directory: '*类目',
    title: '*标题',
    keywords: '关键词',
    extends: '扩展问法',
    refs: '关联知识点',
    format: '*知识点格式',
    content: '*知识点内容',
    remarks: '备注'
  };

  // 生成映射后的英文表头顺序
  const englishHeaders = Object.keys(mapping);
  // 生成中文表头数组
  const chineseHeaders = englishHeaders.map(key => mapping[key]);

  // 生成 JSON 数据表
  const worksheet = XLSX.utils.json_to_sheet(data, { header: englishHeaders, skipHeader: true });

  // 在工作表上的 'A1' 位置添加中文表头
  XLSX.utils.sheet_add_aoa(worksheet, [chineseHeaders], { origin: 'A1' });

  // 创建工作簿并添加工作表
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
  XLSX.writeFile(workbook, 'docs.xlsx');
}


async function main() {
  await readFiles('docs');
  await readFiles('playground');
  writeExcel(data);
  console.log('"docs.xlsx" has been successfully generated!');
}

main();