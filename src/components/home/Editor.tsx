import { ArrowRightOutlined } from '@ant-design/icons';
import { Button, Flex, styled } from "@galacean/editor-ui";
import { FormattedMessage } from 'react-intl';

const StyledEditor = styled("div", {
  padding: "$8 0 $20",
  "& h2": {
    color: "$slate12",
    textAlign: "center",
    padding: "0 0 $4",
    fontSize: "3rem"
  }
});

const StyledImg = styled('img', {
  width: "80%",
  maxWidth: "1000px",
  borderRadius: "$4",
  border: "8px solid $slate4"
});

const StyledButton = styled(Button, {
  bottom: "$0_5"
});

const StyledP = styled("p", {
  color: "$slate11",
  fontSize: "$2",
  padding: "0 $10",
  lineHeight: "$5"
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
        <a href="https://survey.alipay.com/apps/zhiliao/o1u1SSHk1">
          <StyledButton variant="light" size="lg" round>
            <FormattedMessage id="app.home.editor.apply" />
            <ArrowRightOutlined style={{ marginLeft: "5px" }} />
          </StyledButton>
        </a>
        <StyledImg src="//mdn.alipayobjects.com/huamei_2uqjce/afts/img/A*Y0BfRoL5p3AAAAAAAAAAAAAADsF_AQ/fmt.webp" alt="" />
      </Flex>
    </StyledEditor>
  );
}