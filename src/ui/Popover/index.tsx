import React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import type { PopoverContentProps, PopoverProps } from "@radix-ui/react-popover";

import { styled } from "../design-system";

type IPopover = PopoverContentProps & {
  trigger: React.ReactNode;
  disabled?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const StyledContent = styled(PopoverPrimitive.Content, {
  position: "relative",
  borderRadius: "$2",
  padding: "$2",
  border: "1px solid $slate5",
  backgroundColor: "$slate1"
});

const Trigger = styled(PopoverPrimitive.Trigger, {
  variants: {
    disabled: {
      true: {
        pointerEvents: "none",
        userSelect: "none"
      }
    }
  }
});

export function Popover(props: IPopover) {
  const { trigger, children, disabled, onOpenChange, ...rest } = props;
  return (
    <PopoverPrimitive.Root onOpenChange={onOpenChange}>
      <Trigger asChild disabled={disabled}>
        {trigger}
      </Trigger>
      <StyledContent {...rest}>{children}</StyledContent>
    </PopoverPrimitive.Root>
  );
}

export const CloseTrigger = PopoverPrimitive.Close;
