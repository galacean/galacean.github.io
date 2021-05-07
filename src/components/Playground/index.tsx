import React from 'react';
import './index.less';
import DemoActions from './DemoActions';
import CodeActions from './CodeActions';
import siteConfig from '../../../siteconfig.json';

export default function Playground (props: any) {
  let sourceCode: string = '';

  if (props.children[0] && props.children[0].type === 'textarea') {
    const texts = props.children[0].props.children;
    if (texts) {
      sourceCode = texts.join('');
    }

    props.children.shift();
  }

  const name = props.name.replace('.ts', '');
  const url = `/${siteConfig.version}/playground/${name}`;
  const {version} = siteConfig.packages['oasis-engine'];

  return (
    <div className="code-box">
      <div className="code-box-demo">
        <iframe src={url} width="100%" height="100%" frameBorder="0"></iframe>
      </div>
      <div className="code-box-source">
        <pre>
          <code>{props.children}</code>
        </pre>
      </div>
      {sourceCode && <CodeActions sourceCode={sourceCode} engineName={siteConfig.name} name={name} url={url} version={version} packages={siteConfig.packages}/>}
      {url && <DemoActions url={url}/>}
    </div>
  );
}
