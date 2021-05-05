import React from 'react';
import './index.less';

export default function Playground (props) {
  
  console.log('playground:', props);

  return (
    <span className="code-preview">
      <pre className="code-preview-source">
        <code>
      {props.children}
        </code>
      </pre>
      <span className="code-preview-demo">
        <iframe src="/playground/transform" width="100%" height="100%" frameBorder="0"></iframe>
      </span>
    </span>
  );
}
