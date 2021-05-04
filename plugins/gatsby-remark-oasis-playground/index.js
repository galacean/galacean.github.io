// eslint-disable-next-line import/no-extraneous-dependencies
const visit = require('unist-util-visit');
const fs = require('fs');
const Prism = require('prismjs');

module.exports = ({ markdownAST }) => {
  // eslint-disable-next-line arrow-parens
  visit(markdownAST, 'html', (node) => {
    if (
      node.value.includes('<playground')
    ) {
      const src = /src="(.+)"/.exec(node.value);

      if (src && src[1]) {
        console.log('node.value:', src[1])
        const code = fs.readFileSync(`./playground/${src[1]}`, {encoding: 'utf8'});
        node.value = `<playground>${Prism.highlight(code, Prism.languages.javascript, 'javascript')}</playground>`;
      }
    } });
  return markdownAST;
};
