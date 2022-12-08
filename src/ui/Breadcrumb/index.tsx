import React, { useRef, ReactElement } from "react";
import { SlashIcon } from "@radix-ui/react-icons";
import { styled } from "../design-system";
import { useBreadcrumbs, useBreadcrumbItem } from "react-aria";

const StyledBreadcrumb = styled("nav", {
  display: "flex",
  lineHeight: 1,
  alignItems: "center",
  color: "$slate11"
});

function Breadcrumb(props) {
  const { navProps } = useBreadcrumbs(props);
  const children = React.Children.toArray(props.children);
  return (
    <StyledBreadcrumb {...navProps}>
      {children.map((child, i) =>
        React.cloneElement(child as ReactElement, {
          isCurrent: i === children.length - 1
        })
      )}
    </StyledBreadcrumb>
  );
}

const StyledBreadcrumbItem = styled("li", {
  display: "flex",
  borderRadius: "$1",
  alignItems: "center",
  fontSize: "$1",
  color: "$slate9",
  outline: "none",
  cursor: "pointer",
  userSelect: "none",
  '&[data-current="true"]': {
    color: "$slate11"
  }
});

function BreadcrumbItem(props) {
  const { isCurrent, ...rest } = props;
  const ref = useRef();
  const { itemProps } = useBreadcrumbItem(
    {
      ...rest,
      elementType: "span"
    },
    ref
  );

  return (
    <StyledBreadcrumbItem {...itemProps} data-current={isCurrent}>
      {rest.children}
      {!isCurrent && <SlashIcon width="12" height="12" />}
    </StyledBreadcrumbItem>
  );
}

export { Breadcrumb, BreadcrumbItem };
