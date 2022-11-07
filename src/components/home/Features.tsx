import { Button } from 'antd';
import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { AppContext } from '../contextProvider';
import PBRHelmet from './PBRHelmet';
import Spine from './Spine';

export default function Features() {
  const { lang } = useContext(AppContext);
  return (
    <section className='home-section home-section-features'>
      <div className='home-section-inner'>
        <div className='home-flex home-flex-feature'>
          <PBRHelmet />
          <h2>3D</h2>
          <p className='home-flex-intro'>
            <FormattedMessage id='app.home.3d.intro' />
          </p>
          <div className='button-wrapper'>
            <Link to={`/docs/latest/${lang}/mesh-renderer`}>
              <Button type='primary' size='small' ghost>
                <FormattedMessage id='app.home.more' />
              </Button>
            </Link>
          </div>
        </div>
        <div className='home-flex home-flex-feature'>
          <Spine />
          <h2>2D</h2>
          <p className='home-flex-intro'>
            <FormattedMessage id='app.home.2d.intro' />
          </p>
          <div className='button-wrapper'>
            <Link to={`/docs/latest/${lang}/mesh-renderer`}>
              <Button type='primary' size='small' ghost>
                <FormattedMessage id='app.home.more' />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
