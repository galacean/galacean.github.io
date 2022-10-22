import { Helmet } from 'react-helmet';
import { injectIntl, useIntl } from 'react-intl';

import Footer from '../footer';
import Header from '../header';
import Advantage from './Advantage';
import Banner from './Banner';
import Cases from './Cases';
import Features from './Features';
import './index.less';
import Partners from './Partners';

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
        <Features />
        <Cases />
        <Partners />
      </div>
      <Footer></Footer>
    </>
  );
}

export default injectIntl(Home);
