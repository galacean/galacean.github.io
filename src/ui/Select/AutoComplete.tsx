import * as React from "react";
import { useComboBoxState } from "react-stately";
import { useComboBox, useFilter } from "react-aria";
import { Search as SearchIcon } from "iconoir-react";
import type { ComboBoxProps } from "@react-types/combobox";
import type { LoadingState } from "@react-types/shared";

import { styled } from "../design-system";

import { ListBox } from "./ListBox";
import { Popover } from "./Popover";
import { VariantProvider } from "./VariantContext";

import { Spin } from "../Spin";
import { Input } from "../Input";

const StyledRoot = styled("div", {
  position: "relative"
});

type AutocompleteProps<T> = ComboBoxProps<T> & {
  loadingState?: LoadingState;
  onLoadMore?: () => void;
  size?: "sm" | "md" | "lg";
};

export function Autocomplete<T extends object>(props: AutocompleteProps<T>) {
  const { contains } = useFilter({ sensitivity: "base" });
  const state = useComboBoxState({ ...props, defaultFilter: contains, allowsEmptyCollection: true });

  const inputRef = React.useRef(null);
  const inputRootRef = React.useRef(null);
  const listBoxRef = React.useRef<HTMLUListElement>(null);
  const popoverRef = React.useRef(null);

  const { inputProps, listBoxProps } = useComboBox(
    {
      ...props,
      inputRef,
      listBoxRef,
      popoverRef
    },
    state
  );

  return (
    <VariantProvider size={props.size}>
      <StyledRoot>
        <Input
          {...(inputProps as any)}
          ref={inputRef}
          rootRef={inputRootRef}
          startSlot={<SearchIcon />}
          size={props.size}
          endSlot={
            (props.loadingState === "loading" || props.loadingState === "filtering") && <Spin size={props.size} />
          }
        />
        {state.isOpen && (
          <Popover popoverRef={popoverRef} isOpen={state.isOpen} onClose={state.close}>
            <ListBox
              {...listBoxProps}
              listboxRef={listBoxRef}
              state={state}
              loadingState={props.loadingState}
              onLoadMore={props.onLoadMore}
            />
          </Popover>
        )}
      </StyledRoot>
    </VariantProvider>
  );
}

export { useAsyncList } from "react-stately";
