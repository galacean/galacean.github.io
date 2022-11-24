import React, { useContext } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { Link } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { NavArrowDown } from 'iconoir-react';
import { keyframes, styled } from '../../../ui/design-system';
import { AppContext } from '../../contextProvider';

const enterFromRight = keyframes({
  "from": {
    opacity: 0,
    transform: "translateX(200px)",
  },
  "to": {
    opacity: 1,
    transform: "translateX(0)"
  }
});

const enterFromLeft = keyframes({
  "from": {
    opacity: 0,
    transform: "translateX(-200px)"
  },
  "to": {
    opacity: 1,
    transform: "translateX(0)"
  }
});

const exitToRight = keyframes({
  "from": {
    opacity: 1,
    transform: "translateX(0)"
  },
  "to": {
    opacity: 0,
    transform: "translateX(200px)"
  }
});

const exitToLeft = keyframes({
  "from": {
    opacity: 1,
    transform: "translateX(0)"
  },
  "to": {
    opacity: 0,
    transform: "translateX(-200px)"
  }
});

const scaleIn = keyframes({
  "from": {
    opacity: 0,
    transform: "rotateX(-30deg) scale(0.9)"
  },
  "to": {
    opacity: 1,
    transform: "rotateX(0deg) scale(1)"
  }
});

const scaleOut = keyframes({
  "from": {
    opacity: 1,
    transform: "rotateX(0deg) scale(1)"
  },
  "to": {
    opacity: 0,
    transform: "rotateX(-10deg) scale(0.95)"
  }
});

const fadeIn = keyframes({
  "from": {
    opacity: 0
  },
  "to": {
    opacity: 1
  }
});

const fadeOut = keyframes({
  "from": {
    opacity: 1
  },
  "to": {
    opacity: 0
  }
})

const StyledRoot = styled(NavigationMenu.Root, {
  position: "relative"
});

const StyledList = styled(NavigationMenu.List, {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "$2",
  gap: "$2"
});

const StyledNavArrowDown = styled(NavArrowDown, {
  position: "relative",
  top: "1px",
  transition: "transform 250ms ease"
});

const StyledTrigger = styled(NavigationMenu.Trigger, {
  padding: "$1 $2",
  fontSize: "$2",
  userSelect: "none",
  display: "flex",
  alignItems: "center",
  borderRadius: "$1",
  justifyContent: "space-between",
  gap: "$0_5",
  border: "none",
  backgroundColor: "transparent",
  color: "$slate12",
  '&[data-state="open"]': {
    [`> ${StyledNavArrowDown}`]: {
      transform: "rotate(-180deg)"
    }
  },
  "&:focus": {
    boxShadow: "0 0 0 2px $colors$blue6"
  },
  "&:hover": {
    color: "$blue10"
  }
});

const StyledLink = styled(Link, {
  padding: "$1 $2",
  fontSize: "$2",
  outline: "none",
  userSelect: "none",
  borderRadius: "4px",
  display: "block",
  textDecoration: "none",
  alignItems: "center",
  color: "$slate12",
  "&:focus": {
    boxShadow: "0 0 0 2px var(--violet7)"
  },
  "&:hover": {
    "& a": {
      color: "$blue10"
    },
  }
});

const StyledContent = styled(NavigationMenu.Content, {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "$4",
  animationDuration: "250ms",
  animationTimingFunction: "ease",
  "&[data-motion='from-start']": {
    animationName: `${enterFromLeft}`
  },
  "&[data-motion='from-end']": {
    animationName: `${enterFromRight}`
  },
  "&[data-motion='to-start']": {
    animationName: `${exitToLeft}`
  },
  "&[data-motion='to-end']": {
    animationName: `${exitToRight}`
  }
});

const StyledIndicator = styled(NavigationMenu.Indicator, {
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  height: "10px",
  top: "100%",
  overflow: "hidden",
  zIndex: 1,
  transition: "width, transform 250ms ease",
  "&[data-state='visible']": {
    animation: `${fadeIn} 200ms ease`
  },
  "&[data-state='hidden']": {
    animation: `${fadeOut} 200me ease`
  }
});

const StyledIndicatorArrow = styled("div", {
  position: "relative",
  top: "70%",
  backgroundColor: "$slate1",
  width: "10px",
  height: "10px",
  transform: "rotate(45deg)",
  borderTopLeftRadius: "2px"
});

const StyledViewport = styled(NavigationMenu.Viewport, {
  position: "relative",
  transformOrigin: "top center",
  marginTop: "10px",
  backgroundColor: "$slate1",
  borderRadius: "$1",
  overflow: "hidden",
  boxShadow: "$default",
  height: "var(--radix-navigation-menu-viewport-height)",
  transition: "width, height, 300ms ease",
  width: "var(--radix-navigation-menu-viewport-width)",
  "&[data-state='open']": {
    animation: `${scaleIn} 200ms ease`
  },
  "&[data-state='closed']": {
    animation: `${scaleOut} 200ms ease`
  }
});

