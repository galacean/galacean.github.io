import React from 'react';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import { Button } from 'antd';
import { Link } from 'gatsby';
import { FormattedMessage } from 'react-intl';
import { isZhCN, getLocalizedPathname } from '../utils';
import { version } from '../../../siteconfig.json';
import PBRHelmet from './PBRHelmet';

export default function Features (props) {
  return (
    <section className="home-section home-section-features">
      <div className='home-flex'>
        <h3>Mobile Optimization</h3>
        <p>Mobile OptimizationMobile OptimizationMobile OptimizationMobile OptimizationMobile OptimizationMobile OptimizationMobile OptimizationMobile OptimizationMobile OptimizationMobile Optimization</p>
      </div>
      <div className='home-flex'>
        <h3>Component System</h3>
        <p>Mobile OptimizationMobile OptimizationMobile OptimizationMobile OptimizationMobile OptimizationMobile OptimizationMobile OptimizationMobile OptimizationMobile OptimizationMobile Optimization</p>
      </div>
      <div className='home-flex'>
        <h3>Front-end Friendly</h3>
        <p>Mobile OptimizationMobile OptimizationMobile OptimizationMobile OptimizationMobile OptimizationMobile OptimizationMobile OptimizationMobile OptimizationMobile OptimizationMobile Optimization</p>
      </div>
    </section>
  );
}
