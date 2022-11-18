import React from 'react';
import { FormattedMessage } from 'react-intl';
import { styled } from '../../ui/design-system';
import { Flex } from '../../ui/Flex';

const StyledFeature = styled("div", {
  flex: 1,
  maxWidth: "340px",
  padding: "0 2rem",
  borderRight: "1px solid $slate5",
  "&:last-child": {
    borderRight: "none"
  },
  "& h3": {
    fontSize: "$3",
    color: "$slate12",
    textAlign: "center",
    marginBottom: "$2"
  },
  "& p": {
    color: "$slate11",
    lineHeight: 1.5
  }
});

export default function Features() {
  return (
    <Flex align="h" gap="lg" css={{ padding: "$10 0" }}>
      <StyledFeature>
        <h3>
          <FormattedMessage id="app.home.features.component" />
        </h3>
        <p>
          <FormattedMessage id="app.home.features.component.intro" />
        </p>
      </StyledFeature>
      <StyledFeature>
        <h3>
          <FormattedMessage id="app.home.features.mobile" />
        </h3>
        <p>
          <FormattedMessage id="app.home.features.mobile.intro" />
        </p>
      </StyledFeature>
      <StyledFeature>
        <h3>
          <FormattedMessage id="app.home.features.f2e" />
        </h3>
        <p>
          <FormattedMessage id="app.home.features.f2e.intro" />
        </p>
      </StyledFeature>
    </Flex>
  );
}
