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
        <Flex align="both" css={{ padding: "$4", fontSize: "$1" }}>
          Made with <StyledHeart>❤</StyledHeart> by &nbsp;
          <FormattedMessage id='app.footer.company' />
        </Flex>
      </StyledFooter>
    );
  }
}

export default Footer;
