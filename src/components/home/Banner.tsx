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


function Banner() {
  const { setVersion, versions, lang } = useContext(AppContext);
  const stable = versions[versions.length - 2];
  const beta = versions[versions.length - 1];
  const stableVersion = stable?.version;
  const betaVersion = beta?.version;
  const stableSpecificVersion = JSON.parse(stable?.packages)["@galacean/engine"].version;
  const betaSpecificVersion = JSON.parse(beta?.packages)["@galacean/engine"].version;

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
        <Link to={`/docs/${stableVersion}/${lang}/install`} onClick={() => {
          setVersion(stableVersion);
          localStorage.setItem('version', stableVersion);
        }}>
          <Button variant="primary" size="lg" round>
            {stableSpecificVersion}&nbsp;
            <FormattedMessage id='app.home.stable' />
            <ArrowRightOutlined style={{ marginLeft: "5px", fontSize:"12px" }} />
          </Button>
        </Link>
        <Link to={`/docs/${betaVersion}/${lang}/install`} onClick={() => {
          setVersion(betaVersion);
          localStorage.setItem('version', betaVersion);
        }}>
          <Button variant="light" size="lg" round>
            {betaSpecificVersion}&nbsp;
            <FormattedMessage id='app.home.beta' />
            <ArrowRightOutlined style={{ marginLeft: "5px", fontSize:"12px" }} />
          </Button>
        </Link>
        <a href='https://github.com/orgs/galacean/discussions' target='_blank'>
          <Button variant="secondary" size="lg" round>
            <GithubOutlined style={{ marginRight: "5px" }} />
            <FormattedMessage id='app.home.discussion' />
          </Button>
        </a>
      </Flex>
    </StyledSection>
  );
}

export default Banner;
