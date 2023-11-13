import { Button, Flex, styled } from "@galacean/editor-ui";
import { FormattedMessage } from 'react-intl';

const StyledImage = styled('div', {
  backgroundImage: `url(https://mdn.alipayobjects.com/huamei_j9rjmc/afts/img/A*dgoqS7uqgasAAAAAAAAAAAAADvGmAQ/original)`,
  width: 300,
  height: 500,
  backgroundColor: 'Gray',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
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
        alignItems: "flex-start",
        '@media (max-width: 768px)': {
          flexDirection: "column",
        }
      }}>
        <Flex align="both" dir="column" gap="lg" css={{ position: "relative", flexGrow: 1, flexShrink: 0, flexBasis: '30%' }}>
          <h2>
            <FormattedMessage id="app.home.engine" />
          </h2>
          <StyledImage />
          <StyledP>
            <FormattedMessage id="app.home.engine.intro" />
          </StyledP>
          <StyledButton variant="outline" size="lg" round>
            <FormattedMessage id="app.home.engine.use" />
          </StyledButton>
        </Flex>

        <Flex align="both" dir="column" gap="lg" css={{ position: "relative", flexGrow: 1, flexShrink: 0, flexBasis: '30%' }}>
          <h2>
            <FormattedMessage id="app.home.editor" />
          </h2>
          <StyledImage />
          <StyledP>
            <FormattedMessage id="app.home.editor.intro" />
          </StyledP>
          <a href="https://galacean.antgroup.com/editor">
            <StyledButton variant="outline" size="lg" round>
              <FormattedMessage id="app.home.editor.use" />
            </StyledButton>
          </a>
        </Flex>

        <Flex align="both" dir="column" gap="lg" css={{ position: "relative", flexGrow: 1, flexShrink: 0, flexBasis: '30%' }}>
          <h2>
            <FormattedMessage id="app.home.effect" />
          </h2>
          <StyledImage />
          <StyledP>
            <FormattedMessage id="app.home.effect.intro" />
          </StyledP>
          <a href="https://galacean.antgroup.com/effects">
            <StyledButton variant="outline" size="lg" round>
              <FormattedMessage id="app.home.effect.use" />
            </StyledButton>
          </a>
          {/* <Flex gap="lg">
            <a href="https://galacean.antgroup.com/editor">
              <StyledButton variant="outline" size="lg" round>
                <FormattedMessage id="app.home.editor.use" />
                <ArrowRightOutlined style={{ marginLeft: "5px", fontSize:"12px" }} />
              </StyledButton>
            </a>
            <a href="https://survey.alipay.com/apps/zhiliao/o1u1SSHk1">
              <StyledButton variant="light" size="lg" round>
                <FormattedMessage id="app.home.editor.apply" />
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