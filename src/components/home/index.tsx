import React from 'react';
import { injectIntl, useIntl } from 'react-intl';
import { Helmet } from 'react-helmet';

import Banner from './Banner';
import Cases from './Cases';
import Advantage from './Advantage';
import Partners from './Partners';
import Header from '../header';
import Footer from '../footer';
import "./index.less"

function Home() {
  const intl = useIntl();
  return (
    <>
      <Header></Header>
      <Helmet>
        <title>{`Oasis Engine - ${intl.formatMessage({
          id: 'app.home.slogan',
        })}`}</title>
        <meta
          name='description'
          content={`Oasis Engine - ${intl.formatMessage({
            id: 'app.home.slogan',
          })}`}
        />
      </Helmet>
      <div className='home-wrapper'>
        <Banner />
        <Advantage />
        <Cases />
        <Partners />
      </div>
      <Footer></Footer>
    </>
  );
}

export default injectIntl(Home);
