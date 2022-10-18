import { visit } from "unist-util-visit";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  return (markdownAST: any) => {
    visit(markdownAST, 'html', (node, i, parent) => {
      if (node.value.includes('<playground')) {
        const src = /src="(.+)"/.exec(node.value);

        if (src && src[1]) {
          const data = parent.data || (parent.data = {})
          const props = data.hProperties || (data.hProperties = {})
          // 参考 Markdown AST（https://github.com/syntax-tree/mdast）
          // 选择 blockquote 类型，作为 markdown-react 的自定义组件(components props)的处理类型
          parent.type = 'blockquote'
          props.className = "playground-in-doc";
          props.src = src[1];
          parent.children = [];
        }
      }
    });
  }
}