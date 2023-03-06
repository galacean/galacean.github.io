import React from 'react';
import { toHtml } from 'hast-util-to-html';
import { styled } from "@oasis-engine/editor-design-system";

const StyledToc = styled("div", {
  position: "fixed",
  top: "$16",
  right: 0,
  zIndex: 1,
  padding: "$4",
  margin: "$2 $4 $2 $2",
  fontSize: "$1",
  color: "$slate11",
  maxWidth: "200px",
  "& ol": {
    "& > li": {
      listStyle: "none",
      marginLeft: "$3",
      "& p": {
        padding: "$0_5 0"
      }
    }
  },
  '@media (max-width: 768px)': {
    display: "none"
  }
});

const DocToc: React.FC = (props: any) => {
  return (
    <StyledToc dangerouslySetInnerHTML={{
      __html: toHtml(props.node),
    }}>
    </StyledToc>
  );
};
export default DocToc;
