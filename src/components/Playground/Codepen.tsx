
import React, { useRef } from 'react';
import {
  CodepenOutlined,
} from '@ant-design/icons';
import { Tooltip } from 'antd';

export default function CodeActions (props: any) {
  const iconRef = useRef(null);
  const jsExternal:string[] = [];

  for(let lib in props.packages) {
    jsExternal.push(`${lib}@${props.packages[lib].version}/dist/browser.min.js`);
  }

  const codepenPrefillConfig = {
    title: `${props.name} - ${props.engineName}@${props.version}`,
    html: props.html,
    js: props.sourceCode
      .replace(/import\s+{(\s+[^}]*\s+)}\s+from\s+"oasis-engine";/, 'const { $1 } = oasisEngine;'),
    css: props.css,
    editors: '001',
    js_external: jsExternal.map(url => `https://unpkg.com/${url}`).join(';'),
    js_pre_processor: 'typescript',
  };

  return (
      <div className="code-box-action">
        <form
          className="code-box-code-action"
          action="https://codepen.io/pen/define"
          method="POST"
          target="_blank"
          ref={iconRef}
          onClick={() => {
            iconRef.current.submit();
          }}
          >
            <input type="hidden" name="data" value={JSON.stringify(codepenPrefillConfig)} />
            <Tooltip title={"在 Codepen 中打开"}>
              <CodepenOutlined />
            </Tooltip>
        </form>
      </div>
  );
}
