import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { Button, Tag } from 'antd';
import { Link } from 'gatsby';
import { FormattedMessage } from 'react-intl';
import { isZhCN, getLocalizedPathname } from '../utils';
import { version } from '../../../siteconfig.json';
import { GithubOutlined } from '@ant-design/icons';

function Banner(props) {
  const { isMobile } = props;
  return (
    <section className="home-section home-section-banner">
      <div className='home-flex'>
        <QueueAnim type={isMobile ? 'bottom' : 'right'}>
          <h1>
            <img src="https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*Xwt7RZ-2FrUAAAAAAAAAAAAAARQnAQ" alt="Oasis Engine" />
          </h1>
          <div className="description">
            <FormattedMessage id="app.home.slogan" />
            &nbsp;&nbsp;
            <Tag color="geekblue">v{version}-beta</Tag>
          </div>
          <div className="button-wrapper">
            <Link to={getLocalizedPathname(`${version}/docs/install`, isZhCN())}>
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
