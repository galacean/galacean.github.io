import { visit } from 'unist-util-visit';

export default function linkPlugin() {
  return (markdownAST: any) => {
    visit(markdownAST, 'link', (node) => {
      const { url } = node;

      if (url) {
        if (url.includes('${docs}')) {
          // TODO: replace with prod address here
          node.url = decodeURIComponent(url).replace('${docs}', `/#/docs/`).replace('-cn', '');
        } else if (url.includes('${api}')) {
          // TODO: replace with prod address here
          node.url = decodeURIComponent(url).replace('${api}', `/#/api/`);
        } else if (url.includes('${examples}')) {
          // TODO: replace with prod address here
          node.url = decodeURIComponent(url).replace('${examples}', `/#/examples/`);
        }
      }
    });
  };
}
