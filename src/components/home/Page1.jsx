import React from 'react';
import GitHubButton from 'react-github-button';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { Button } from 'antd';
import { Link } from 'gatsby';
import { FormattedMessage } from 'react-intl';
import { isZhCN, getLocalizedPathname } from '../utils';
import { version } from '../../../siteconfig.json';
import Spine from './Spine';

export default function Banner(props) {
  const { isMobile, location } = props;
  return (
    <section className="home-section home-section-spine">
      <div className='home-flex home-flex-spine'>
        <TweenOne animation={{ opacity: 1, type: 'to' }}>
          <Spine /> 
        </TweenOne>
      </div>
      <div className='home-flex home-flex-spine-intro'>
        <QueueAnim className="banner-title-wrapper" type={isMobile ? 'bottom' : 'right'}>
          <h2>Oasis Spine</h2>
          <p className="home-flex-intro">
            <FormattedMessage id="app.home.spine.intro" />
          </p>
          <div className="button-wrapper">
            <Link to={getLocalizedPathname(`${version}/docs/install`, isZhCN(location.pathname))}>
              <Button style={{ marginRight: '16px' }} type="primary" ghost>
                <FormattedMessage id="app.home.spine" />
              </Button>
            </Link>
          </div>
        </QueueAnim>
      </div>
    </section>
  );
}