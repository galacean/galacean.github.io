import React, { useState } from 'react';
import {
  CopyOutlined,
} from '@ant-design/icons';
import { Tooltip } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function CodeActions (props: any) {
  const [copy, setCopy] = useState('Copy');

  return (
    <div className="code-box-actions">
      <Tooltip title={copy} onVisibleChange={(s)=> { s && setCopy('Copy')}}>
        <CopyToClipboard text={props.sourceCode}
          onCopy={() => setCopy('Copied')}>
          <CopyOutlined />
        </CopyToClipboard>
      </Tooltip>
    </div>
  );
}
