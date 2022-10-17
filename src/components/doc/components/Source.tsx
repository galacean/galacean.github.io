import { GithubOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import { FormattedMessage } from 'react-intl';
import '../index.less';

function Source(props: { src: string }) {
  return props.src ? (
    <span>
      <a href={props.src} target='_blank' className='doc-source' rel='noreferrer'>
        <Tooltip title={<FormattedMessage id='app.docs.source' />}>
          <GithubOutlined />
        </Tooltip>
      </a>
    </span>
  ) : null;
}

export default Source;
