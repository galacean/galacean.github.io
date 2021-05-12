import React from 'react';
import { injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';

import Banner from './Banner';
import SpinePage from './SpinePage';
import Features from './Features';
import Partners from './Partners';
import Footer from './Footer';

function Home(props) {
  const { intl } = props;
  return (
    <>
      <Helmet>
        <title>{`Oasis Engine - ${intl.formatMessage({
          id: 'app.home.slogan',
        })}`}</title>
        <meta
          name="description"
          content={`Oasis Engine - ${intl.formatMessage({
            id: 'app.home.slogan',
          })}`}
        />
      </Helmet>
      <div className="home-wrapper">
        <Banner {...props} />
        <Features {...props} />
        <SpinePage {...props} />
        <Partners {...props} />
        <Footer {...props} />
      </div>
    </>
  );
}

export default injectIntl(Home);
