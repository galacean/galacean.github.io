import React, { ComponentProps } from "react";

import { styled, VariantProps, CSS } from "../design-system";

const StyledFlex = styled("div", {
  display: "flex",
  boxSizing: "border-box",
  variants: {
    dir: {
      column: { flexDirection: "column" },
      row: { flexDirection: "row" },
      rr: { flexDirection: "row-reverse" },
      cr: { flexDirection: "column-reverse" }
    },
    end: {
      true: {
        justifyContent: "flex-end"
      }
    },
    justifyContent: {
      center: {
        justifyContent: "center"
      },
      between: {
        justifyContent: "space-between"
      },
      around: {
        justifyContent: "space-around"
      }
    },
    align: {
      both: {
        alignItems: "center",
        justifyContent: "center"
      },
      v: {
        alignItems: "center"
      },
      h: {
        justifyContent: "center"
      }
    },
    wrap: {
      true: { flexWrap: "wrap" },
      false: { flexWrap: "nowrap" },
      reverse: { flexWrap: "wrap-reverse" }
    },
    gap: {
      none: { gap: "$none" },
      xs: { gap: "$1" },
      sm: { gap: "$2" },
      md: { gap: "$3" },
      lg: { gap: "$4" }
    }
  },
  defaultVariants: {
    dir: "row",
    wrap: true
  }
});

export type IFlexProps = VariantProps<typeof StyledFlex> &
  Omit<JSX.IntrinsicElements["div"], "gap"> & {
    css?: CSS;
    asChild?: any;
  } & ComponentProps<typeof StyledFlex>;

export const Flex = React.forwardRef<HTMLDivElement, React.PropsWithChildren<IFlexProps>>(function Flex(
  props: IFlexProps,
  ref
) {
  return (
    <StyledFlex {...props} ref={ref}>
      {props.children}
    </StyledFlex>
  );
});
