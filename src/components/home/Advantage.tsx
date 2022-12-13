import React from 'react';
import { FormattedMessage } from 'react-intl';
import { styled } from  "@oasis-engine/editor-design-system";
import { Flex } from '@oasis-engine/editor-components';

const StyledFeature = styled("div", {
  flex: 1,
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
    lineHeight: 1.8,
    fontSize: "$2"
  },
  '@media (max-width: 768px)': {
    padding: "0 $10 $6",
  }
});

const StyleWrap = styled("div", {
});

export default function Features() {
  return (
    <Flex align="both">
      <Flex align="h" gap="lg" css={{
        paddingBottom: "$10",
        maxWidth: "1000px",
        '@media (max-width: 768px)': {
          flexDirection: "column",
        }
      }}>
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
    </Flex>
  );
}
