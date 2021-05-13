import React from 'react';
import GitHubButton from 'react-github-button';
import QueueAnim from 'rc-queue-anim';
import { Button } from 'antd';
import { Link } from 'gatsby';
import { FormattedMessage } from 'react-intl';
import { isZhCN, getLocalizedPathname } from '../utils';
import { version } from '../../../siteconfig.json';

function Banner(props) {
  const { isMobile, location } = props;
  return (
    <section className="home-section home-section-banner">
      <div className='home-flex'>
        <QueueAnim className="banner-title-wrapper" type={isMobile ? 'bottom' : 'right'}>
          <h1><img src="https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*Xwt7RZ-2FrUAAAAAAAAAAAAAARQnAQ" alt="Oasis Engine" /></h1>
          <p>
            <FormattedMessage id="app.home.slogan" />
          </p>
          <p>
            <GitHubButton
              key="github-button"
              type="stargazers"
              namespace="oasis-engine"
              repo="engine"
            />
          </p>
          <div className="button-wrapper">
            <Link to={getLocalizedPathname(`${version}/docs/install`, isZhCN(location.pathname))}>
              <Button type="primary">
                <FormattedMessage id="app.home.start" />
              </Button>
            </Link>
          </div>
        </QueueAnim>
      </div>
    </section>
  );
}

export default Banner;
