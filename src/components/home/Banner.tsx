import { ArrowRightOutlined, GithubOutlined, HeartFilled } from '@ant-design/icons';
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
          <p>
            <FormattedMessage id='app.home.slogan' />
          </p>
          <div className='home-description'>
            <a href="https://github.com/ant-galaxy/oasis-engine/stargazers" target='_blank'>
              <img src="https://img.shields.io/github/stars/ant-galaxy/oasis-engine?style=social" alt="github stars" />
            </a>
            <a href="https://www.npmjs.com/package/oasis-engine" target='_blank'>
              <img src="https://img.shields.io/npm/dm/oasis-engine.svg" alt="npm download" />
            </a>
          </div>
          <div className='home-button-wrapper'>
            <Link to={`/docs/latest/${context.lang}`}>
              <Button type='primary'>
                <FormattedMessage id='app.home.start' />
                <ArrowRightOutlined style={{ marginLeft: "5px" }} />
              </Button>
            </Link>
            <a href='https://github.com/ant-galaxy/oasis-engine/discussions/categories/q-a' target='_blank'>
              <Button type='primary' ghost>
                <GithubOutlined style={{ marginRight: "5px" }} />
                <FormattedMessage id='app.home.discussion' />
              </Button>
            </a>
            <a href='https://opencollective.com/oasis' target='_blank'>
              <Button>
                <HeartFilled style={{ color: "hotpink", marginRight: "5px" }} />
                <FormattedMessage id='app.home.sponsoring' />
              </Button>
            </a>
          </div>
        </QueueAnim>
      </div>
    </section>
  );
}

export default Banner;
