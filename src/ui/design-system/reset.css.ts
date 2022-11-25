/**
 * Eric Meyer's Reset CSS
 */
export const resetCSS = {
  "html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, main, menu, nav, output, ruby, section, summary, time, mark, audio, video":
  {
    margin: "0",
    padding: "0",
    border: "0",
    fontSize: "100%",
    font: "inherit",
    verticalAlign: "baseline"
  },
  "article, aside, details, figcaption, figure, footer, header, hgroup, main, menu, nav, section": {
    display: "block"
  },
  "*[hidden]": {
    display: "none"
  },
  "*": {
    boxSizing: "border-box"
  },
  body: {
    lineHeight: "1",
    color: "var(--colors-slate12)",
    background: "var(--colors-slate12)",
    fontSize: "14px"
  },
  "ol, ul": {
    listStyle: "none"
  },
  "blockquote, q": {
    quotes: "none"
  },
  "blockquote:before, blockquote:after, q:before, q:after": {
    content: ""
  },
  table: {
    borderSpacing: "0"
  },
  /* Chrome, Safari, Edge, Opera */
  "input::-webkit-outer-spin-button, input::-webkit-inner-spin-button": {
    "-webkit-appearance": "none",
    margin: 0
  },
  /* Firefox */
  "input[type=number]": {
    "-moz-appearance": "textfield"
  },
  "::-webkit-scrollbar": {
    // background: "#252525",
    // width: "6px",
    // height: 0
  },
  "::-webkit-scrollbar-thumb": {
    // background: "#050505",
    // borderRadius: "3px"
  },
  ":root": {
    "--panel-manager-border-color": "var(--colors-slate6) !important",
    "--panel-manager-border-active-color": "var(--colors-blue9) !important"
  },
  ".monaco-editor": {
    background: "var(--colors-slate2) !important"
  },
  ".monaco-editor .margin": {
    background: "var(--colors-slate2) !important"
  },
  'div[data-panel-type="T"], div[data-panel-type="B"]': {
    minHeight: 0
  },
  'div[data-panel-type="L"], div[data-panel-type="R"]': {
    minWidth: 0
  },
  'a': {
    textDecoration: "none",
    color: "$slate12",
    '&:hover': {
      color: "$blue10"
    }
  }
};
