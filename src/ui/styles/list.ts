import { styled, css, keyframes } from "../design-system";

const openUp = keyframes({
  "0%": {
    opacity: 0,
    transform: "scale(.9)"
  },
  "100%": {
    opacity: 1,
    transform: "scale(1)"
  }
});

const scaleOut = keyframes({
  "0%": {
    opacity: 1,
    transform: "scale(1)"
  },
  "100%": {
    opacity: 0,
    transform: "scale(0.9)"
  }
});

export const basicItemStyle = styled(null, {
  all: "unset",
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "$8",
  fontSize: 14,
  lineHeight: 1,
  borderRadius: "$1",
  color: "$slate11",
  padding: "$1 $2",
  userSelect: "none",
  boxSizing: "border-box",
  minWidth: "max-content",

  "& > span": {
    display: "block",
    alignItems: "center",
    width: "100%"
  },
  "& svg": {
    marginRight: "$1"
  },

  // disable state
  "&[data-disabled]": {
    color: "$slate8"
    // pointerEvents: 'none'
  },

  "&:focus": {
    backgroundColor: "$slate4",
    color: "$slate12"
  },

  variants: {
    size: {
      sm: {
        height: "$6",
        fontSize: "$1"
      },
      md: {},
      lg: {}
    }
  }
});

export const contentStyle = styled(null, {
  backgroundColor: "$slate2",
  borderRadius: "6px",
  padding: "4px",
  boxShadow: "0 5px 10px rgba(0,0,0,0.08)",
  transformOrigin: "0px 0px",
  border: "1px solid $colors$slate6",
  minWidth: "$44",
  // minWidth: 'max-content',

  "&[data-state=open]": {
    animation: `${openUp} 100ms ease`
  },
  "&[data-state=closed]": {
    animation: `${scaleOut} 100ms ease`
  }
});

export const labelStyle = styled(null, {
  fontSize: "$1",
  color: "$slate9",
  padding: "$1 $2"
});

export const separatorStyle = styled(null, {
  height: 1,
  backgroundColor: "$slate6",
  margin: "$1"
});

export const indicatorStyle = styled(null, {
  position: "absolute",
  width: "$6",
  left: 0,
  display: "inline-flex",
  justifyContent: "center"
});

export const checkboxItemStyle = styled(null, basicItemStyle, {
  paddingLeft: "$6",
  "&[data-state=checked]": {
    display: "flex",
    justifyContent: "initial"
  }
});

export const radioItemStyle = styled(null, basicItemStyle, {
  paddingLeft: "$6",
  "&[data-state=checked]": {
    display: "flex",
    justifyContent: "initial"
  }
});

export const subMenuItemStyle = styled(null, basicItemStyle, {
  position: "relative",
  // For CaretRightIcon style
  "& > svg": {
    width: "$4",
    height: "$4"
  }
});
