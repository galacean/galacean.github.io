import { DropdownMenu, Flex, MenuGroup, MenuItem, styled } from "@galacean/editor-ui";
import { useContext } from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { AppContext } from '../../contextProvider';

const StyledRoot = styled(Flex, {
  margin: "0 $2"
});

const StyledItem = styled("div", {
  fontSize: "$2",
  padding: "0 $1",
  cursor: "pointer"
})

const StyledLink = styled(Link, {
  display: "block",
  width: "100%",
  lineHeight: 3,
  color: "$slate12",
  fontWeight: 300,
  "&:hover": {
    color: "$slate12",
  }
});

const StyledNavigationMenu = () => {
  const formatMessage = useIntl().formatMessage;
  const context = useContext(AppContext);

  return <StyledRoot align="both" gap="lg">
      <StyledItem as={Link} to={`/docs/${context.version}/${context.lang}/getting-started-overview`}>
        {formatMessage({ id: 'app.header.menu.engine.docs' })}
      </StyledItem>
      <StyledItem as={Link} to={`https://galacean.antgroup.com/editor`} target='_blank'>
        {formatMessage({ id: 'app.header.menu.ecosystem.editor' })}
      </StyledItem>
      <StyledItem as={Link} to={`/examples/${context.version}`}>
        {formatMessage({ id: 'app.header.menu.engine.examples' })}
      </StyledItem>
      <StyledItem as={Link} to={`/api/${context.version}`}>
        {formatMessage({ id: 'app.header.menu.engine.api' })}
      </StyledItem>
      <DropdownMenu size="lg" trigger={<StyledItem>{formatMessage({ id: 'app.header.menu.ecosystem.tool' })}</StyledItem >}>
        <MenuItem>
          <StyledLink to={`/gltf-viewer`}>
            {formatMessage({ id: 'app.header.menu.ecosystem.gltfviewer' })}
          </StyledLink >
        </MenuItem>
        <MenuItem>
          <StyledLink to={`https://github.com/galacean/create-galacean-app`} target='_blank'>
            {formatMessage({ id: 'app.header.menu.ecosystem.createapp' })}
          </StyledLink>
        </MenuItem>
      </DropdownMenu>
    </StyledRoot>
};

export default StyledNavigationMenu;