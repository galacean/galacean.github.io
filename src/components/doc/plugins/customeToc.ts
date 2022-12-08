import { visit } from 'unist-util-visit';

// this plugin will be removed later when deployed as SPA
export default function linkPlugin() {
  return (htmlAST: any) => {
    visit(htmlAST, { tagName: 'a' }, (node) => {
      if (!node.properties.href || node.properties.href === '#') {
        node.tagName = 'p';
      }
    });
  };
}
