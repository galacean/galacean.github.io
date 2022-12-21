import { ArrowRightOutlined, GithubOutlined, HeartFilled } from '@ant-design/icons';
import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Button } from '@oasis-engine/editor-components';
import { styled } from  "@oasis-engine/editor-design-system";
import { Flex } from '@oasis-engine/editor-components';
import { AppContext } from '../contextProvider';

const StyledSection = styled(Flex, {
  padding: "$24 0",
  '@media (max-width: 768px)': {
    padding: "$20 0"
  }
});

const StyledHeading = styled("h1", {
  textAlign: "center",
  "& img": {
    width: "40rem",
    '@media (max-width: 768px)': {
      maxWidth: "90%"
    }
  }
});

const StyledSlogan = styled("p", {
  fontSize: "1.2rem",
  color: "$slate11",
  '@media (max-width: 768px)': {
    fontSize: "$2"
  }
});


function Banner() {
  const context = useContext(AppContext);

  return (
    <StyledSection align="both" dir="column" gap="lg">
      <StyledHeading css={context.theme === 'dark-theme' ? { filter: "invert(0.9)" } : {}}>
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
      <Flex gap="lg" css={{
        marginTop: "$4",
        '@media (max-width: 768px)': {
          flexDirection: "column",
          textAlign: "center"
        }
      }}>
        <Link to={`/docs/${context.version}/${context.lang}`}>
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
