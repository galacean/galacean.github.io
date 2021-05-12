import React from 'react';
import { FormattedMessage } from 'react-intl';

export default function Features (props) {
  return (
    <section className="home-section home-section-advantage">
      <div className='home-flex'>
        <h3>
          <FormattedMessage id="app.home.features.component" />
        </h3>
        <p>
          <FormattedMessage id="app.home.features.component.intro" />
        </p>
      </div>
      <div className='home-flex'>
        <h3>
          <FormattedMessage id="app.home.features.mobile" />
        </h3>
        <p>
          <FormattedMessage id="app.home.features.mobile.intro" />
        </p>
      </div>
      <div className='home-flex'>
        <h3>
          <FormattedMessage id="app.home.features.f2e" />
        </h3>
        <p>
          <FormattedMessage id="app.home.features.f2e.intro" />
        </p>
      </div>
    </section>
  );
}
