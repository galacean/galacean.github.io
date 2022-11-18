import React, { useRef } from "react";
import { ArrowSeparateVertical } from "iconoir-react";
import { useButton, useSelect, HiddenSelect, useFocusRing, mergeProps } from "react-aria";
import { useSelectState } from "react-stately";
import { AriaSelectProps } from "@react-types/select";

import { styled, css, keyframes, VariantProps, CSS } from "../design-system";

import { ListBox } from "./ListBox";
import { VariantProvider } from "./VariantContext";
import { Popover } from "./Popover";

import { Button, IButtonProps } from "../Button";

const StyledSelectRoot = styled("div", {
  position: "relative",
  [`& ${Button}`]: {
    width: "100%",
    justifyContent: "space-between",
    position: "relative"
  }
});

const SelectedLabel = styled("span", {
  display: "block",
  overflow: "hidden",
  width: "100%",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap"
});

type ISelectProps = Pick<IButtonProps, "variant" | "size"> &
  AriaSelectProps<object> &
  VariantProps<typeof StyledSelectRoot> & { css?: CSS };

export function Select(props: ISelectProps) {
  // props.label = props.label || 'Select placeholder label';
  const state = useSelectState(props);
  const triggerRef = useRef<HTMLButtonElement>();

  const { triggerProps, valueProps, menuProps } = useSelect(props, state, triggerRef);
  const { buttonProps } = useButton(triggerProps, triggerRef);
  const { focusProps } = useFocusRing();
  const selectedItem = state.collection.getItem(state.selectedKey);

  return (
    <VariantProvider size={props.size}>
      <StyledSelectRoot css={props.css}>
        <HiddenSelect triggerRef={triggerRef} state={state} label={props.label} name={props.name} />
        <Button
          size={props.size}
          ref={triggerRef}
          {...mergeProps(buttonProps, focusProps)}
          variant="secondary"
          css={{ width: "100%", justifyContent: "space-between", paddingRight: "$1" }}
        >
          <SelectedLabel {...valueProps}>{selectedItem ? selectedItem.rendered : "select an option"}</SelectedLabel>
          <ArrowSeparateVertical />
        </Button>
        {state.isOpen && (
          <Popover isOpen={state.isOpen} onClose={state.close}>
            <ListBox {...menuProps} state={state} />
          </Popover>
        )}
      </StyledSelectRoot>
    </VariantProvider>
  );
}

export { Item } from "react-stately";
