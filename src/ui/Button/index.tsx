import React, { PropsWithChildren, ReactNode, forwardRef, useState, useEffect, useCallback } from "react";

import { styled, StitchesComponent } from "../design-system";

import { Spin } from "../Spin";
import { Flex } from "../Flex";
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

const StyledButton = styled("button", basicStyle, {
  // for boxShadow transition
  boxShadow: "0 0 0 0 transparent",
  transition: "box-shadow .2s ease, opacity .6s ease-out",
  userSelect: "none",
  variants: {
    // The scale of button
    size: {
      xs: {
        height: "$xs",
        fontSize: "$xs",
        fontWeight: 300,
        borderRadius: "$0_5",
        padding: "0 $1_5",
        "& svg": {
          strokeWidth: 1
        }
      },
      sm: {
        height: "$sm",
        fontSize: "$xs",
        fontWeight: 400,
        borderRadius: "$1",
        padding: "0 $2",
        "& svg": {
          strokeWidth: 1
        }
      },
      md: {
        height: "$md",
        fontSize: "$md",
        borderRadius: "$1",
        padding: "0 $3",
        "& svg": {
          strokeWidth: 2
        }
      },
      lg: {
        height: "$lg",
        fontSize: "$3",
        borderRadius: "$1",
        padding: "0 $4"
      }
    },
    // The Variant of button
    variant: {
      default: {
        color: "$slate11",
        backgroundColor: "transparent",
        border: "1px solid $colors$slateA6",
        "&:focus-visible": {
          boxShadow: "0 0 0 2px $colors$slateA7"
        },
        "&:hover": {
          border: "1px solid $colors$slate8"
        },
        "&:active": {
          backgroundColor: "$slate3"
        }
      },
      /** the basic style */
      primary: {
        backgroundColor: "$blue9",
        color: "$white",
        "&:hover": {
          backgroundColor: "$blue10"
        },
        "&:active": {
          backgroundColor: "$blue10"
        }
      },
      light: {
        backgroundColor: "$blue4",
        color: "$blue11",
        "&:hover": {
          backgroundColor: "$blue5"
        },
        "&:active": {
          backgroundColor: "$blue6"
        }
      },
      outline: {
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "$blue7",
        color: "$blue11",
        backgroundColor: "$blue3",
        "&:hover": {
          borderColor: "$blue7",
          backgroundColor: "$blue4"
        },
        "&:active": {
          borderColor: "$blue8",
          backgroundColor: "$blue5"
        }
      },
      subtle: {
        color: "$blue11",
        backgroundColor: "transparent",
        "&:hover": {
          backgroundColor: "$blue4"
        },
        "&:active": {
          backgroundColor: "$blue4"
        }
      },
      secondary: {
        backgroundColor: "$slate3",
        color: "$slate11",
        "&:hover": {
          color: "$slate12",
          backgroundColor: "$slate4"
        },
        "&:active": {
          color: "$slate12",
          backgroundColor: "$slate5"
        },
        "&:focus-visible": {
          boxShadow: "0 0 0 2px $colors$slateA7"
        }
      },
      subsecondary: {
        color: "$slate12",
        "&:hover": {
          backgroundColor: "$slate4"
        },
        "&:active": {
          backgroundColor: "$slate5"
        },
        "&:focus-visible": {
          boxShadow: "0 0 0 2px $colors$slate7"
        }
      }
    },
    uppercase: {
      true: {
        textTransform: "uppercase"
      }
    },
    // The state of button
    critical: {
      true: {
        color: "$red11",
        backgroundColor: "transparent",
        "&:focus-visible": {
          boxShadow: "0 0 0 3px $colors$redA7"
        },
        "&:hover": {
          backgroundColor: "$red3"
        },
        "&:active": {
          backgroundColor: "$red4"
        }
      }
    },
    positive: {
      true: {
        color: "$green11",
        backgroundColor: "transparent",
        "&:focus-visible": {
          boxShadow: "0 0 0 3px $colors$greenA7"
        },
        "&:hover": {
          backgroundColor: "$greenA3"
        },
        "&:active": {
          backgroundColor: "$greenA4"
        }
      }
    },
    loading: {
      true: {
        opacity: ".8",
        pointerEvents: "none"
      }
    }
  },
  defaultVariants: {
    size: "md",
    variant: "default"
  },
  compoundVariants: [
    {
      variant: "default",
      critical: true,
      css: {
        borderColor: "$red7",
        "&:focus-visible": {
          boxShadow: "0 0 0 3px $colors$redA7"
        },
        "&:hover": {
          borderColor: "$red8",
          backgroundColor: "$redA3"
        },
        "&:active": {
          backgroundColor: "$redA4"
        }
      }
    },
    {
      variant: "default",
      positive: true,
      css: {
        borderColor: "$green7",
        "&:focus-visible": {
          boxShadow: "0 0 0 3px $colors$greenA7"
        },
        "&:hover": {
          borderColor: "$green8",
          backgroundColor: "$greenA3"
        },
        "&:active": {
          backgroundColor: "$greenA4"
        }
      }
    },
    {
      variant: "primary",
      critical: true,
      css: {
        color: "white",
        backgroundColor: "$red9",
        "&:hover": {
          backgroundColor: "$red10"
        },
        "&:active": {
          backgroundColor: "$red10"
        }
      }
    },
    {
      variant: "primary",
      positive: true,
      css: {
        color: "white",
        backgroundColor: "$green9",
        "&:hover": {
          backgroundColor: "$green10"
        },
        "&:active": {
          backgroundColor: "$green10"
        }
      }
    },
    {
      variant: "light",
      critical: true,
      css: {
        backgroundColor: "$red4",
        color: "$red11",
        "&:hover": {
          backgroundColor: "$red5"
        }
      }
    },
    {
      variant: "light",
      positive: true,
      css: {
        backgroundColor: "$green3",
        color: "$green11",
        "&:hover": {
          backgroundColor: "$green5"
        }
      }
    },
    {
      variant: "outline",
      critical: true,
      css: {
        color: "$red11",
        backgroundColor: "transparent",
        borderColor: "$red7",
        "&:focus-visible": {
          boxShadow: "0 0 0 3px $colors$redA7"
        },
        "&:hover": {
          borderColor: "$red8",
          backgroundColor: "$redA3"
        },
        "&:active": {
          backgroundColor: "$redA4"
        }
      }
    },
    {
      variant: "outline",
      positive: true,
      css: {
        color: "$green11",
        backgroundColor: "transparent",
        borderColor: "$green7",
        "&:focus-visible": {
          boxShadow: "0 0 0 3px $colors$greenA7"
        },
        "&:hover": {
          borderColor: "$green8",
          backgroundColor: "$greenA3"
        },
        "&:active": {
          backgroundColor: "$greenA4"
        }
      }
    }
  ]
});

