
import React from 'react';
import {
  ThunderboltOutlined,
} from '@ant-design/icons';
import { Tooltip } from 'antd';
import stackblitzSdk from '@stackblitz/sdk';

export default function CodeActions (props: any) {
  const indexJsContent = `import './index.css';
    ${props.sourceCode}
  `;

  const dependencies:any = {};

  for(let p in props.packages){
    dependencies[p] = props.packages[p].version;
  }

  const stackblitzPrefillConfig:any = {
    title: `${props.name} - ${props.engineName}@${props.version}`,
    template: 'typescript',
    dependencies,
    files: {
      'index.css': props.css,
      'index.ts': indexJsContent,
      'index.html': props.html,
    },
  };

  return (
      <div className="code-box-action">
        <Tooltip title={"在 Stackblitz 中打开"}>
          <span onClick={() => {
              stackblitzSdk.openProject(stackblitzPrefillConfig);
            }}
          >
            <ThunderboltOutlined />
          </span>
        </Tooltip>
      </div>
  );
}
