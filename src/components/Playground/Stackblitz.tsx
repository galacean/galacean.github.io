
import React from 'react';
import {
  ThunderboltOutlined,
} from '@ant-design/icons';
import stackblitzSdk from '@stackblitz/sdk';
import { FormattedMessage, injectIntl } from 'react-intl';
import { StyledAction } from './CodeActions';
import { Tooltip } from '@oasis-engine/editor-components';

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
      <StyledAction>
        <Tooltip side="bottom" content={<FormattedMessage id="app.demo.stackblitz"/>}>
          <span onClick={() => {
              stackblitzSdk.openProject(stackblitzPrefillConfig);
            }}
          >
            <ThunderboltOutlined />
          </span>
        </Tooltip>
      </StyledAction>
  );
}

export default injectIntl(Stackblitz);