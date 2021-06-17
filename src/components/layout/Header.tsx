import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Link } from 'gatsby';
import { AppstoreAddOutlined, HomeOutlined, MenuOutlined, NotificationOutlined, PlayCircleOutlined, ReadOutlined, SearchOutlined } from '@ant-design/icons';
import { Row, Col, Select, Input, Menu, Popover } from 'antd';
import * as utils from '../utils';
import { version } from '../../../siteconfig.json';

const { Option } = Select;

const LOGO_URL = 'https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*w3sZQpMix18AAAAAAAAAAAAAARQnAQ';

let docSearch: (config: any) => void;
if (typeof window !== 'undefined') {
  // eslint-disable-next-line global-require
  docSearch = require('docsearch.js');
}

function initDocSearch(lang: 'en' | 'cn') {
  if (!docSearch) {
    return;
  }
  docSearch({
    apiKey: '6cea501a58304e81c8e9d028a1d995e9',
    indexName: 'oasisengine',
    inputSelector: '#search-box input',
    algoliaOptions: {
      // facetFilters: [`version:${version}`, `tags:${lang}`]
    },
    transformData(
      hits: {
        url: string;
      }[],
    ) {
      hits.forEach((hit) => {
        // eslint-disable-next-line  no-param-reassign
        hit.url = hit.url.replace('oasisengine.cn', window.location.host);
        // eslint-disable-next-line  no-param-reassign
        hit.url = hit.url.replace('https:', window.location.protocol);
      });
      return hits;
    },
    debug: false, // Set debug to true if you want to inspect the dropdown
  });
}

interface HeaderProps {
  isMobile: boolean;
  intl: any;
  location: {
    pathname: string;
  };
  showVersion?: boolean;
}
interface HeaderState {
  inputValue?: string;
  menuVisible: boolean;
  menuMode?: 'vertical' | 'vertical-left' | 'vertical-right' | 'horizontal' | 'inline';
  searchOption?: any[];
  searching?: boolean;
  versions?: string[]
}

class Header extends React.Component<HeaderProps, HeaderState> {
  searchInput: Input | null | undefined;

  timer: number;

  constructor(props) {
    super(props);
    this.state = {
      menuVisible: false,
      menuMode: props.isMobile ? 'inline' : 'horizontal',
      versions: []
    };
  }

  async componentDidMount() {
    const { searchInput } = this;
    const { intl: { locale } } = this.props;

    document.addEventListener('keyup', (event) => {
      if (event.keyCode === 83 && event.target === document.body) {
        if (searchInput) {
          searchInput.focus();
        }
      }
    });

    initDocSearch(locale === 'zh-CN' ? 'cn' : 'en');

    // Fetch version from remote config
    const versionConfig = 'https://render.alipay.com/p/h5data/oasis-version_site-doc-versions-h5data.json';
    const versions = await fetch(versionConfig).then((e) => e.json());
    
    if (versions) {
      this.setState({ versions: versions.map((v) => v.version)}) 
    }
  }

  componentDidUpdate(preProps: HeaderProps) {
    const { isMobile } = this.props;
    if (isMobile !== preProps.isMobile) {
      this.setMenuMode(isMobile);
    }
  }

  setMenuMode = (isMobile: boolean) => {
    this.setState({ menuMode: isMobile ? 'inline' : 'horizontal' });
  };

  handleHideMenu = () => {
    this.setState({
      menuVisible: false,
    });
  };

  handleShowMenu = () => {
    this.setState({
      menuVisible: true,
    });
  };

  onMenuVisibleChange = (visible: boolean) => {
    this.setState({
      menuVisible: visible,
    });
  };

  handleSelect = (value: string) => {
    window.location.href = value;
  };

  handleLangChange = () => {
    const {
      location: { pathname },
    } = this.props;
    const currentProtocol = `${window.location.protocol}//`;
    const currentHref = window.location.href.substr(currentProtocol.length);

    if (utils.isLocalStorageNameSupported()) {
      localStorage.setItem('locale', utils.isZhCN(pathname) ? 'en-US' : 'zh-CN');
    }
    window.location.href =
      currentProtocol +
      currentHref.replace(
        window.location.pathname,
        utils.getLocalizedPathname(pathname, !utils.isZhCN(pathname)),
      );
  };

  onVersionChange = (value: string) => {
    const versionReg = /\/(\d+[.]\d+[^/]*)\//;
    const matchedResult = location.href.match(versionReg);
    
    if (matchedResult && matchedResult[1]) {
      location.href = location.href.replace(matchedResult[1], value);
    }
  };

