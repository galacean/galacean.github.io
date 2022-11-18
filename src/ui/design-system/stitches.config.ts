import { createStitches, createTheme, globalCss } from "@stitches/react";
import {
  gray,
  grayA,
  grayDark,
  grayDarkA,
  blue,
  blueA,
  blueDark,
  blueDarkA,
  green,
  grass,
  grassDark,
  greenA,
  greenDark,
  greenDarkA,
  red,
  redA,
  redDark,
  redDarkA,
  amber,
  amberDark,
  gold,
  goldDark,
  purple,
  purpleDark,
  cyan,
  cyanDark,
  teal,
  tealDark,
  slate,
  slateA,
  slateDark,
  slateDarkA
} from "@radix-ui/colors";
import type { VariantProps, CSS, ComponentProps } from "@stitches/react";

import { resetCSS } from "./reset.css";

export const { styled, css, prefix, keyframes, getCssText, theme } = createStitches({
  theme: {
    /**
     * Relate https://github.com/necolas/normalize.css/issues/665
     */
    fonts: {
      default:
        'system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol'
    },
    colors: {
      ...grayDark,
      ...grayDarkA,
      ...grassDark,
      ...greenDark,
      ...greenDarkA,
      ...blueDark,
      ...blueDarkA,
      ...redDark,
      ...redDarkA,
      ...slateDark,
      ...slateDarkA,
      ...goldDark,
      ...purpleDark,
      ...cyanDark,
      ...tealDark,
      ...amberDark,
      appbg: "$slate2",
      subbg: "$slate1",
      hiContrast: "$gray12",
      loContrast: "$gray1",
      tooltipbg: "white",
      tooltipcolor: "$slate1",
      white: "white"
    },
    fontSizes: {
      root: "16px",
      1: "0.75rem", // 12px
      2: "0.875rem", // 14px
      3: "1rem", // 16px
      4: "1.125rem", // 18px
      /** alias */
      xxs: "0.625rem", // ex-extra small 10 px
      xs: "0.75rem", // extra small 12 px
      sm: "0.75rem", // small 14 px
      md: "1rem", // medium 16 px
      lg: "1.125rem" // large 18 px
    },
    // 圆角
    radii: {
      "0_5": "0.125rem", // 2px
      1: "0.25rem", // 4px
      2: "0.375rem", // 6px
      3: "0.5rem", // 8px
      4: "0.75rem", // 12px
      round: "9999px"
    },
    /**
     * sizes is for (min|max)(Width|Height), flexBasis and gridTemplate(Column|Rows)
     */
    sizes: {
      /** 2px */
      "0_5": "0.125rem",
      /** 4px */
      1: "0.25rem",
      2: "0.5rem",
      3: "0.75rem",
      4: "1rem", // basic px is 16
      5: "1.25rem",
      "5_5": "1.375rem",
      6: "1.5rem",
      7: "1.75rem",
      8: "2rem",
      9: "2.25rem",
      10: "2.5rem",
      12: "3rem",
      14: "3.5rem",
      15: "3.75rem",
      16: "4rem",
      17: "4.25rem",
      18: "4.5rem",
      19: "4.75rem",
      20: "5rem",
      24: "6rem",
      28: "7rem",
      32: "8rem",
      36: "9rem",
      40: "10rem",
      44: "11rem",
      48: "12rem",
      50: "50rem",
      52: "13rem",
      56: "14rem",
      60: "3.75",
      64: "16rem",
      72: "18rem",
      80: "20rem",
      96: "24rem",
      xs: "1.25rem",
      sm: "1.5rem",
      md: "2.25rem",
      lg: "3rem"
    },
    /**
     * space is for (grid|column|row)Gap, margin, padding, top, left, right, bottom
     */
    space: {
      "0_5": "0.125rem", // 2px
      1: "0.25rem", // 4px
      "1_5": "0.375rem", // 4px
      2: "0.5rem", // 8px
      3: "0.75rem", // 12px
      4: "1rem", // basic px is 16
      5: "1.25rem", // 20px
      6: "1.5rem", // 24px
      7: "1.75rem",
      8: "2rem",
      9: "2.25rem",
      10: "2.5rem",
      12: "3rem",
      14: "3.5rem",
      16: "4rem",
      20: "5rem",
      24: "6rem",
      28: "7rem",
      32: "8rem",
      36: "9rem",
      40: "10rem",
      44: "11rem",
      48: "12rem",
      52: "13rem",
      56: "14rem",
      60: "15rem",
      64: "16rem",
      72: "18rem",
      80: "20rem",
      96: "24rem"
    },
    fontWeights: {
      normal: 400,
      medium: 500,
      large: 600
    },
    lineHeights: {
      1: "0.75rem", // 12px
      2: "1rem", // basic px is 16
      3: "1.25rem", // 20px
      4: "1.5rem", // 24px
      5: "1.75rem"
    },
    shadows: {
      prepend: "0 0 0 0 transparent"
    },
    transitions: {
      shadow: "box-shadow .2s ease",
      backgroundColor: "background-color .2s ease"
    }
  },
  utils: {
    mashBackground: (size = "20px") => ({
      backgroundImage: `
        linear-gradient(45deg, #b0b0b0 25%, transparent 25%),
        linear-gradient(-45deg, #b0b0b0 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, #b0b0b0 75%),
        linear-gradient(-45deg, #fff 75%, #b0b0b0 75%)
      `,
      backgroundSize: `${size} ${size}`,
      backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px"
    })
  }
});

globalThis.reseted = false;
export const globalCSS = () => {
  if (globalThis.reseted) return;
  globalThis.reseted = true;
  const reset = globalCss({
    ...resetCSS,
    html: {
      fontFamily: "$default",
      fontSize: "16px",
      backgroundColor: "$slate1"
    },
    body: {
      backgroundColor: "$slate1"
    }
  });
  reset();
};

export const defaultTheme = theme;
export const darkTheme = defaultTheme; // default theme alias,
export const localCSS = globalCss;

export const lightTheme = createTheme("light-theme", {
  colors: {
    ...gray,
    ...grayA,
    ...green,
    ...greenA,
    ...blue,
    ...blueA,
    ...red,
    ...redA,
    ...slate,
    ...slateA,
    ...gold,
    ...purple,
    ...cyan,
    ...teal,
    ...amber,
    ...grass,
    /** Just for high-contrast screen */
    hiContrast: "$gray12",
    /** Just for low-contrast screen */
    loContrast: "$gray1",
    appbg: "white",
    subbg: "white",
    tooltipbg: "black",
    tooltipcolor: "white",
    white: "white"
  },
  shadows: {
    default: "$colors$slate8 0px 10px 38px -10px, $colors$slate10 0px 10px 20px -15px"
  },
});

type StitchesComponent<T> = ComponentProps<T> & VariantProps<T> & { css?: CSS };

export type { VariantProps, CSS, StitchesComponent };
