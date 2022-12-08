import React, { useState, PropsWithChildren, ComponentProps } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { styled, keyframes, VariantProps, CSS } from "../design-system";

const scaleIn = keyframes({
  "0%": { opacity: 0, transform: "scale(0)" },
  "100%": { opacity: 1, transform: "scale(1)" }
});

const StyledContent = styled(TooltipPrimitive.Content, {
  display: "flex",
  alignItems: "center",
  fontSize: "$sm",
  padding: "$1",
  backgroundColor: "$slate3",
  borderRadius: "$1",
  color: "$slate10",
  transformOrigin: "var(--radix-tooltip-content-transform-origin)",
  animation: `${scaleIn} 0.16s ease-out forwards`,
  variants: {
    size: {
      sm: {
        fontSize: "$sm",
        padding: "$1 $2"
      },
      md: {
        fontSize: "$md",
        padding: "$2 $3"
      }
    }
  },
  defaultVariants: {
    size: "sm"
  }
});

const StyledArrow = styled(TooltipPrimitive.Arrow, {
  fill: "$slate3"
});

type ITooltipProps = {
  /** The content in the tooltip */
  content?: React.ReactNode;
  /** Show arrow beside content */
  arrow?: boolean;
  /** CSS */
  css?: CSS;
} & ComponentProps<typeof TooltipPrimitive.Root> &
  Pick<ComponentProps<typeof TooltipPrimitive.Content>, "side" | "sideOffset"> &
  Pick<VariantProps<typeof StyledContent>, "size">;

function Tooltip(props: PropsWithChildren<ITooltipProps>) {
  const {
    children,
    content,
    arrow = false,
    side = "top",
    size,
    css,
    sideOffset = 4,
    delayDuration = 300,
    ...rest
  } = props;
  return (
    <TooltipPrimitive.Root delayDuration={delayDuration} {...rest}>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <StyledContent sideOffset={sideOffset} side={side} size={size} css={css}>
        {arrow && <StyledArrow />}
        {content}
      </StyledContent>
    </TooltipPrimitive.Root>
  );
}

export { Tooltip };
