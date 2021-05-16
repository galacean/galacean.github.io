import React, { useRef } from 'react';
import {
  CodepenOutlined,
} from '@ant-design/icons';
import { Tooltip } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';

function Codepen (props: any) {
  const iconRef = useRef(null);
  const jsExternal: string[] = [];

  for(const lib in props.packages) {
    jsExternal.push(`${lib}@${props.packages[lib].version}/${(props.packages[lib].dist || 'dist/browser.min.js')}`);
  }

  let js: string = props.sourceCode;

  js = js.replace(/(import.+from\s+)["'](.+)["'];/g, ($1, $2, $3) => {
    return `${$2}"https://cdn.skypack.dev/${$3}"`;
  });

  const codepenPrefillConfig = {
    title: `${props.name} - ${props.engineName}@${props.version}`,
    html: props.html,
    js,
    css: props.css,
    editors: '001',
    js_external: jsExternal.map(url => `https://unpkg.com/${url}`).join(';'),
    js_pre_processor: 'typescript',
  };

  return (
      <div className="code-box-action">
        <form
          className="code-box-code-action"
          action="https://codepen.io/pen/define"
          method="POST"
          target="_blank"
          ref={iconRef}
          onClick={() => {
            iconRef.current.submit();
          }}
          >
            <input type="hidden" name="data" value={JSON.stringify(codepenPrefillConfig)} />
            <Tooltip title={<FormattedMessage id="app.demo.codepen"/>}>
              <CodepenOutlined />
            </Tooltip>
        </form>
      </div>
  );
}

export default injectIntl(Codepen);