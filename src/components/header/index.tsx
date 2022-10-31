import {
  AppstoreAddOutlined,
  createFromIconfontCN,
  HomeOutlined,
  MenuOutlined,
  NotificationOutlined,
  PlayCircleOutlined,
  ReadOutlined,
  TwitterOutlined,
  YuqueOutlined,
  ZhihuOutlined,
} from '@ant-design/icons';
import { Button, Col, Menu, Popover, Row, Select } from 'antd';
import { useContext } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Media from 'react-media';
import { Link } from 'react-router-dom';
import config from '../../siteconfig.json';
import { AppContext } from '../contextProvider';
import SearchBox from './components/SearchBox';

import './index.less';

const { versions } = config;

const Icon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2808716_9ux7aqrqvq9.js', // 在 iconfont.cn 上生成
});
const { Option } = Select;

const LOGO_URL = 'https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*w3sZQpMix18AAAAAAAAAAAAAARQnAQ';

function Header() {
  const formatMessage = useIntl().formatMessage;
  const context = useContext(AppContext);
  const isZhCN = context.lang === 'zh-CN';

  const getMenu = (isMobile: boolean) => (
    <Menu mode={isMobile ? 'inline' : 'horizontal'} id='nav' key='nav'>
      <Menu.Item key='home' icon={<HomeOutlined />}>
        <Link to='/'>
          <FormattedMessage id='app.header.menu.home' />
        </Link>
      </Menu.Item>
      <Menu.SubMenu key='docs' icon={<ReadOutlined />} title={formatMessage({ id: 'app.header.menu.docs' })}>
        <Menu.ItemGroup title={formatMessage({ id: 'app.header.menu.engine' })}>
          <Menu.Item key='engine-docs'>
            <Link to={`/docs/${context.lang}`}>{formatMessage({ id: 'app.header.menu.engine.docs' })}</Link>
          </Menu.Item>
          <Menu.Item key='api'>
            <Link to={`/api`}>API</Link>
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title={formatMessage({ id: 'app.header.menu.artist' })}>
          <Menu.Item key='artist-docs'>
            <Link to={'/temp'}>{formatMessage({ id: 'app.header.menu.artist.docs' })}</Link>
          </Menu.Item>
        </Menu.ItemGroup>
        {isZhCN && (
          <Menu.ItemGroup title={formatMessage({ id: 'app.header.menu.editor' })}>
            <Menu.Item key='editor-docs'>
              <Link to={'temp'}>{formatMessage({ id: 'app.header.menu.editor.docs' })}</Link>
            </Menu.Item>
          </Menu.ItemGroup>
        )}
      </Menu.SubMenu>
      <Menu.Item key='examples' icon={<PlayCircleOutlined />}>
        <Link to={`/examples`}>
          <FormattedMessage id='app.header.menu.engine.examples' />
        </Link>
      </Menu.Item>
      <Menu.SubMenu
        key='ecosystem'
        icon={<AppstoreAddOutlined />}
        title={formatMessage({ id: 'app.header.menu.ecosystem' })}
      >
        <Menu.ItemGroup title={formatMessage({ id: 'app.header.menu.ecosystem.tool' })}>
          <Menu.Item key='miniprogram'>
            <Link to={'temp'}>{formatMessage({ id: 'app.header.menu.ecosystem.miniprogram' })}</Link>
          </Menu.Item>
          <Menu.Item key='gltfviewer'>
            <Link to={`/gltf-viewer`}>{formatMessage({ id: 'app.header.menu.ecosystem.gltfviewer' })}</Link>
          </Menu.Item>
          <Menu.Item key='createapp'>
            <a href='https://github.com/oasis-engine/create-oasis-app' target='_blank'>
              {formatMessage({ id: 'app.header.menu.ecosystem.createapp' })}
            </a>
          </Menu.Item>
          {isZhCN && (
            <Menu.Item key='editor'>
              <a href='https://oasis.alipay.com/editor' target='_blank'>
                {formatMessage({ id: 'app.header.menu.ecosystem.editor' })}
              </a>
            </Menu.Item>
          )}
        </Menu.ItemGroup>
        <Menu.ItemGroup title={formatMessage({ id: 'app.header.menu.ecosystem.animation' })}>
          <Menu.Item key='spine'>
            <Link to={'temp'}>Spine</Link>
          </Menu.Item>
          <Menu.Item key='lottie'>
            <Link to={'temp'}>Lottie</Link>
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu.SubMenu>
      <Menu.SubMenu
        key='community'
        icon={<NotificationOutlined />}
        title={formatMessage({ id: 'app.header.menu.community' })}
      >
        <Menu.Item key='zhihu' icon={<ZhihuOutlined />}>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://www.zhihu.com/column/c_1369047387231592448'
          >
            <FormattedMessage id='app.community.zhihu' />
          </a>
        </Menu.Item>
        <Menu.Item key='juejin' icon={<Icon type='icon-juejin' />}>
          <a
            target='_blank'
            rel='noopener noreferrer'
            href='https://juejin.cn/team/6930507995474313230/posts'
          >
            <FormattedMessage id='app.community.juejin' />
          </a>
        </Menu.Item>
        <Menu.Item key='yuque' icon={<YuqueOutlined />}>
          <a target='_blank' rel='noopener noreferrer' href='https://www.yuque.com/oasis-engine/blog'>
            <FormattedMessage id='app.community.yuque' />
          </a>
        </Menu.Item>
        <Menu.Item key='twitter' icon={<TwitterOutlined />}>
          <a target='_blank' rel='noopener noreferrer' href='https://twitter.com/OasisEngine'>
            <FormattedMessage id='app.community.twitter' />
          </a>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );

  return (
    <Media query='(max-width: 768px)'>
      {(isMobile) => (
        <div className='header'>
          {isMobile && (
            <Popover
              overlayClassName='popover-menu'
              placement='bottomRight'
              content={getMenu(true)}
              trigger='click'
              arrowPointAtCenter
            >
              <MenuOutlined className='nav-phone-icon' />
            </Popover>
          )}
          <Row>
            <Col xxl={4} xl={5} lg={8} md={8} sm={24} xs={24}>
              <Link id='logo' to='/'>
                <img src={LOGO_URL} alt='Oasis Engine' />
              </Link>
            </Col>
            <Col xxl={20} xl={19} lg={16} md={16} sm={0} xs={0}>
              {!isMobile && <SearchBox></SearchBox>}
              <div className='header-meta'>
                {!isMobile && (
                  <div className='right-header'>
                    <div id='lang'>
                      <Button
                        size='small'
                        onClick={() => {
                          context.setLang(context.lang === 'zh-CN' ? 'en' : 'zh-CN');
                        }}
                      >
                        <FormattedMessage id='app.header.lang' />
                      </Button>
                    </div>
                    <Select size='small' onChange={(e) => context.setVersion(e)} value={context.version}>
                      {versions.map((v) => {
                        return (
                          <Option value={v} key={v}>
                            {v}
                          </Option>
                        );
                      })}
                    </Select>
                  </div>
                )}
                <div id='menu'>{getMenu(false)}</div>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </Media>
  );
}

export default Header;
