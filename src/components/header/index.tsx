import {
  AppstoreAddOutlined,
  createFromIconfontCN,
  HomeOutlined,
  MenuOutlined, PlayCircleOutlined,
  ReadOutlined
} from '@ant-design/icons';
import { Menu, Popover } from 'antd';
import { Translate } from 'iconoir-react';
import { useContext } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import Media from 'react-media';
import { Link } from 'react-router-dom';
import config from '../../siteconfig.json';
import { ActionButton } from '../../ui/ActionButton';
import { styled } from '../../ui/design-system';
import { Flex } from '../../ui/Flex';
import { Item as Option, Select } from '../../ui/Select';
import { AppContext } from '../contextProvider';
import NavigationMenu from './components/NavigationMenu';
import SearchBox from './components/SearchBox';
import Socials from './components/Socials';
import ThemeButton from './components/ThemeButton';
import './index.less';

const { versions } = config;

const Icon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2808716_9ux7aqrqvq9.js', // 在 iconfont.cn 上生成
});

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
            <Link to={`/docs/${context.version}/${context.lang}`}>
              {formatMessage({ id: 'app.header.menu.engine.docs' })}
            </Link>
          </Menu.Item>
          <Menu.Item key='api'>
            <Link to={`/api/${context.version}`}>API</Link>
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title={formatMessage({ id: 'app.header.menu.artist' })}>
          <Menu.Item key='artist-docs'>
            <Link to={`/docs/latest/${context.lang}/artist-bake${context.lang === 'en' ? '' : '.zh-CN'}`}>
              {formatMessage({ id: 'app.header.menu.artist.docs' })}
            </Link>
          </Menu.Item>
        </Menu.ItemGroup>
        {isZhCN && (
          <Menu.ItemGroup title={formatMessage({ id: 'app.header.menu.editor' })}>
            <Menu.Item key='editor-docs'>
              <Link to={'/docs/latest/zh/editor.zh-CN'}>
                {formatMessage({ id: 'app.header.menu.editor.docs' })}
              </Link>
            </Menu.Item>
          </Menu.ItemGroup>
        )}
      </Menu.SubMenu>
      <Menu.Item key='examples' icon={<PlayCircleOutlined />}>
        <Link to={`/examples/${context.version}`}>
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
            <Link to={`/docs/latest/${context.lang}/miniprogram${context.lang === 'en' ? '' : '.zh-CN'}`}>
              {formatMessage({ id: 'app.header.menu.ecosystem.miniprogram' })}
            </Link>
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
            <Link to={`/docs/latest/zh/editor-component-spine.zh-CN`}>Spine</Link>
          </Menu.Item>
          <Menu.Item key='lottie'>
            <Link to={`/docs/latest/zh/editor-lottie.zh-CN`}>Lottie</Link>
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu.SubMenu>
    </Menu>
  );

  const StyledHeader = styled(Flex, {
    padding: "$2 $4",
    position: "relative",
    zIndex: 10,
    borderBottom: "1px solid $slate5"
  });

  const StyledLogo = styled(Link, {
    textDecoration: "none",
    "& img": {
      width: "200px",
      opacity: 0.9
    }
  });

  return (
    <Media query='(max-width: 768px)'>
      {(isMobile) => (
        <StyledHeader justifyContent="between" align="both">
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
          <Flex css={{ flex: 1 }}>
            <StyledLogo to='/'>
              <img src={LOGO_URL} alt='Oasis Engine' />
            </StyledLogo>
            {!isMobile && <SearchBox></SearchBox>}
          </Flex>
          {!isMobile && (
            <div className='right-header'>
              <NavigationMenu />
              <Socials />
              <ThemeButton />
              <ActionButton
                size="sm"
                onClick={() => {
                  const newLang = context.lang === 'zh-CN' ? 'en' : 'zh-CN';
                  context.setLang(newLang);
                  localStorage.setItem('lang', newLang);
                }}
              >
                <Translate />
              </ActionButton>
              <Select size='sm' onSelectionChange={(e) => context.setVersion(e)} defaultSelectedKey={context.version}>
                {versions.map((v) => {
                  return (
                    <Option key={v}>
                      {v}
                    </Option>
                  );
                })}
              </Select>
            </div>
          )}
        </StyledHeader>
      )}
    </Media>
  );
}

export default Header;