function useAsync(asyncFunction: () => Promise<unknown>) {
  const [loading, setLoading] = useState(false);

  async function start() {
    if (!asyncFunction) return;
    try {
      setLoading(true);
      await asyncFunction();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  return [loading, start] as const;
}

export type IButtonProps = StitchesComponent<typeof StyledButton> & {
  startSlot?: ReactNode;
  endSlot?: ReactNode;
  async?: () => Promise<unknown>;
};

const Button = forwardRef<HTMLButtonElement, PropsWithChildren<IButtonProps>>(function Button(props, ref) {
  const { children, startSlot, endSlot, async, size = "md", ...rest } = props;
  const [loading, start] = useAsync(async);

  const handleClick = useCallback(
    function handleClick(e) {
      if (rest.onClick) {
        rest.onClick(e);
      }
      if (async) {
        start();
      }
    },
    [rest.onClick, start]
  );

  const spin = <Spin color="default" size={size} css={{ marginRight: "$1_5" }} />;

  return (
    <StyledButton ref={ref} {...rest} loading={loading} size={size} onClick={handleClick}>
      {startSlot && (loading ? spin : <Flex css={{ marginRight: "$1_5" }}>{startSlot}</Flex>)}
      {!startSlot && !endSlot && loading && spin}
      {children}
      {endSlot && (loading ? spin : <Flex css={{ marginLeft: "$1_5" }}>{endSlot}</Flex>)}
    </StyledButton>
  );
});

Button.toString = () => ".oasis-editor-button-component";

export { Button };
