import React from 'react';
import { injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';

import Banner from './Banner';
import Features from './Features';
import Cases from './Cases';
import Advantage from './Advantage';
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
        <Advantage {...props} />
        <Features {...props} />
        <Cases {...props} />
        <Partners {...props} />
        <Footer {...props} />
      </div>
    </>
  );
}

export default injectIntl(Home);
