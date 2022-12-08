import React, { useRef, useContext } from "react";
import { CheckIcon } from "@radix-ui/react-icons";
import { AriaListBoxOptions } from "@react-aria/listbox";
import { Node, LoadingState } from "@react-types/shared";
import { ListState } from "react-stately";
import { useListBox, useOption, useListBoxSection } from "react-aria";

import { styled } from "../design-system";

import { VariantContext } from "./VariantContext";

import { basicItemStyle, contentStyle, labelStyle } from "../styles/list";

export { Item } from "react-stately";

const StyledList = styled("ul", contentStyle, {
  position: "absolute",
  width: "100%",
  minWidth: "max-content",
  marginTop: "$1",
  maxHeight: "calc(8 * $sizes$6 + $4)",
  overflowY: "auto",
  zIndex: 10,
  overflow: "auto",
  // maxHeight: "300",
  "&:focus-visible": {
    outline: "none"
  },
  "&:empty": {
    display: "none"
  }
});

const StyledListItem = styled("li", basicItemStyle, {
  variants: {
    checked: {
      true: {
        fontWeight: "bold",
        backgroundColor: "$slate5",
        color: "$slate12"
      }
    },
    focused: {
      true: {
        backgroundColor: "$slate5",
        color: "$slate12"
      }
    }
  }
});

export interface IListProps extends AriaListBoxOptions<unknown> {
  listboxRef?: React.RefObject<HTMLUListElement>;
  state: ListState<unknown>;
  loadingState?: LoadingState;
  onLoadMore?: () => void;
  loadable?: boolean;
}

export function ListBox(props: IListProps) {
  const ref = useRef<HTMLUListElement>();
  const { state, listboxRef = ref } = props;
  const { listBoxProps } = useListBox(props, state, listboxRef);

  const onScroll = (e: React.UIEvent) => {
    if (!props.loadable) return;
    const scrollOffset = e.currentTarget.scrollHeight - e.currentTarget.clientHeight * 2;
    if (e.currentTarget.scrollTop > scrollOffset && props.onLoadMore) {
      props.onLoadMore();
    }
  };

  return (
    <StyledList {...listBoxProps} ref={listboxRef} as="ul" onScroll={onScroll}>
      {[...state.collection].map((item) =>
        item.type === "section" ? (
          <ListSection key={item.key} section={item} state={state} />
        ) : (
          <ListItem key={item.key} item={item} state={state} />
        )
      )}
    </StyledList>
  );
}

const StyledSection = styled("li", labelStyle);

export interface IListSectionProps {
  section: Node<unknown>;
  state: ListState<unknown>;
}

export function ListSection(props: IListSectionProps) {
  const { section, state } = props;
  const { itemProps, headingProps, groupProps } = useListBoxSection({
    heading: section.rendered,
    "aria-label": section["aria-label"]
  });

  return (
    <>
      <StyledSection {...itemProps}>
        <span {...headingProps}>{section.rendered}</span>
        <StyledList {...groupProps}>
          {[...section.childNodes].map((node) => (
            <ListItem key={node.key} item={node} state={state} />
          ))}
        </StyledList>
      </StyledSection>
    </>
  );
}

type IListItemProps = {
  item: Node<unknown>;
  state: ListState<unknown>;
};

export function ListItem(props: IListItemProps) {
  const { item, state } = props;
  const { size } = useContext(VariantContext);
  const ref = useRef<HTMLLIElement>();
  const { optionProps, isSelected, isFocused } = useOption({ key: item.key }, state, ref);
  return (
    <StyledListItem {...optionProps} ref={ref} checked={isSelected} focused={isFocused} size={size}>
      <span>{item.rendered}</span>
      {isSelected && <CheckIcon />}
    </StyledListItem>
  );
}
