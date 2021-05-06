import React from 'react';
import {
  CopyOutlined,
} from '@ant-design/icons';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import './index.less';

export default function Playground (props: any) {
  let sourceCode: string = '';

  if (props.children[0] && props.children[0].type === 'textarea') {
    const texts = props.children[0].props.children;
    if (texts) {
      sourceCode = texts.join('');
    }

    props.children.shift();
  }

  return (
    <div className="code-box">
      <div className="code-box-demo">
        <iframe src={`/playground/${props.name.replace('.ts', '')}`} width="100%" height="100%" frameBorder="0"></iframe>
      </div>
      <div className="code-box-source">
        <pre>
          <code>{props.children}</code>
        </pre>
      </div>
      {sourceCode && <div className="code-box-actions">
        <CopyToClipboard text={sourceCode}>
          <CopyOutlined />
        </CopyToClipboard>
      </div>}
    </div>
  );
}
