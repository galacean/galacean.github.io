import React, { useState } from 'react';
import { CopyOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Codepen from './Codepen';
import CodeSandbox from './CodeSandbox';
import Stackblitz from './Stackblitz';
import { styled } from '../../ui/design-system';

export const StyledActions = styled("div", {
  position: "absolute",
  top: 0,
  right: 0,
  width: "50%",
  height: "37px",
  padding: "2px 0",
  lineHeight: "33px",
  textAlign: "center",
  backgroundColor: "$slate4",
  borderBottom: "1px dashed $slate5"
});

export const StyledAction = styled("div", {
  display: "inline-block",
  marginRight: "16px",
  fontSize: "16px",
  cursor: "pointer",
  opacity: 0.8,
  transition: "opacity 0.5s",
  "&:last-child": {
    marginRight: 0
  },
  "& a": {
    color: "#314659"
  },
  "&:hover": {
    opacity: 1
  }
})

interface ICodeActionProps {
  sourceCode: string;
  engineName: string;
  name: string;
  url: string;
  version: {
    version: string;
    cdn: string;
  };
  packages: any;
}
export default function CodeActions(props: ICodeActionProps) {
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
    <StyledActions>
      <Codepen
        sourceCode={sourceCode}
        version={version}
        packages={packages}
        name={name}
        engineName={engineName}
        html={html}
        css={css}
      />
      <CodeSandbox
        sourceCode={sourceCode}
        version={version}
        packages={packages}
        name={name}
        engineName={engineName}
        html={html}
        css={css}
      />
      <Stackblitz
        sourceCode={sourceCode}
        version={version}
        packages={packages}
        name={name}
        engineName={engineName}
        html={html}
        css={css}
      />
      <Tooltip
        title={copy}
        onVisibleChange={(s) => {
          if (s) {
            setCopy('Copy');
          }
        }}
      >
        <StyledAction>
          <CopyToClipboard text={sourceCode} onCopy={() => setCopy('Copied')}>
            <CopyOutlined />
          </CopyToClipboard>
        </StyledAction>
      </Tooltip>
    </StyledActions>
  );
}
