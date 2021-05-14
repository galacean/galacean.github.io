import React from 'react';
import { FormattedMessage } from 'react-intl';

export default function Partners () {
  const partners = [
    {
      logo: 'https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*cQdHQYgR6LcAAAAAAAAAAAAAARQnAQ',
      width: 70
    },
    {
      logo: 'https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*N1xwQ48lSOAAAAAAAAAAAAAAARQnAQ',
      width: 70
    },
    {
      logo: 'https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*mHrjQYHiaCMAAAAAAAAAAAAAARQnAQ',
      width: 70
    },
    {
      logo: 'https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*auuzSpvpRCIAAAAAAAAAAAAAARQnAQ',
      width: 100
    },
    {
      logo: 'https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*jNFlSaUPVnkAAAAAAAAAAAAAARQnAQ',
      width: 100
    },
    {
      logo: 'https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*UThWSrJLu2AAAAAAAAAAAAAAARQnAQ',
      width: 90
    },
    {
      logo: 'https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*5gDeQp42ZI8AAAAAAAAAAAAAARQnAQ',
      width: 120
    },
    {
      logo: 'https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*0xfCSrjH0D8AAAAAAAAAAAAAARQnAQ',
      width: 100
    },
    {
      logo: 'https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*jpHSQ7R81S8AAAAAAAAAAAAAARQnAQ',
      width: 60
    },
    {
      logo: 'https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*A0MaTbw5gXwAAAAAAAAAAAAAARQnAQ',
      width: 70
    },
    {
      logo: 'https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*6mvLTasKph4AAAAAAAAAAAAAARQnAQ',
      width: 70
    },
    {
      logo: 'https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*KR0dSII_IwUAAAAAAAAAAAAAARQnAQ',
      width: 80
    },
    {
      logo: 'https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*MoQzQKsBd-kAAAAAAAAAAAAAARQnAQ',
      width: 100
    },
    {
      logo: 'https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*c-BbTpN-564AAAAAAAAAAAAAARQnAQ',
      width: 100
    },
    {
      logo: 'https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*SlVpSLS239IAAAAAAAAAAAAAARQnAQ',
      width: 70
    },
  ];

  return (
    <section className="home-section home-section-partners">
      <h2>
        <FormattedMessage id="app.home.partners" />
      </h2>
      {partners.map((partner)=> {
        return <div className="partner" key={partner.logo}>
          <img src={partner.logo} width={partner.width} />
        </div>
      })}
    </section>
  );
}