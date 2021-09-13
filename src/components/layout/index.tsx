import React from 'react';
import { addLocaleData, IntlProvider } from 'react-intl';
import { ConfigProvider } from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';
import Media from 'react-media';
import enLocale from '../../locale/en-US';
import cnLocale from '../../locale/zh-CN';
import * as utils from '../utils';
import '../../static/style';
import Header from './Header';
import Footer from './Footer';
// import Footer from './Footer';

export interface LayoutProps {
  location: {
    pathname: string;
  };
  isMobile: boolean;
  children: React.ReactElement<LayoutProps>;
}

interface LayoutState {
  appLocale: {
    locale: any;
    messages: any;
  };
}

export class Layout extends React.Component<LayoutProps, LayoutState> {
  constructor(props: LayoutProps) {
    super(props);
    const appLocale = utils.isZhCN() ? cnLocale : enLocale;
    addLocaleData(appLocale.data);
    this.state = {
      appLocale,
    };
  }

  render() {
    const { children, location, ...restProps } = this.props;
    const { pathname } = location;
    const { appLocale } = this.state;
    return (
      <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
        <ConfigProvider locale={enUS}>
          <div
            className={`page-wrapper ${
              (pathname === '/' || pathname === 'index-cn') && 'index-page-wrapper'
            }`}
          >
            <Header {...restProps} location={location} />
            {children}
            <Footer {...restProps} location={location}/>
          </div>
        </ConfigProvider>
      </IntlProvider>
    );
  }
}

const WrapperLayout = (props: LayoutProps) => (
  <Media query="(max-width: 996px)">
    {(isMobile) => {
      const isNode = typeof window === 'undefined';
      return !isNode && <Layout {...props} isMobile={isMobile} />;
    }}
  </Media>
);
export default WrapperLayout;
