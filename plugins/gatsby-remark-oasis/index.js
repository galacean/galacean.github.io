// eslint-disable-next-line import/no-extraneous-dependencies
const visit = require('unist-util-visit');
const fs = require('fs');
const Prism = require('prismjs');

module.exports = ({ markdownAST }, { api, playground, docs }) => {
  // eslint-disable-next-line arrow-parens
  visit(markdownAST, 'html', (node) => {
    if (node.value.includes('<playground')) {
      const src = /src="(.+)"/.exec(node.value);

      if (src && src[1]) {
        const name = src[1];
        const path = `playground/${name}`
        const code = fs.readFileSync(`./${path}`, { encoding: 'utf8' });
        node.value = `<playground name="${name}"><textarea>${code}</textarea>${Prism.highlight(code, Prism.languages.javascript, 'javascript')}</playground>`;
      }
    }
  });
  
  visit(markdownAST, 'link', (node) => {
    const { url } = node;

    if (url) {
      if (url.includes('${docs}')) {
        node.url = url.replace('${docs}', docs);
      } else if (url.includes('${api}')) {
        node.url= url.replace('${api}', api);
      } else if (url.includes('${examples}')) {
        node.url = url.replace('${examples}', playground);
      }
    }
  });

  return markdownAST;
};
