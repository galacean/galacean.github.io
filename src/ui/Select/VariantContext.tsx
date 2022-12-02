import React, { createContext } from "react";

export const VariantContext = createContext<{
  size?: "sm" | "md" | "lg";
}>({});

VariantContext.displayName = "VariantContext";

export function VariantProvider(props) {
  const { children, ...rest } = props;
  return <VariantContext.Provider value={rest}>{children}</VariantContext.Provider>;
}
