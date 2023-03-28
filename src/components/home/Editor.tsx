import React from 'react';
import { FormattedMessage } from 'react-intl';
import { styled } from "@oasis-engine/editor-design-system";
import { Button, Flex } from '@oasis-engine/editor-components';
import { ArrowRightOutlined } from '@ant-design/icons';

const StyledEditor = styled("div", {
  borderTop: "1px solid $slate5",
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
          <StyledButton variant="primary" size="md">
            <FormattedMessage id="app.home.editor.apply" />
            <ArrowRightOutlined style={{ marginLeft: "5px" }} />
          </StyledButton>
        </a>
        <StyledImg src="//mdn.alipayobjects.com/huamei_2uqjce/afts/img/A*Y0BfRoL5p3AAAAAAAAAAAAAADsF_AQ/fmt.webp" alt="" />
      </Flex>
    </StyledEditor>
  );
}