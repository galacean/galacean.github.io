import React from 'react';
import { FormattedMessage } from 'react-intl';

export default function Partners (props) {
  return (
    <section className="home-section home-section-partners">
      <h2>
        <FormattedMessage id="app.home.partners" />
      </h2>
      <div className="partners">
        <div className="partner">
          <img src="https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*cQdHQYgR6LcAAAAAAAAAAAAAARQnAQ" width="120" alt="支付宝"/>
        </div>
        <div className="partner">
          <img src="https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*N1xwQ48lSOAAAAAAAAAAAAAAARQnAQ" width="120" alt="蚂蚁花呗"/>
        </div>
        <div className="partner">
          <img src="https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*mHrjQYHiaCMAAAAAAAAAAAAAARQnAQ" width="110" alt="借呗"/>
        </div>
        <div className="partner">
          <img src="https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*5gDeQp42ZI8AAAAAAAAAAAAAARQnAQ" width="170" alt="蚂蚁财富"/>
        </div>
        <div className="partner">
          <img src="https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*0xfCSrjH0D8AAAAAAAAAAAAAARQnAQ" width="110" alt="飞猪"/>
        </div>
        <div className="partner">
          <img src="https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*jpHSQ7R81S8AAAAAAAAAAAAAARQnAQ" width="110" alt="alibaba.com"/>
        </div>
      </div>
      <div className="partners">
        <div className="partner">
          <img src="https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*jNFlSaUPVnkAAAAAAAAAAAAAARQnAQ" width="140" alt="1688.com"/>
        </div>
        <div className="partner">
          <img src="https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*UThWSrJLu2AAAAAAAAAAAAAAARQnAQ" width="130" alt="antv"/>
        </div>
        <div className="partner">
          <img src="https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*A0MaTbw5gXwAAAAAAAAAAAAAARQnAQ" width="130" alt="antv"/>
        </div>
        <div className="partner">
          <img src="https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*MoQzQKsBd-kAAAAAAAAAAAAAARQnAQ" width="170" alt="antv"/>
        </div>
        <div className="partner">
          <img src="https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*SlVpSLS239IAAAAAAAAAAAAAARQnAQ" width="120" alt="antv"/>
        </div>
      </div>
    </section>
  );
}