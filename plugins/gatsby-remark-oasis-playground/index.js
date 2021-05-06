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
        const name = src[1];
        const path = `playground/${name}`
        const code = fs.readFileSync(`./${path}`, {encoding: 'utf8'});
        node.value = `<playground name="${name}" path="${path}"><textarea>${code}</textarea>${Prism.highlight(code, Prism.languages.javascript, 'javascript')}</playground>`;
      }
    } });
  return markdownAST;
};
