import { styled, keyframes } from "../design-system";

const infinateRotateAnmi = keyframes({
  from: {
    transform: "rotate(0deg)"
  },
  to: {
    transform: "rotate(360deg)"
  }
});

const Spin = styled("div", {
  position: "relative",
  height: "$3",
  width: "$3",
  border: "2px solid $colors$slateA5",
  borderRadius: "$round",
  animation: `${infinateRotateAnmi} .8s linear infinite`,
  transformOrigin: "center",
  "&::after": {
    content: " ",
    display: "block",
    position: "absolute",
    top: "-2px",
    left: "-2px",
    height: "100%",
    width: "100%",
    borderRadius: "$round",
    border: "2px solid $colors$slate12",
    borderColor: "transparent transparent transparent $white",
    boxSizing: "content-box"
  },
  variants: {
    size: {
      sm: {
        height: "$4",
        width: "$4"
      },
      md: {
        height: "$5",
        width: "$5"
      },
      lg: {
        height: "$6",
        width: "$6"
      },
      elg: {
        height: "$8",
        width: "$8"
      }
    },
    color: {
      primary: {
        "&::after": {
          borderColor: "transparent transparent transparent $blueA9"
        }
      },
      default: {
        "&::after": {
          borderColor: "transparent transparent transparent $white"
        }
      }
    }
  },
  defaultVariants: {
    size: "md",
    color: "primary"
  }
});

export { Spin };