const StyledViewportPosition = styled("div", {
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  minWidth: "100%",
  top: "100%",
  left: 0,
  perspective: "2000px"
});

const StyledListItem = styled("div", {
  display: "block",
  outline: "none",
  textDecoration: "none",
  userSelect: "none",
  padding: "$3",
  borderRadius: "$2",
  lineHeight: 1,
  color: "$slate12",
  fontSize: "$2",
  "&:focus": {
    boxShadow: "0 0 0 2px var(--violet7)"
  },
  "&:hover": {
    backgroundColor: "$slate3",
    color: "$slate12",
  }
});

const StyledListItemHeading = styled("div", {
  fontWeight: 500,
  lineHeight: 1.4,
  marginBottom: "5px"
});

const StyledListItemText = styled("p", {
  color: "$slate11",
  fontSize: "$1",
  lineHeight: 1.4,
  fontWeight: "initial"
});

const StyledContentList = styled("ul", {
  display: "grid",
  margin: 0,
  columnGap: "$2",
  listStyle: "none",
  gridAutoFlow: "column",
  gridTemplateRows: "repeat(2, 1fr)"
})

const ListItem = React.forwardRef(({ children, title, to }: { children: any, title: string, to: string }, forwardedRef) => (
  <Link to={to}>
    <li ref={forwardedRef}>
      <StyledListItem>
        <StyledListItemHeading>{title}</StyledListItemHeading>
        <StyledListItemText>{children}</StyledListItemText>
      </StyledListItem>
    </li>
  </Link>
));

const StyledNavigationMenu = () => {
  const formatMessage = useIntl().formatMessage;
  const context = useContext(AppContext);
  const isZhCN = context.lang === 'zh-CN';

  return (
    <StyledRoot>
      <StyledList>
        <NavigationMenu.Item>
          <StyledTrigger>
            {formatMessage({ id: 'app.header.menu.docs' })} <StyledNavArrowDown aria-hidden fontSize={"10px"} />
          </StyledTrigger>
          <StyledContent>
            <StyledContentList css={{width: "400px"}}>
              <ListItem to={`/docs/${context.version}/${context.lang}`} title={formatMessage({ id: 'app.header.menu.engine.docs' })}>
                CSS-in-JS with best-in-class developer experience.
              </ListItem>
              <ListItem to={`/api/${context.version}`} title={formatMessage({ id: 'app.header.menu.engine.api' })}>
                CSS-in-JS with best-in-class developer experience.
              </ListItem>
              <ListItem to={`/docs/latest/${context.lang}/artist-bake${context.lang === 'en' ? '' : '.zh-CN'}`} title={formatMessage({ id: 'app.header.menu.artist' })}>
                CSS-in-JS with best-in-class developer experience.
              </ListItem>
              <ListItem to={'/docs/latest/zh/editor.zh-CN'} title={formatMessage({ id: 'app.header.menu.editor' })}>
                CSS-in-JS with best-in-class developer experience.
              </ListItem>
            </StyledContentList>
          </StyledContent>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <StyledTrigger>
            {formatMessage({ id: 'app.header.menu.ecosystem' })} <StyledNavArrowDown aria-hidden fontSize={"10px"} />
          </StyledTrigger>
          <StyledContent>
            <StyledContentList css={{width: "400px"}}>
              <ListItem to={`/gltf-viewer`} title={formatMessage({ id: 'app.header.menu.ecosystem.gltfviewer' })}>
                CSS-in-JS with best-in-class developer experience.
              </ListItem>
              <ListItem to={`https://github.com/oasis-engine/create-oasis-app`} title={formatMessage({ id: 'app.header.menu.ecosystem.createapp' })}>
                CSS-in-JS with best-in-class developer experience.
              </ListItem>
              <ListItem to={`https://oasis.alipay.com/editor`} title={formatMessage({ id: 'app.header.menu.ecosystem.editor' })}>
                CSS-in-JS with best-in-class developer experience.
              </ListItem>
            </StyledContentList>
          </StyledContent>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <StyledLink to={`/examples/${context.version}`}>
            <FormattedMessage id='app.header.menu.engine.examples' />
          </StyledLink>
        </NavigationMenu.Item>
        <StyledIndicator>
          <StyledIndicatorArrow />
        </StyledIndicator>
      </StyledList>
      <StyledViewportPosition>
        <StyledViewport />
      </StyledViewportPosition>
    </StyledRoot>
  );
};

export default StyledNavigationMenu;