  render() {
    const { menuMode, menuVisible } = this.state;
    const { location, intl } = this.props;
    const path = location.pathname;
    const { formatMessage } = intl;

    const module = location.pathname
      .replace(/(^\/|\/$)/g, '')
      .split('/')
      .slice(0, -1)
      .join('/');
    let activeMenuItem = module || 'home';
    if (/^blog/.test(path)) {
      activeMenuItem = 'blog';
    } else if (/docs/.test(path)) {
      if (/docs\/editor[-]/.test(path)) {
        activeMenuItem = 'editor-docs';
      } else if (/docs\/artist[-]/.test(path)) {
        activeMenuItem = 'artist-docs';
      } else {
        activeMenuItem = 'engine-docs';
      }
    } else if (/api/.test(path)) {
      activeMenuItem = 'api';
    } else if (/examples/.test(path)) {
      activeMenuItem = 'examples';
    } else if (/gltf-viewer/.test(path)) {
      activeMenuItem = 'gltfviewer';
    } else if (path === '/') {
      activeMenuItem = 'home';
    }

    const isZhCN = intl.locale === 'zh-CN';

    const menu = [
      <Menu mode={menuMode} selectedKeys={[activeMenuItem]} id="nav" key="nav">
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to={utils.getLocalizedPathname('/', isZhCN)}>
            <FormattedMessage id="app.header.menu.home" />
          </Link>
        </Menu.Item>
        <Menu.SubMenu key="docs" icon={<ReadOutlined />} title={formatMessage({ id: "app.header.menu.docs" })}>
          <Menu.ItemGroup title={formatMessage({ id: "app.header.menu.engine" })}>
            <Menu.Item key="engine-docs">
              <Link to={utils.getLocalizedPathname(`${version}/docs/install`, isZhCN)}>
                {formatMessage({ id: "app.header.menu.engine.docs" })}
              </Link>
            </Menu.Item>
            <Menu.Item key="api">
              <Link to={`/${version}/api/core/index`}>
                API
              </Link>
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title={formatMessage({ id: "app.header.menu.artist" })}>
            <Menu.Item key="artist-docs">
              <Link to={utils.getLocalizedPathname(`/${version}/docs/artist-bake`, isZhCN)}>
                {formatMessage({ id: "app.header.menu.artist.docs" })}
              </Link>
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title={formatMessage({ id: "app.header.menu.editor" })}>
            <Menu.Item key="editor-docs">
              <Link to={utils.getLocalizedPathname(`/${version}/docs/editor`, isZhCN)}>
                {formatMessage({ id: "app.header.menu.editor.docs" })}
              </Link>
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu.SubMenu>
        <Menu.Item key="examples" icon={<PlayCircleOutlined />}>
          <Link to={`/${version}/examples`}>
            <FormattedMessage id="app.header.menu.engine.examples" />
          </Link>
        </Menu.Item>
        <Menu.SubMenu key="ecosystem" icon={<AppstoreAddOutlined />} title={formatMessage({ id: "app.header.menu.ecosystem" })}>
          <Menu.ItemGroup title={formatMessage({ id: "app.header.menu.ecosystem.tool" })}>
            <Menu.Item key="miniprogram">
              <Link to={utils.getLocalizedPathname(`/${version}/docs/miniprogram`, isZhCN)}>
                {formatMessage({ id: "app.header.menu.ecosystem.miniprogram" })}
              </Link>
            </Menu.Item>
            <Menu.Item key="gltfviewer">
              <Link to={`/gltf-viewer`}>
                {formatMessage({ id: "app.header.menu.ecosystem.gltfviewer" })}
              </Link>
            </Menu.Item>
            <Menu.Item key="createapp">
              <Link to="https://github.com/oasis-engine/create-oasis-app" target="_blank">
                {formatMessage({ id: "app.header.menu.ecosystem.createapp" })}
              </Link>
            </Menu.Item>
            <Menu.Item key="editor">
              <Link to="https://oasis.alipay.com/editor" target="_blank">
                {formatMessage({ id: "app.header.menu.ecosystem.editor" })}
              </Link>
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title={formatMessage({ id: "app.header.menu.ecosystem.animation" })}>
            <Menu.Item key="miniprogram">
              <Link to={utils.getLocalizedPathname(`/${version}/docs/spine`, isZhCN)}>
                Spine
              </Link>
            </Menu.Item>
            <Menu.Item key="miniprogram">
              <Link to={utils.getLocalizedPathname(`/${version}/docs/lottie`, isZhCN)}>
                Lottie
              </Link>
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu.SubMenu>
        <Menu.Item key="blog" icon={<NotificationOutlined />}>
          <Link to={utils.getLocalizedPathname('/blog/', isZhCN)}>
            <FormattedMessage id="app.header.menu.blog" />
          </Link>
        </Menu.Item>
      </Menu>
    ];


    return (
      <div>
        <div id="header" className="header">
          {menuMode === 'inline' ? (
            <Popover
              overlayClassName="popover-menu"
              placement="bottomRight"
              content={menu}
              trigger="click"
              visible={menuVisible}
              arrowPointAtCenter
              onVisibleChange={this.onMenuVisibleChange}
            >
              <MenuOutlined className="nav-phone-icon" onClick={this.handleShowMenu} />
            </Popover>
          ) : null}
          <Row>
            <Col xxl={4} xl={5} lg={8} md={8} sm={24} xs={24}>
              <Link id="logo" to="/">
                <img src={LOGO_URL} alt="Oasis Engine" />
              </Link>
            </Col>
            <Col xxl={20} xl={19} lg={16} md={16} sm={0} xs={0}>
              <div id="search-box">
                <SearchOutlined />
                <Input
                  ref={(ref) => {
                    this.searchInput = ref;
                  }}
                  placeholder={intl.formatMessage({ id: 'app.header.search' })}
                />
              </div>
              <div className="header-meta">
                <div className="right-header">
                  {/* <div id="lang">
                    <Button onClick={this.handleLangChange} size="small">
                      <FormattedMessage id="app.header.lang" />
                    </Button>
                  </div> */}
                  {this.state.versions.length && this.props.showVersion && <Select size="small" onChange={this.onVersionChange} value={version}>
                    {this.state.versions.map((v)=> {
                      return <Option value={v} key={v}>{`v${v}`}</Option>
                    })}
                  </Select>}
                </div>
                {menuMode === 'horizontal' ? <div id="menu">{menu}</div> : null}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default injectIntl(Header);
