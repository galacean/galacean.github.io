import { ArrowRightOutlined, GithubOutlined, HeartFilled } from '@ant-design/icons';
import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Button } from '../../ui/Button';
import { styled } from '../../ui/design-system';
import { Flex } from '../../ui/Flex';
import { AppContext } from '../contextProvider';

const StyledSection = styled(Flex, {
  maxWidth: "1500px",
  padding: "30px 0"
});

const StyledHeading = styled("h1", {
  "& img": {
    width: "40rem"
  }
});

const StyledSlogan = styled("p", {
  fontSize: "1.2rem",
  color: "$slate11"
});


function Banner() {
  const context = useContext(AppContext);
  return (
    <StyledSection align="both" dir="column" gap="lg">
      <StyledHeading>
        <img
          src='https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*Xwt7RZ-2FrUAAAAAAAAAAAAAARQnAQ'
          alt='Oasis Engine'
        />
      </StyledHeading>
      <StyledSlogan>
        <FormattedMessage id='app.home.slogan' />
      </StyledSlogan>
      <Flex gap="md">
        <a href="https://github.com/ant-galaxy/oasis-engine/stargazers" target='_blank'>
          <img src="https://img.shields.io/github/stars/ant-galaxy/oasis-engine?style=social" alt="github stars" />
        </a>
        <a href="https://www.npmjs.com/package/oasis-engine" target='_blank'>
          <img src="https://img.shields.io/npm/dm/oasis-engine.svg" alt="npm download" />
        </a>
      </Flex>
      <Flex gap="lg" css={{marginTop: "$4"}}>
        <Link to={`/docs/latest/${context.lang}`}>
          <Button variant="primary">
            <FormattedMessage id='app.home.start' />
            <ArrowRightOutlined style={{ marginLeft: "5px" }} />
          </Button>
        </Link>
        <a href='https://github.com/ant-galaxy/oasis-engine/discussions/categories/q-a' target='_blank'>
          <Button>
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
      </Flex>
    </StyledSection>
  );
}

export default Banner;
