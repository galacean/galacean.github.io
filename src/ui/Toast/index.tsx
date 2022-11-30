import React from "react";
import { Toaster as HotToast, ToasterProps } from "react-hot-toast";

import { css } from "../design-system";

const className = css({
  "& > div:first-child": {
    marginRight: "$2"
  },
  "div[role=status]": {
    margin: 0
  }
})();

const containerClassName = css({
  [`& .${className}`]: {
    padding: "$2 $3",
    borderRadius: "$2",
    backgroundColor: "$slate1",
    color: "$slate12",
    fontSize: "$2",
    boxShadow: "0 5px 10px rgba(0,0,0,0.08)"
  }
})();

export function Toaster(props: ToasterProps) {
  const { toastOptions, ...rest } = props;

  return (
    <HotToast
      toastOptions={{
        ...toastOptions,
        className,
        success: {
          iconTheme: {
            primary: "var(--colors-grass9)",
            secondary: "var(--colors-white)"
          }
        },
        error: {
          iconTheme: {
            primary: "var(--colors-red9)",
            secondary: "var(--colors-white)"
          }
        }
      }}
      containerClassName={containerClassName}
      {...rest}
    />
  );
}

export { toast } from "react-hot-toast";
