import { styled } from "@oasis-engine/editor-design-system";

export const StyledKindIcon = styled("span", {
  color: "#9600ff",
  "&::before": {
    display: "inline-block",
    width: "17px",
    height: "17px",
    margin: "0 3px 2px 0",
    verticalAlign: "middle",
    backgroundImage: "url(//gw.alipayobjects.com/mdn/rms_e54b79/afts/img/A*50wRRKbc55sAAAAAAAAAAAAAARQnAQ)",
    content: ''
  }
});

export const StyledKind = styled("span", {
  variants: {
    type: {
      "module": {
        [`& ${StyledKindIcon}`]: {
          "&::before": {
            backgroundPosition: "0 -102px"
          }
        }
      },
      "enumeration": {
        [`& ${StyledKindIcon}`]: {
          color: "#937210",
          "&::before": {
            backgroundPosition: "0 -119px"
          }
        }
      },
      "class": {
        [`& ${StyledKindIcon}`]: {
          color: "#0672de",
          "&::before": {
            backgroundPosition: "0 -34px"
          }
        }
      },
      "interface": {
        [`& ${StyledKindIcon}`]: {
          color: "#647f1b",
          "&::before": {
            backgroundPosition: "0 -68px"
          }
        }
      },
      "alias": {
        [`& ${StyledKindIcon}`]: {
          color: "#9600ff",
          "&::before": {
            backgroundPosition: "0 -170px"
          }
        }
      },
      "function": {
        [`& ${StyledKindIcon}`]: {
          "&::before": {
            backgroundPosition: "-136px -68px"
          }
        }
      },
      "variable": {
        [`& ${StyledKindIcon}`]: {
          "&::before": {
            backgroundPosition: "-136px 0"
          }
        }
      },
      "property": {
        [`& ${StyledKindIcon}`]: {
          color: "#409ffa",
          "&::before": {
            backgroundPosition: "-51px 0"
          }
        }
      },
      "is-inherited": {
        [`& ${StyledKindIcon}`]: {
          color: "#409ffa",
          "&::before": {
            backgroundPosition: "-68px 0"
          }
        }
      },
      "constructor": {
        [`& ${StyledKindIcon}`]: {
          color: "#409ffa",
          "&::before": {
            backgroundPosition: "-51px -102px"
          }
        }
      },
      "get-signature": {
        [`& ${StyledKindIcon}`]: {
          color: "#409ffa",
          "&::before": {
            backgroundPosition: "-51px -17px"
          }
        }
      },
      "method": {
        [`& ${StyledKindIcon}`]: {
          color: "#409ffa",
          "&::before": {
            backgroundPosition: "-51px -68px"
          }
        }
      },
      "has-type-parameter": {
        [`& ${StyledKindIcon}`]: {
          color: "#409ffa",
          "&::before": {
            backgroundPosition: "-51px -85px"
          }
        }
      }
    }
  }
});