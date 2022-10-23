import { GithubOutlined } from '@ant-design/icons';
import { Button, Tag } from 'antd';
import QueueAnim from 'rc-queue-anim';
import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { AppContext } from '../contextProvider';

function Banner() {
  const context = useContext(AppContext);
  return (
    <section className='home-section home-section-banner'>
      <div className='home-flex'>
        <QueueAnim type={'right'}>
          <h1>
            <img
              src='https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*Xwt7RZ-2FrUAAAAAAAAAAAAAARQnAQ'
              alt='Oasis Engine'
            />
          </h1>
          <div className='description'>
            <FormattedMessage id='app.home.slogan' />
            &nbsp;&nbsp;
            <Tag color='geekblue'>{context.version}</Tag>
          </div>
          <div className='button-wrapper'>
            <Link to={`/docs/${context.lang}`}>
              <Button type='primary'>
                <FormattedMessage id='app.home.start' />
              </Button>
            </Link>
            &nbsp; &nbsp;
            <a href='https://github.com/oasis-engine/engine' target='_blank'>
              <Button type='primary' ghost>
                <GithubOutlined />
                Github
              </Button>
            </a>
          </div>
        </QueueAnim>
      </div>
    </section>
  );
}

export default Banner;
