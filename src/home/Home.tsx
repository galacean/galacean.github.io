import { Helmet } from 'react-helmet';
import { injectIntl, useIntl } from 'react-intl';
import Footer from '../components/footer';
import Header from '../components/header';
import Cases from './Cases';
import Production from './Production';

function Home() {
  const intl = useIntl();
  return (
    <>
      <Header isHomePage={true}></Header>
      <Helmet>
        <title>{`Galacean - ${intl.formatMessage({
          id: 'app.home.slogan',
        })}`}</title>
        <meta
          name='description'
          content={`Galacean - ${intl.formatMessage({
            id: 'app.home.slogan',
          })}`}
        />
      </Helmet>
      <Production />
      <Cases />
      <Footer></Footer>
    </>
  );
}

export default injectIntl(Home);
