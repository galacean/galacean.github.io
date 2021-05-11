import React from 'react';
import GitHubButton from 'react-github-button';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { Button } from 'antd';
import { Link } from 'gatsby';
import { FormattedMessage } from 'react-intl';
import { isZhCN, getLocalizedPathname } from '../utils';
import { version } from '../../../siteconfig.json';
import PBRHelmet from './PBRHelmet';

function Banner(props) {
  const { isMobile, location } = props;
  return (
    <section className="home-section banner-wrapper">
      <div className='home-flex banner-text'>
        <QueueAnim className="banner-title-wrapper" type={isMobile ? 'bottom' : 'right'}>
          <h1>Oasis Engine</h1>
          <p>
            <FormattedMessage id="app.home.slogan" />
          </p>
          <div className="button-wrapper">
            <Link to={getLocalizedPathname(`${version}/docs/install`, isZhCN(location.pathname))}>
              <Button style={{ marginRight: '16px' }} type="primary">
                <FormattedMessage id="app.home.start" />
              </Button>
            </Link>
            <GitHubButton
              key="github-button"
              type="stargazers"
              namespace="oasis-engine"
              repo="engine"
            />
          </div>
        </QueueAnim>
      </div>
      <div className='home-flex banner-bottom-img'>
        <TweenOne animation={{ opacity: 1, type: 'to' }} className="banner-image-wrapper banner-svg-anim" key='banner-bottom-img'>
          <PBRHelmet /> 
        </TweenOne>
      </div>
    </section>
  );
}

export default Banner;
