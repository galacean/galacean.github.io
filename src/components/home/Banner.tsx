import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { Button, Tag } from 'antd';
import { Link } from 'gatsby';
import { FormattedMessage } from 'react-intl';
import { isZhCN, getLocalizedPathname } from '../utils';
import { version } from '../../../siteconfig.json';
import { GithubOutlined } from '@ant-design/icons';

function Banner(props) {
  const { isMobile, location } = props;
  return (
    <section className="home-section home-section-banner">
      <div className='home-flex'>
        <QueueAnim type={isMobile ? 'bottom' : 'right'}>
          <h1>
            <img src="https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*Xwt7RZ-2FrUAAAAAAAAAAAAAARQnAQ" alt="Oasis Engine" />
          </h1>
          <p className="description">
            <Tag>v{version}</Tag>
            &nbsp;
            <FormattedMessage id="app.home.slogan" />
          </p>
          <div className="button-wrapper">
            <Link to={getLocalizedPathname(`${version}/docs/install`, isZhCN(location.pathname))}>
              <Button type="primary">
                <FormattedMessage id="app.home.start" />
              </Button>
            </Link>
            &nbsp;
            &nbsp;
            <Link to="https://github.com/oasis-engine/engine" target="_blank">
              <Button type="primary" ghost>
                <GithubOutlined />
                Github
              </Button>
            </Link>
          </div>
        </QueueAnim>
      </div>
    </section>
  );
}

export default Banner;
