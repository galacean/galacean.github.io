
import React from 'react';
import {
  ThunderboltOutlined,
} from '@ant-design/icons';
import { Tooltip } from 'antd';
import stackblitzSdk from '@stackblitz/sdk';
import { FormattedMessage, injectIntl } from 'react-intl';

function Stackblitz (props: any) {
  const indexJsContent = `import './index.css';
    ${props.sourceCode}
  `;

  const dependencies: any = {};

  Object.keys(props.packages).forEach(p => {
    dependencies[p] = props.packages[p].version;
  });

  const stackblitzPrefillConfig: any = {
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
        <Tooltip title={<FormattedMessage id="app.demo.stackblitz"/>}>
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

export default injectIntl(Stackblitz);