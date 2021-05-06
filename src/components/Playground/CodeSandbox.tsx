
import React, { useRef } from 'react';
import {
  CodeSandboxOutlined,
} from '@ant-design/icons';
import LZString from 'lz-string';
import { Tooltip } from 'antd';

function compress(string: string) {
  return LZString.compressToBase64(string)
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, ''); // Remove ending '='
}

export default function CodeActions (props: any) {
  const iconRef = useRef(null);
  const indexJsContent = `import './index.css';
  ${props.sourceCode}
  `;

  const codesandboxPackage = {
    title: `${props.name} - oasis-engine@${props.version}`,
    main: 'index.ts',
    dependencies: {
      'oasis-engine': `${props.version}`,
    },
    devDependencies: {
      typescript: '^4.0.5',
    },
    scripts: {
      // start: 'react-scripts start',
      // build: 'react-scripts build',
      // test: 'react-scripts test --env=jsdom',
      // eject: 'react-scripts eject',
    },
    browserslist: ['>0.2%', 'not dead', 'not ie <= 11', 'not op_mini all'],
  };

  const codesanboxPrefillConfig = {
    files: {
      'package.json': { content: codesandboxPackage },
      'index.css': { content: props.css },
      'index.ts': { content: indexJsContent },
      'index.html': {
        content: props.html,
      },
    },
  };

  return (
      <div className="code-box-action">
        <form
          className="code-box-code-action"
          action="https://codesandbox.io/api/v1/sandboxes/define"
          method="POST"
          target="_blank"
          ref={iconRef}
          onClick={() => {
            iconRef.current.submit();
          }}
          >
            <input type="hidden" name="parameters" value={compress(JSON.stringify(codesanboxPrefillConfig))} />
            <Tooltip title={"在 CodeSandbox 中打开"}>
              <CodeSandboxOutlined />
            </Tooltip>
        </form>
      </div>
  );
}
