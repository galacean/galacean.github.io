import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'antd';
import { ZhihuOutlined, TwitterOutlined, YuqueOutlined, WechatOutlined, DingtalkOutlined, GithubOutlined } from '@ant-design/icons';
import { Icon } from './Icon';

class Footer extends React.Component<{
  location: {
    pathname: string;
  };
}> {
  render() {
    return (
      <footer id="footer">
        <div className="footer-wrap">
          <Row>
            <Col md={8} sm={24} xs={24}>
              <div className="footer-center">
                <h2>
                  <FormattedMessage id="app.footer.resources" />
                </h2>
                <div>
                  <a target="_blank " href="https://github.com/oasis-engine">
                    GitHub
                  </a>
                </div>
                <div>
                  <a target="_blank " href="https://oasis-engine.gitee.io/">
                    <FormattedMessage id="app.footer.chinamirror" />
                  </a>
                </div>
              </div>
            </Col>
            <Col md={8} sm={24} xs={24}>
              <div className="footer-center">
                <h2>
                  <FormattedMessage id="app.footer.community" />
                </h2>
                <div>
                  <a target="_blank" rel="noopener noreferrer" href="https://www.zhihu.com/column/c_1369047387231592448">
                    <ZhihuOutlined />&nbsp;&nbsp;
                    <FormattedMessage id="app.community.zhihu" />
                  </a>
                </div>
                <div>
                  <a target="_blank" rel="noopener noreferrer" href="https://juejin.cn/team/6930507995474313230/posts">
                    <Icon type="icon-juejin" />&nbsp;&nbsp;
                    <FormattedMessage id="app.community.juejin" />
                  </a>
                </div>
                <div>
                  <a target="_blank" rel="noopener noreferrer" href="https://www.yuque.com/oasis-engine/blog">
                    <YuqueOutlined />&nbsp;&nbsp;
                    <FormattedMessage id="app.community.yuque" />
                  </a>
                </div>
                <div>
                  <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/OasisEngine">
                    <TwitterOutlined />&nbsp;&nbsp;
                    <FormattedMessage id="app.community.twitter" />
                  </a>
                </div>
                <div>
                  <WechatOutlined />&nbsp;&nbsp;
                  <FormattedMessage id="app.footer.wechat" />
                </div>
                <img src="https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*dLIgTJhxjnEAAAAAAAAAAAAAARQnAQ" alt="" />
              </div>
            </Col>
            <Col md={8} sm={24} xs={24}>
              <div className="footer-center">
                <h2>
                  <FormattedMessage id="app.footer.help" />
                </h2>
                <div>
                  <a target="_blank" rel="noopener noreferrer" href="https://github.com/oasis-engine/engine/issues">
                    <GithubOutlined />&nbsp;&nbsp;
                    <FormattedMessage id="app.footer.issues" />
                  </a>
                </div>
                <div>
                  <DingtalkOutlined />&nbsp;&nbsp;
                  <FormattedMessage id="app.footer.dingtalk" />
                </div>
                <img src="https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*i6JhSZk1EiEAAAAAAAAAAAAAARQnAQ" alt="" />
              </div>
            </Col>
          </Row>
        </div>
        <div className="bottom-bar">
          Made with <span className="heart">❤</span> by
          <a target="_blank" rel="noopener noreferrer" href="https://www.zhihu.com/org/ma-yi-richlab-qian-duan-tuan-dui-76">
            <FormattedMessage id="app.footer.company" />
          </a>
        </div>
      </footer>
    );
  }
}

export default Footer;
