import React, { useRef } from 'react';
import { CodepenOutlined } from '@ant-design/icons';
import { FormattedMessage, injectIntl } from 'react-intl';
import { StyledAction } from './CodeActions';
import { Tooltip } from '@oasis-engine/editor-components';

function Codepen(props: any) {
  const iconRef = useRef<HTMLFormElement>(null);
  const jsExternal: string[] = [];

  Object.keys(props.packages).forEach((lib) => {
    jsExternal.push(
      `${lib}@${props.packages[lib].version}/${props.packages[lib].dist || 'dist/browser.min.js'}`
    );
  });

  let js: string = props.sourceCode;

  js = js.replace(/(\s+from\s+)["'](.+)["'];/g, ($1, $2, $3) => {
    return `${$2}"https://cdn.skypack.dev/${$3}"`;
  });

  const codepenPrefillConfig = {
    title: `${props.name} - ${props.engineName}@${props.version}`,
    html: props.html,
    js,
    css: props.css,
    editors: '001',
    js_external: jsExternal.map((url) => `https://unpkg.com/${url}`).join(';'),
    js_pre_processor: 'typescript',
  };

  return (
    <StyledAction>
      <form
        action='https://codepen.io/pen/define'
        method='POST'
        target='_blank'
        ref={iconRef}
        onClick={() => {
          iconRef.current?.submit();
        }}
      >
        <input type='hidden' name='data' value={JSON.stringify(codepenPrefillConfig)} />
        <Tooltip side="bottom" content={<FormattedMessage id='app.demo.codepen' />}>
          <CodepenOutlined />
        </Tooltip>
      </form>
    </StyledAction>
  );
}

export default injectIntl(Codepen);
