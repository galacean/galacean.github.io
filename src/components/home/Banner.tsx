import { ArrowRightOutlined, GithubOutlined, RocketOutlined } from '@ant-design/icons';
import { Button, Flex, keyframes, styled } from '@galacean/editor-ui';
import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
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
    width: "30rem",
    '@media (max-width: 768px)': {
      maxWidth: "90%"
    }
  }
});

const StyledSlogan = styled("p", {
  fontSize: "1.2rem",
  color: "$slate11",
  padding: "$5 0",
  '@media (max-width: 768px)': {
    fontSize: "$2"
  }
});

const LaunchButton = styled(Button, {
  backgroundImage: "linear-gradient(to right, #84fab0 0%, #8fd3f4 51%, #84fab0 100%)",
  transition: "0.5s",
  color: "white!important",
  backgroundSize: "200% auto",
  "&:hover" : {
    backgroundPosition: "right center"
  }
});

const float = keyframes({
	"0%": {
		transform: "translateY(0px)"
	},
	"50%": {
		transform: "translateY(-2px)"
	},
	"100%": {
		transform: "translateY(0px)"
	}
});


function Banner() {
  const context = useContext(AppContext);

  return (
    <StyledSection align="both" dir="column" gap="lg">
      <StyledHeading >
        <img
          src='https://mdn.alipayobjects.com/huamei_w1o8la/afts/img/A*Up_hTI7ccfoAAAAAAAAAAAAADsB_AQ/fmt.webp'
          alt='Galacean'
        />
      </StyledHeading>
      <StyledSlogan>
        <FormattedMessage id='app.home.slogan' />
      </StyledSlogan>
      <Flex gap="lg" css={{
        '@media (max-width: 768px)': {
          flexDirection: "column",
          textAlign: "center"
        }
      }}>
        <Link to={`/docs/${context.version}/${context.lang}/install`}>
          <Button variant="light" size="lg" round>
            <FormattedMessage id='app.home.start' />
            <ArrowRightOutlined style={{ marginLeft: "5px" }} />
          </Button>
        </Link>
        <a href='https://github.com/galacean/engine/discussions/categories/q-a' target='_blank'>
          <Button variant="secondary" size="lg" round>
            <GithubOutlined style={{ marginRight: "5px" }} />
            <FormattedMessage id='app.home.discussion' />
          </Button>
        </a>
        <a href='https://opencollective.com/oasis' target='_blank'>
          <LaunchButton variant="secondary" size="lg" css={context.theme === 'dark-theme' ? { backgroundImage: "linear-gradient(to right, #fbc2eb 0%, #a6c1ee 51%, #fbc2eb 100%)", color: "$slate6!important" } : {}} round>
            <RocketOutlined style={{ marginRight: "3px", fontSize: "18px", animation: `${float} 1000ms ease-in-out infinite` }} />
            <FormattedMessage id='app.home.sponsoring' />
          </LaunchButton>
        </a>
      </Flex>
    </StyledSection>
  );
}

export default Banner;
