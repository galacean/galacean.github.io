import React from "react";

import { StitchesComponent, styled } from "../design-system";
import type { VariantProps } from "../design-system";

const StyledInputBorder = styled("span", {
  position: "absolute",
  inset: 0,
  height: "100%",
  pointerEvents: "none",
  borderRadius: "$1",
  border: "1px solid $colors$slate7",
  boxShadow: "$prepend",
  transition: "$shadow"
});

const StyledInputSlot = styled("div", {
  position: "relative",
  display: "flex",
  alignItems: "center",
  fontWeight: 500,
  flexShrink: 0,
  lineHeight: 1,
  color: "$slate11",
  "&:hover": {
    color: "$slate12"
  },
  variants: {
    startSlot: {
      true: {
        paddingLeft: "$1_5"
      }
    },
    endSlot: {
      true: {
        paddingRight: "$1_5"
      }
    },
    disabled: {
      true: {
        backgroundColor: "$slate2"
      }
    }
  }
});

const StyledInput = styled("input", {
  height: "100%",
  borderWidth: "0",
  boxSizing: "border-box",
  outline: "none",
  // Custom
  flex: 1,
  width: "100%",
  color: "$slate11",
  borderRadius: "$1",
  fontVariantNumeric: "tabular-nums",
  backgroundColor: "transparent",
  "&:focus": {
    color: "$slate12"
  },
  "&::placeholder": {
    color: "$slate9"
  },
  "&:disabled": {
    pointerEvents: "none",
    backgroundColor: "$slate2",
    color: "$slate8",
    cursor: "not-allowed",
    "&::placeholder": {
      color: "$slate7"
    }
  },
  variants: {
    state: {
      invalid: {
        boxShadow: "inset 0 0 0 1px $colors$red7",
        backgroundColor: "$red3",
        color: "$red11",
        [`&:focus + ${StyledInputBorder}`]: {
          boxShadow: "inset 0px 0px 0px 1px $colors$red8, 0px 0px 0px 1px $colors$red8 !important"
        }
      },
      valid: {
        backgroundColor: "$green3",
        boxShadow: "inset 0 0 0 1px $colors$green7",
        color: "$green11",
        [`&:focus + ${StyledInputBorder}`]: {
          boxShadow: "inset 0px 0px 0px 1px $colors$green8, 0px 0px 0px 1px $colors$green8 !important"
        }
      }
    },
    cursor: {
      default: {
        cursor: "default",
        "&:focus": {
          cursor: "text"
        }
      },
      text: {
        cursor: "text"
      }
    }
  }
});

export const StyledInputRoot = styled("div", {
  position: "relative",
  display: "inline-flex",
  flex: 1,
  width: "100%",
  borderRadius: "$1",
  [`& ${StyledInput}:focus + ${StyledInputBorder}`]: {
    boxShadow: "0px 0px 0px 2px $colors$slate7"
  },
  backgroundColor: "$loContrast",
  variants: {
    variant: {
      subtle: {
        backgroundColor: "$slate3",
        [`${StyledInputBorder}`]: {
          border: "none"
        }
      }
    },
    size: {
      xs: {
        borderRadius: "$1",
        height: "$xs",
        lineHeight: "$xs",
        fontSize: "$1",
        fontWeight: 300,
        [`& ${StyledInput}`]: {
          paddingLeft: "$1_5",
          paddingRight: "$1_5",
          "&:-webkit-autofill::first-line": {
            fontSize: "$1"
          }
        }
      },
      sm: {
        height: "$sm",
        lineHeight: "$sizes$6",
        fontSize: "$1",
        fontWeight: 400,
        [`& ${StyledInput}`]: {
          paddingLeft: "$1_5",
          paddingRight: "$1_5",
          "&:-webkit-autofill::first-line": {
            fontSize: "$1"
          }
        }
      },
      md: {
        height: "$md",
        fontSize: "$md",
        [`& ${StyledInput}`]: {
          borderRadius: "$1",
          paddingLeft: "$2",
          paddingRight: "$2",
          lineHeight: "$sizes$6",
          "&:-webkit-autofill::first-line": {
            fontSize: "$3"
          }
        }
      },
      lg: {
        height: "$lg",
        fontSize: "$lg",
        lineHeight: "$sizes$6",
        [`& ${StyledInput}`]: {
          paddingLeft: "$4",
          paddingRight: "$4",
          "&:-webkit-autofill::first-line": {
            fontSize: "$3"
          }
        }
      }
    }
  },
  defaultVariants: {
    variant: "subtle",
    size: "md"
  }
});

type IInputProps = VariantProps<typeof StyledInputRoot> &
  Omit<StitchesComponent<typeof StyledInput>, "size"> & {
    startSlot?: React.ReactNode;
    endSlot?: React.ReactNode;
    rootRef?: any;
  };

export const Input = React.forwardRef<HTMLInputElement, IInputProps>(function Input(props, ref) {
  const { startSlot, endSlot, css, rootRef, disabled, size, ...rest } = props;

  return (
    <StyledInputRoot css={css} className="editor-component-input" ref={rootRef} size={size}>
      {!!startSlot && (
        <StyledInputSlot disabled={disabled} startSlot>
          {startSlot}
        </StyledInputSlot>
      )}
      <StyledInput disabled={disabled} {...rest} ref={ref} />
      <StyledInputBorder />
      {!!endSlot && (
        <StyledInputSlot endSlot disabled={disabled}>
          {endSlot}
        </StyledInputSlot>
      )}
    </StyledInputRoot>
  );
});