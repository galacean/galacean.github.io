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

export default function Partners (props) {
  return (
    <section className="home-section home-section-partners">
      <h2>
        <FormattedMessage id="app.home.partners" />
      </h2>
      <div className="partners">
        <div className="partner">
          <img src="https://gw-office.alipayobjects.com/basement_prod/2c9c9425-1bb8-43c1-a015-0b08471e9db0.png" width="120" alt="支付宝"/>
        </div>
        <div className="partner">
          <img src="https://gw-office.alipayobjects.com/basement_prod/a45318fb-67db-4542-adad-20a6edeed193.png" width="120" alt="蚂蚁花呗"/>
        </div>
        <div className="partner">
          <img src="https://gw-office.alipayobjects.com/basement_prod/df6f9783-7caf-4a24-b350-05b782ecd1b6.png" width="110" alt="借呗"/>
        </div>
        <div className="partner">
          <img src="https://gw-office.alipayobjects.com/basement_prod/61f1e549-edb4-44bc-9411-36e6b634d41d.png" width="170" alt="蚂蚁财富"/>
        </div>
        <div className="partner">
          <img src="https://gw-office.alipayobjects.com/basement_prod/a136f1e6-bb37-429f-af43-94edee894759.png" width="110" alt="飞猪"/>
        </div>
        <div className="partner">
          <img src="https://gw-office.alipayobjects.com/basement_prod/b3311861-2b7d-42d3-80f9-bea8daaad1cc.png" alt="alibaba.com"/>
        </div>
      </div>
      <div className="partners">
        <div className="partner">
          <img src="https://gw-office.alipayobjects.com/basement_prod/e1f0af76-67d0-4da2-9fe0-bc32c6695927.png" width="140" alt="1688.com"/>
        </div>
        <div className="partner">
          <img src="https://gw-office.alipayobjects.com/bmw-prod/a7487bcc-9bca-483f-b740-cb635dcd9063.png" width="130" alt="antv"/>
        </div>
        <div className="partner">
          <img src="https://gw-office.alipayobjects.com/bmw-prod/be362c18-e1a9-4c5d-9d43-3f38485854a8.jpeg" width="130" alt="antv"/>
        </div>
        <div className="partner">
          <img src="https://gw-office.alipayobjects.com/bmw-prod/6022cdcf-730d-4387-a869-7a2e2ee03114.png" width="170" alt="antv"/>
        </div>
        <div className="partner">
          <img src="https://gw-office.alipayobjects.com/bmw-prod/89175dde-f3d8-4d66-be26-735c083cf553.png" width="120" alt="antv"/>
        </div>
        <div className="partner">
          <img src="https://gw-office.alipayobjects.com/bmw-prod/b5e9e912-38ec-4659-b4d0-9b5f850f9c2b.png" width="130" alt="antv"/>
        </div>
      </div>
      <div className="partners">
        <div className="partner">
          <img src="https://gw-office.alipayobjects.com/basement_prod/6d50cb1b-6f2e-4c90-9f9b-2cba3842f33d.png" width="100" alt="rokid"/>
        </div>
      </div>
    </section>
  );
}