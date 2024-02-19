import { Button, Flex, styled } from "@galacean/editor-ui";
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { ArrowRightOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { AppContext } from "../contextProvider";

const StyledH = styled(Flex, {
  minHeight: "$12",
  color: "$slate12",
  fontSize: "1.8em",
  fontWeight: 800,
  fontStyle: "italic",
  whiteSpace: "nowrap",
})

const StyledIcon = styled("img", {
  width: "$14",
  paddingRight: "$3"
});

const StyledCard = styled('div', {
  minHeight: "400px",
  backgroundColor: "$slate3",
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center bottom',
  borderRadius: "24px",
  padding: "$8",
  flex: 1,
  '@media (max-width: 768px)': {
    margin: "0 $4"
  }
})

const StyledButton = styled(Button, {
  bottom: "$0_5"
});

const StyledP = styled("p", {
  fontSize: "$2",
  lineHeight: "$5",
  fontWeight: 300,
  padding: "$2 0 $6"
})

export default function Production() {
  const { setVersion, versions, lang } = useContext(AppContext);
  const beta = versions[versions.length - 1];
  const betaVersion = beta?.version;

  return (
    <Flex align="both">
      <Flex align="h" css={{
        padding: "$20 0 $10",
        gap: "60px",
        width: "1000px",
        '@media (max-width: 768px)': {
          flexDirection: "column",
          padding: "$10 0"
        }
      }}>
        <StyledCard style={{ backgroundImage: `url(https://mdn.alipayobjects.com/huamei_w1o8la/afts/img/A*cOUgSYMpo1cAAAAAAAAAAAAADsB_AQ/fmt.webp)` }}>
          <StyledH align="v" wrap={false}>
            <FormattedMessage id="app.home.engine" />
          </StyledH>
          <StyledP>
            <FormattedMessage id="app.home.slogan" />
          </StyledP>
          <Flex align="h" dir="column" gap="lg" css={{ position: "relative" }}>
            <Flex gap="lg">
              <Link to={`/docs/${betaVersion}/${lang}/getting-started-overview`} onClick={() => {
                setVersion(betaVersion);
                localStorage.setItem('version', betaVersion);
              }}>
                <StyledButton variant="light" size="lg" round>
                  <FormattedMessage id="app.home.engine.use" />
                  <ArrowRightOutlined style={{ marginLeft: "5px", fontSize: "12px" }} />
                </StyledButton>
              </Link>
              <a href="https://survey.alipay.com/apps/zhiliao/o1u1SSHk1">
                <StyledButton variant="light" size="lg" round>
                  <FormattedMessage id="app.home.engine.apply" />
                </StyledButton>
              </a>
            </Flex>
          </Flex>
        </StyledCard>

        <StyledCard style={{ backgroundImage: `url(https://mdn.alipayobjects.com/huamei_w1o8la/afts/img/A*ceScRpTCYmkAAAAAAAAAAAAADsB_AQ/fmt.webp)` }}>
          <StyledH align="v" wrap={false}>
            <StyledIcon src="https://mdn.alipayobjects.com/huamei_w1o8la/afts/img/A*iX_AQJ118e0AAAAAAAAAAAAADsB_AQ/original" alt="" />
            <FormattedMessage id="app.home.effects" />
          </StyledH>
          <StyledP>
            <FormattedMessage id="app.home.effects.intro" />
          </StyledP>
          <a href="./effects">
            <StyledButton variant="light" size="lg" round>
              <FormattedMessage id="app.home.effects.learn" />
              <ArrowRightOutlined style={{ marginLeft: "5px", fontSize: "12px" }} />
            </StyledButton>
          </a>
        </StyledCard>
      </Flex>
    </Flex>
  );
}