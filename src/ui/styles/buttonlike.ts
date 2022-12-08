import { styled } from "../design-system";

export const basicStyle = styled(null, {
  all: "unset",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontWeight: 500,
  lineHeight: 1,
  border: "1px solid transparent",
  boxSizing: "border-box",
  cursor: "pointer",
  "&:focus-visible": {
    boxShadow: "0 0 0 2px $colors$blueA7"
  },
  "&:disabled": {
    backgroundColor: "$slate2",
    color: "$slate8",
    pointerEvents: "none",
    cursor: ""
  }
});
