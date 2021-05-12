import React from 'react';
import { Button } from 'antd';
import { Link } from 'gatsby';
import { FormattedMessage } from 'react-intl';
import { isZhCN, getLocalizedPathname } from '../utils';
import { version } from '../../../siteconfig.json';
import Spine from './Spine';
import PBRHelmet from './PBRHelmet';

export default function Features (props) {
  const { isMobile, location } = props;
  return (
    <section className="home-section home-section-features">
      <div className="home-section-inner">
        <div className='home-flex home-flex-feature'>
          <PBRHelmet /> 
          <h2>3D</h2>
          <p className="home-flex-intro">
            <FormattedMessage id="app.home.3d.intro" />
          </p>
          <div className="button-wrapper">
            <Link to={getLocalizedPathname(`${version}/docs/mesh-renderer`, isZhCN(location.pathname))}>
              <Button type="primary" size="small" ghost>
                <FormattedMessage id="app.home.more" />
              </Button>
            </Link>
          </div>
        </div>
        <div className='home-flex home-flex-feature'>
          <Spine /> 
          <h2>2D</h2>
          <p className="home-flex-intro">
            <FormattedMessage id="app.home.2d.intro" />
          </p>
          <div className="button-wrapper">
            <Link to={getLocalizedPathname(`${version}/docs/sprite-renderer`, isZhCN(location.pathname))}>
              <Button type="primary" size="small" ghost>
                <FormattedMessage id="app.home.more" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}