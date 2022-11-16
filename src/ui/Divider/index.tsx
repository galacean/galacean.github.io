import { styled } from "../design-system";

const StyledDivider = styled("span", {
  variants: {
    type: {
      horizontal: {
        borderBottom: "1px solid $colors$slate7",
        paddingBottom: "$1",
        marginBottom: "$1",
        width: "100%"
      },
      vertical: {
        borderRight: "1px solid $colors$slate7",
        paddingRight: "$1",
        marginRight: "$1",
        height: "60%"
      }
    }
  },
  defaultVariants: {
    type: "vertical"
  }
});

export { StyledDivider as Divider };
