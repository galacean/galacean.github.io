import { styled } from "../design-system";

import { basicStyle } from "../styles/buttonlike";

/**
 * Button component has many variant such as size, style variant and status
 * Size:
 * - xs (default)
 * - sm
 * - lg
 * - lg
 * Variant:
 * - primary
 * - light
 * - outline
 * - subtle
 * - uppercase
 * Status:
 * - disabled
 * - critical
 * - loading
 * - positive
 */

const StyledActionButton = styled("button", basicStyle, {
  boxShadow: "$prepend",
  transition: "$shadow",
  borderRadius: "$1",
  color: "$slate11",
  flexShrink: 0,
  flexGrow: 0,
  "&:focus-visible": {
    boxShadow: "0 0 0 2px $colors$slateA7"
  },
  "&:disabled": {
    backgroundColor: "transparent"
  },
  variants: {
    size: {
      xs: {
        height: "$5",
        width: "$5",
        "& > svg": {
          height: "$3",
          width: "$3"
        }
      },
      sm: {
        height: "$6",
        width: "$6",
        "& > svg": {
          height: "14px",
          width: "14px"
        }
      },
      md: {
        height: "$7",
        width: "$7",
        "& > svg": {
          height: "$4",
          width: "$4"
        }
      },
      lg: {
        height: "$lg",
        width: "$lg",
        "& > svg": {
          height: "$7",
          width: "$7"
        }
      }
    },
    variant: {
      outline: {
        border: "1px solid $slate6",
        color: "$slate12",
        borderRadius: "$1",
        fontSize: "$1",
        backgroundColor: "$slate3",
        "&:hover": {
          backgroundColor: "$slate3"
        }
      },
      secondary: {
        backgroundColor: "$slate3",
        "&:hover": {
          backgroundColor: "$slate4"
        }
      },
      subtle: {
        backgroundColor: "transparent",
        "&:hover": {
          backgroundColor: "$slate3"
        }
      }
    },
    active: {
      true: {
        backgroundColor: "$blue9",
        color: "$white",
        "&:hover": {
          backgroundColor: "$blue9"
        }
      }
    },
    fancy: {
      true: {
        "&:active > svg": {
          transform: "translateY(1px)"
        }
      }
    }
  },
  defaultVariants: {
    size: "sm",
    variant: "secondary"
  }
});

const StyledActionButtonGroup = styled("div", {
  display: "flex",
  marginRight: "$2",
  // boxShadow: '0 2px 10px $colors$slate4',
  [`& ${StyledActionButton}`]: {
    // backgroundColor: "$slate3",
  },
  variants: {
    dir: {
      row: {
        // height: '$8',
        [`& ${StyledActionButton}`]: {
          borderRadius: 0,
          borderRight: "none",
          boxShadow: "none",
          "&:first-child": {
            borderTopLeftRadius: "$1",
            borderBottomLeftRadius: "$1"
            // boxShadow: 'inset 0 0 0 1px $colors$slate7',
          },
          "&:last-child": {
            borderTopRightRadius: "$1",
            borderBottomRightRadius: "$1",
            borderRight: "1px solid $slate6"
          }
        }
      },
      column: {
        flexDirection: "column",
        [`& ${StyledActionButton}`]: {
          borderRadius: 0,
          borderBottom: "none",
          boxShadow: "none",
          "&:first-child": {
            borderTopLeftRadius: "$1",
            borderTopRightRadius: "$1"
            // boxShadow: 'inset 0 0 0 1px $colors$slate7',
          },
          "&:last-child": {
            borderBottomLeftRadius: "$1",
            borderBottomRightRadius: "$1",
            borderBottom: "1px solid $slate6"
          }
        }
      }
    }
  },
  defaultVariants: {
    dir: "row"
  }
});

export { StyledActionButton as ActionButton, StyledActionButtonGroup as ActionButtonGroup };
