import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Flex, styled } from "@galacean/editor-ui";
import { FormattedMessage } from 'react-intl';

const StyledEditor = styled("div", {
  padding: "$8 0 $20",
  "& h2": {
    color: "$slate12",
    textAlign: "center",
    padding: "0 0 $4",
    fontSize: "2rem"
  }
});

const StyledVideo = styled('video', {
  width: "80%",
  maxWidth: "1000px",
  borderRadius: "$3"
});

const StyledButton = styled(Button, {
  bottom: "$0_5"
});

const StyledP = styled("p", {
  fontSize: "$2",
  padding: "0 $10",
  lineHeight: "$5",
  fontWeight: 300
})

export default function Editor() {
  return (
    <StyledEditor>
      <h2>
        <FormattedMessage id="app.home.editor" />
      </h2>
      <Flex align="both" dir="column" gap="lg" css={{ position: "relative" }}>
        <StyledP>
          <FormattedMessage id="app.home.editor.intro" />
        </StyledP>
        <Flex gap="lg">
          <a href="https://galacean.antgroup.com/editor">
            <StyledButton variant="primary" size="lg" round>
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
        </StyledVideo >
      </Flex>
    </StyledEditor>
  );
}