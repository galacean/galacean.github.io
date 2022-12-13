import { CodeSandboxOutlined } from '@ant-design/icons';
import LZString from 'lz-string';
import { useRef } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Tooltip } from '@oasis-engine/editor-components';
import { StyledAction } from './CodeActions';

function compress(string: string) {
  return LZString.compressToBase64(string)
    .replace(/\+/g, '-') // Convert '+' to '-'
    .replace(/\//g, '_') // Convert '/' to '_'
    .replace(/=+$/, ''); // Remove ending '='
}

function CodeSandbox(props: any) {
  const iconRef = useRef<HTMLFormElement>(null);
  const indexJsContent = `import './index.css';
  ${props.sourceCode}
  `;

  const dependencies: any = {};

  Object.keys(props.packages).forEach((p) => {
    dependencies[p] = props.packages[p].version;
  });

  const codesandboxPackage = {
    title: `${props.name} - ${props.engineName}@${props.version}`,
    main: 'index.ts',
    dependencies,
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
    <StyledAction>
      <form
        action='https://codesandbox.io/api/v1/sandboxes/define'
        method='POST'
        target='_blank'
        ref={iconRef}
        onClick={() => {
          iconRef.current?.submit();
        }}
      >
        <input type='hidden' name='parameters' value={compress(JSON.stringify(codesanboxPrefillConfig))} />
        <Tooltip side="bottom" content={<FormattedMessage id='app.demo.codesandbox' />}>
          <CodeSandboxOutlined />
        </Tooltip>
      </form>
    </StyledAction>
  );
}
export default injectIntl(CodeSandbox);
