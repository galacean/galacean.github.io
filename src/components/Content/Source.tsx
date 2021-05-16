import React from 'react';
import { GithubOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { FormattedMessage, injectIntl } from 'react-intl';

function Source(props: any) {
  return props.src ? 
  <span>
    <a href={props.src} target="_blank" className="doc-source">
        <Tooltip title={<FormattedMessage id="app.docs.source" />}>
          <GithubOutlined />
        </Tooltip>
    </a>
  </span>
     : null;
}

export default injectIntl(Source);