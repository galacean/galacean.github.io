import React from 'react';
import './index.less';

export default function Playground (props: any) {
  return (
    <span className="code-preview">
      <pre className="code-preview-source">
        <code>
      {props.children}
        </code>
      </pre>
      <span className="code-preview-demo">
        <iframe src={`/playground/${props.name.replace('.ts', '')}`} width="100%" height="100%" frameBorder="0"></iframe>
      </span>
    </span>
  );
}
