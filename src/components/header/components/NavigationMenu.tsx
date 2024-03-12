import { DropdownMenu, Flex, MenuGroup, MenuItem, styled } from "@galacean/editor-ui";
import { useContext } from 'react';
import { useIntl } from 'react-intl';
import { Link, useMatch } from 'react-router-dom';
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

  return useMatch('/') ?
    <StyledRoot align="both" gap="lg">
      <DropdownMenu size="lg" trigger={<StyledItem>{formatMessage({ id: 'app.header.menu.engine' })}</StyledItem >}>
        <MenuItem>
          <StyledLink as="a" rel='noopener noreferrer' href={`/docs/${context.version}/${context.lang}/getting-started-overview`}>
            {formatMessage({ id: 'app.header.menu.engine.docs' })}
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink to={`https://galacean.antgroup.com/editor`} target='_blank'>
            {formatMessage({ id: 'app.header.menu.ecosystem.editor' })}
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink as="a" rel='noopener noreferrer' href={`/examples/${context.version}`}>
            {formatMessage({ id: 'app.header.menu.engine.examples' })}
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink as="a" rel='noopener noreferrer' href={`/api/${context.version}`}>
            {formatMessage({ id: 'app.header.menu.engine.api' })}
          </StyledLink>
        </MenuItem>
        <MenuGroup label={""} divider="top">
          <MenuItem>
            <StyledLink as="a" rel='noopener noreferrer' href={`/gltf-viewer`}>
              {formatMessage({ id: 'app.header.menu.ecosystem.gltfviewer' })}
            </StyledLink >
          </MenuItem>
          <MenuItem>
            <StyledLink to={`https://github.com/galacean/create-galacean-app`} target='_blank'>
              {formatMessage({ id: 'app.header.menu.ecosystem.createapp' })}
            </StyledLink>
          </MenuItem>
        </MenuGroup>
      </DropdownMenu>
      <DropdownMenu size="lg" trigger={<StyledItem>{formatMessage({ id: 'app.header.menu.effects' })}</StyledItem>}>
        <MenuItem>
          <StyledLink as="a" rel='noopener noreferrer' href={`/effects/#/user/`}>
            {formatMessage({ id: 'app.header.menu.effects.doc' })}
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink as="a" rel='noopener noreferrer' href={`/effects/dashboard/`} target="_blank">
            {formatMessage({ id: 'app.header.menu.ecosystem.effects-editor' })}
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink as="a" rel='noopener noreferrer' href={`/effects/#/playground/`}>
            {formatMessage({ id: 'app.header.menu.effects.examples' })}
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink as="a" rel='noopener noreferrer' href={`/effects/#/api/`}>
            {formatMessage({ id: 'app.header.menu.effects.api' })}
          </StyledLink>
        </MenuItem>
      </DropdownMenu>
    </StyledRoot>
    :
    <StyledRoot align="both" gap="lg">
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