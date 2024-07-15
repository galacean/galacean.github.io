import { Flex, styled } from "@galacean/editor-ui";
import React from 'react';
import { FormattedMessage } from 'react-intl';

const StyledFooter = styled("footer", {
  marginTop: "$10",
  borderTop: "1px solid $slate5"
});


const StyledHeart = styled("span", {
  padding: "0 $1",
  fontSize: "$4"
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
