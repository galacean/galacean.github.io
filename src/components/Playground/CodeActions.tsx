import React, { useState } from 'react';
import { CopyOutlined } from '@ant-design/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Codepen from './Codepen';
import CodeSandbox from './CodeSandbox';
import Stackblitz from './Stackblitz';
import { styled } from  "@oasis-engine/editor-design-system";
import { Tooltip } from '@oasis-engine/editor-components';
import { Flex } from '@oasis-engine/editor-components';
import { FormattedMessage } from 'react-intl';
import { toast } from '@oasis-engine/editor-components';

export const StyledActions = styled(Flex, {
  position: "absolute",
  top: 0,
  right: 0,
  width: "50%",
  height: "37px",
  padding: "2px 0",
  lineHeight: "33px",
  backgroundColor: "$slate3"
});

export const StyledAction = styled("div", {
  display: "inline-block",
  fontSize: "$3",
  cursor: "pointer",
  opacity: 0.8,
  transition: "opacity 0.5s",
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
    <StyledActions align="both" gap="lg">
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
      <Tooltip content={<FormattedMessage id="app.demo.copy" />} side="bottom">
        <StyledAction>
          <CopyToClipboard text={sourceCode} onCopy={() => {
            toast.success(<FormattedMessage id="app.demo.copied" />, {duration: 1000});
          }}>
            <CopyOutlined />
          </CopyToClipboard>
        </StyledAction>
      </Tooltip>
    </StyledActions>
  );
}
