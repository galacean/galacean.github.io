import React, { useState, useEffect, createContext, useContext } from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { DotFilledIcon, Cross2Icon } from "@radix-ui/react-icons";
import { useControllableState } from "@radix-ui/react-use-controllable-state";

import { StitchesComponent, VariantProps, styled } from "../design-system";

import { ActionButton } from "../ActionButton";

/* ------------------- Styled Primitive Headless Component ------------------ */

const StyledList = styled(TabsPrimitive.List, {
  display: "flex",
  alignItems: "center",
  height: "$9",
  maxWidth: "100%",
  paddingLeft: "$2",
  gap: "$2",
  overflowX: "auto",
  flexShrink: 0,
  variants: {
    variant: {
      file: {
        paddingLeft: 0
      }
    },
    rotate: {
      true: {
        transform: "rotate(90deg)",
        height: "initial",
        overflow: "initial",
        paddingLeft: "$6"
      }
    }
  }
});

const StyledTabs = styled(TabsPrimitive.Root, {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  variants: {
    fulfill: {
      true: {
        flex: 1,
        height: 0
      }
    }
  }
});

const StyledTrigger = styled(TabsPrimitive.Trigger, {
  all: "unset",
  position: "relative",
  display: "flex",
  alignItems: "center",
  height: "100%",
  fontSize: "$sm",
  fontWeight: 600,
  color: "$slate10",
  cursor: "pointer",
  transition: "color .4s ease",
  textTransform: "uppercase",
  whiteSpace: "nowrap",
  "&:hover": {
    color: "$slate11"
  },
  [`& > ${ActionButton}`]: {
    marginLeft: "$1"
  },
  "& > span": {
    height: "$5",
    display: "flex",
    alignItems: "center",
    lineHeight: 1,
    padding: "$1 $2",
    borderRadius: "$round",
    backgroundColor: "$slate5"
  },
  '&[data-state="active"]': {
    color: "$slate12",
    "&::after": {
      content: " ",
      position: "absolute",
      left: 0,
      bottom: 0,
      width: "100%",
      height: "calc($1 / 2)"
      // backgroundColor: "$blue9"
    },
    "&:hover": {
      color: "$slate12"
    }
  },
  variants: {
    variant: {
      file: {
        padding: "0 $1_5",
        '&[data-state="active"]': {
          backgroundColor: "$slate4"
        }
      }
    }
  }
});

const StyledTabContent = styled(TabsPrimitive.Content, {
  flex: 1,
  variants: {
    fulfill: {
      true: {
        flex: 1,
        height: 0,
        overflowY: "auto"
      }
    }
  }
});

const TabsContext = createContext({
  closable: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onTabClose: (tab: any) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setActiveKey: (key: string) => {}
});

export type ITab = {
  value: string;
  label: React.ReactNode;
  closable?: "enable" | "intermidate" | "disable";
};

export type TabsListProps = VariantProps<typeof StyledList> & {
  tabs: ITab[];
  variant?: "file";
};

export type ITabsProps = StitchesComponent<typeof StyledTabs> & {
  onTabClose?: (nextTabs: ITab) => void;
  closable?: boolean;
};

// Exports
export const Tabs = function Tabs(props: ITabsProps) {
  const { onTabClose, closable, defaultValue, value, onValueChange, children, ...rest } = props;
  const [activeKey, setActiveKey] = useControllableState({
    prop: value,
    defaultProp: defaultValue,
    onChange: onValueChange
  });

  return (
    <TabsContext.Provider value={{ onTabClose, closable, setActiveKey }}>
      <StyledTabs value={activeKey} defaultValue={activeKey} onValueChange={setActiveKey} {...rest}>
        {children}
      </StyledTabs>
    </TabsContext.Provider>
  );
};

export const TabsList = (props: TabsListProps) => {
  const ctx = useContext(TabsContext);
  const { onTabClose, closable, setActiveKey } = ctx;
  const { tabs: originTabs, variant, ...rest } = props;

  const [tabs, setTabs] = useState(originTabs);

  useEffect(() => {
    setTabs(props.tabs);
  }, [props.tabs]);

  const handleClose = (tab: ITab) => {
    if (onTabClose) {
      onTabClose(tab);
      return;
    }
    const next = tabs.filter((item) => item.value !== tab.value);
    setTabs(next);
    setActiveKey(next.length ? next[next.length - 1].value : "");
  };

  return (
    <StyledList variant={variant} {...rest}>
      {tabs.map((item) => {
        const { value, label, closable = "disable" } = item;
        return (
          <StyledTrigger value={value} key={value} variant={variant}>
            {label}
            {closable !== "disable" && (
              <ActionButton
                size="sm"
                variant="subtle"
                as="div"
                onMouseDown={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  if (closable === "intermidate") return;
                  handleClose(item);
                }}
              >
                {closable === "enable" ? <Cross2Icon /> : <DotFilledIcon />}
              </ActionButton>
            )}
          </StyledTrigger>
        );
      })}
    </StyledList>
  );
};
export const TabsContent = StyledTabContent;
