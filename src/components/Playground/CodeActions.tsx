import React, { useState } from 'react';
import {
  CopyOutlined,
} from '@ant-design/icons';
import { Tooltip } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Codepen from './Codepen';
import CodeSandbox from './CodeSandbox';
import Stackblitz from './Stackblitz';

export default function CodeActions(props: any) {
  const [copy, setCopy] = useState('Copy');

  const html = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta name="theme-color" content="#000000">
    </head>
    <body>
      <canvas id="canvas" style="width: 100vw; height:100vh;"/>
    </body>
  </html>`;

  const css = `body {margin: 0;}`;
  const { sourceCode, version, name, packages, engineName } = props;

  return (
    <div className="code-box-actions">
      <Codepen sourceCode={sourceCode} version={version} packages={packages} name={name} engineName={engineName} html={html} css={css} />
      <CodeSandbox sourceCode={sourceCode} version={version} packages={packages} name={name} engineName={engineName} html={html} css={css} />
      <Stackblitz sourceCode={sourceCode} version={version} packages={packages} name={name} engineName={engineName} html={html} css={css} />
      <Tooltip className="code-box-action" title={copy} onVisibleChange={(s) => { if (s) { setCopy('Copy') } }}>
        <CopyToClipboard text={sourceCode}
          onCopy={() => setCopy('Copied')}>
          <CopyOutlined />
        </CopyToClipboard>
      </Tooltip>
    </div>
  );
}
