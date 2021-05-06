import React, { useState } from 'react';
import {
  CopyOutlined,
} from '@ant-design/icons';
import { Tooltip } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Codepen from './Codepen'; 
import CodeSandbox from './CodeSandbox'; 
import Stackblitz from './Stackblitz'; 

export default function CodeActions (props: any) {
  const [copy, setCopy] = useState('Copy');

  const html = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta name="theme-color" content="#000000">
    </head>
    <body>
      <canvas id="canvas"/>
    </body>
  </html>`;

  const css = `body {margin: 0;}`;

  return (
    <div className="code-box-actions">
      <Codepen sourceCode={props.sourceCode} version="0.3.4" name={props.name} html={html} css={css}/>
      <CodeSandbox sourceCode={props.sourceCode} version="0.3.4" name={props.name} html={html} css={css} />
      <Stackblitz sourceCode={props.sourceCode} version="0.3.4" name={props.name} html={html} css={css} />
      <Tooltip className="code-box-action" title={copy} onVisibleChange={(s)=> { s && setCopy('Copy')}}>
        <CopyToClipboard text={props.sourceCode}
          onCopy={() => setCopy('Copied')}>
          <CopyOutlined />
        </CopyToClipboard>
      </Tooltip>
    </div>
  );
}
