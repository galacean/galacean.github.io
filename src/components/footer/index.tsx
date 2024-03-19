import {
  DingtalkOutlined,
  GithubOutlined,
  TwitterOutlined,
  WechatOutlined,
  YuqueOutlined,
  ZhihuOutlined
} from '@ant-design/icons';
import { Flex, styled } from "@galacean/editor-ui";
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Icon } from '../../ui/Icon';

const StyledFooter = styled("footer", {
  marginTop: "$10",
  borderTop: "1px solid $slate5"
});

const StyledGroup = styled("ul", {
  justifyContent: "center",
  padding: "$8 0 $4",
  display: "flex",
  gap: "$10",
  fontWeight: 300,
  fontSize: "$2",
  lineHeight: 1.8,
  "& li": {
    textAlign: "center",
  },
  "& a": {
    display: "block"
  },
  "& img": {
    marginTop: "$1"
  }
});

const StyledIcon = styled("span", {
  marginRight: "$2"
});

const StyledHeart = styled("span", {
  padding: "0 $1",
  fontSize: "$4"
});

const StyledQRCode = styled("img", {
  border: "1px solid $slate9",
  borderRadius: "3px"
});

class Footer extends React.Component<{}> {
  render() {
    return (
      <StyledFooter>
        <StyledGroup css={{
          '@media (max-width: 768px)': {
            flexDirection: "column",
            textAlign: "center",
            gap: "$2"
          }
        }}>
          <li>
            <a target='_blank' rel='noopener noreferrer' href='https://www.zhihu.com/column/c_1369047387231592448'>
              <StyledIcon>
                <ZhihuOutlined />
              </StyledIcon>
              <FormattedMessage id='app.community.zhihu' />
            </a>
          </li>
          <li>
            <a target='_blank' rel='noopener noreferrer' href='https://juejin.cn/team/6930507995474313230/posts'>
              <StyledIcon>
                <Icon type='icon-juejin' />
              </StyledIcon>
              <FormattedMessage id='app.community.juejin' />
            </a>
          </li>
          <li>
            <a target='_blank' rel='noopener noreferrer' href='https://www.yuque.com/oasis-engine/blog'>
              <StyledIcon>
                <YuqueOutlined />
              </StyledIcon>
              <FormattedMessage id='app.community.yuque' />
            </a>
          </li>
          <li>
            <a target='_blank' rel='noopener noreferrer' href='https://twitter.com/OasisEngine'>
              <StyledIcon>
                <TwitterOutlined />
              </StyledIcon>
              <FormattedMessage id='app.community.twitter' />
            </a>
          </li>
          <li>
            <a target='_blank' rel='noopener noreferrer' href='https://github.com/orgs/galacean/discussions'>
              <StyledIcon>
                <GithubOutlined />
              </StyledIcon>
              <FormattedMessage id='app.footer.issues' />
            </a>
          </li>
        </StyledGroup>
        <StyledGroup>
          <li>
            <div>
              <StyledIcon>
                <WechatOutlined />
              </StyledIcon>
              <FormattedMessage id='app.footer.wechat' />
            </div>
            <StyledQRCode width="100" height="100" src='https://mdn.alipayobjects.com/huamei_2uqjce/afts/img/A*uinbS4soUJAAAAAAAAAAAAAADsF_AQ/fmt.webp' alt='' style={{
            }} />
          </li>
          <li>
            <div>
              <StyledIcon>
                <DingtalkOutlined />
              </StyledIcon>
              <FormattedMessage id='app.footer.dingtalk' />
            </div>
            <StyledQRCode width="100" height="100" src='https://mdn.alipayobjects.com/huamei_2uqjce/afts/img/A*8RKoRZmX0VgAAAAAAAAAAAAADsF_AQ/original' alt='' style={{
            }} />
          </li>
        </StyledGroup>
        <Flex align="both" css={{ padding: "$4", fontSize: "$1" }}>
          Made with <StyledHeart>❤</StyledHeart> by &nbsp;
          <FormattedMessage id='app.footer.company' />
        </Flex>
      </StyledFooter>
    );
  }
}

export default Footer;
