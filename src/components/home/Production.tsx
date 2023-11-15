import { Button, Flex, styled } from "@galacean/editor-ui";
import { FormattedMessage } from 'react-intl';
import { ArrowRightOutlined } from "@ant-design/icons";

const StyledH = styled('h2', {
  color: "$slate12",
  textAlign: "center",
  padding: "0 0 $4",
  fontSize: "2rem"
})

const StyledImage = styled('div', {
  width: 480,
  height: 420,
  backgroundColor: '#d8d8d8',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  borderRadius: 24,
})

const StyledButton = styled(Button, {
  bottom: "$0_5"
});

const StyledP = styled("p", {
  fontSize: "$2",
  padding: "0 $10",
  lineHeight: "$5",
  fontWeight: 300,
  minHeight: "6em",
})

export default function Production() {
  return (
    <Flex align="both">
      <Flex align="h" gap="lg" css={{
        paddingBottom: "$10",
        maxWidth: "1000px",
        '@media (max-width: 768px)': {
          flexDirection: "column",
        }
      }}>
        <Flex align="both" dir="column" gap="lg" css={{ position: "relative", flexGrow: 1, flexShrink: 0, flexBasis: '30%' }}>
          <StyledH>
            <FormattedMessage id="app.home.engine" />
          </StyledH>
          <StyledImage />
          <StyledP>
            <FormattedMessage id="app.home.engine.intro" />
          </StyledP>
          <Flex align="both" dir="column" gap="lg" css={{ position: "relative" }}>
            <Flex gap="lg">
              <a href="https://galacean.antgroup.com/editor">
                <StyledButton variant="outline" size="lg" round>
                  <FormattedMessage id="app.home.engine.use" />
                  <ArrowRightOutlined style={{ marginLeft: "5px", fontSize:"12px" }} />
                </StyledButton>
              </a>
              <a href="https://survey.alipay.com/apps/zhiliao/o1u1SSHk1">
                <StyledButton variant="light" size="lg" round>
                  <FormattedMessage id="app.home.engine.apply" />
                </StyledButton>
              </a>
            </Flex>
          </Flex>
        </Flex>

        <Flex align="both" dir="column" gap="lg" css={{ position: "relative", flexGrow: 1, flexShrink: 0, flexBasis: '30%' }}>
          <StyledH>
            <FormattedMessage id="app.home.effects" />
          </StyledH>
          <StyledImage style={{ backgroundImage: `url(https://mdn.alipayobjects.com/huamei_j9rjmc/afts/img/A*4uMTSYNQWygAAAAAAAAAAAAADvGmAQ/original)` }}/>
          <StyledP>
            <FormattedMessage id="app.home.effects.intro" />
          </StyledP>
          <a href="./effects">
            <StyledButton variant="outline" size="lg" round>
              <FormattedMessage id="app.home.effects.learn" />
              <ArrowRightOutlined style={{ marginLeft: "5px", fontSize:"12px" }} />
            </StyledButton>
          </a>
          {/* <Flex gap="lg">
            <a href="https://galacean.antgroup.com/editor">
              <StyledButton variant="outline" size="lg" round>
                <FormattedMessage id="app.home.engine.use" />
                <ArrowRightOutlined style={{ marginLeft: "5px", fontSize:"12px" }} />
              </StyledButton>
            </a>
            <a href="https://survey.alipay.com/apps/zhiliao/o1u1SSHk1">
              <StyledButton variant="light" size="lg" round>
                <FormattedMessage id="app.home.engine.apply" />
              </StyledButton>
            </a>
          </Flex>
          <StyledVideo playsInline autoPlay muted loop poster="https://mdn.alipayobjects.com/huamei_2uqjce/afts/img/A*aVJIToZjpB0AAAAAAAAAAAAADsF_AQ/fmt.webp">
            <source src="https://gw.alipayobjects.com/v/huamei_b4l2if/afts/video/iAMbRIrO7mYAAAAAAAAAAAAAK4eUAQBr" type="video/mp4" />
          </StyledVideo > */}
        </Flex>
      </Flex>
    </Flex>
  );
}