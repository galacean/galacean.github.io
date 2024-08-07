import { DropdownMenu, Flex, MenuGroup, MenuItem, styled } from "@galacean/editor-ui";
import { useContext } from 'react';
import { useIntl } from 'react-intl';
import { AppContext } from "../components/contextProvider";

const StyledRoot = styled(Flex, {
  margin: "0 $2"
});

const StyledItem = styled("div", {
  fontSize: "$2",
  padding: "0 $1",
  cursor: "pointer"
})

const StyledLink = styled('a', {
  display: "block",
  width: "100%",
  lineHeight: 3,
  color: "$slate12",
  fontWeight: 300,
  "&:hover": {
    color: "$slate12",
  }
});

const StyledNavigationMenuHome = () => {
  const formatMessage = useIntl().formatMessage;
  const context = useContext(AppContext);

  return <StyledRoot align="both" gap="lg">
    <DropdownMenu size="lg" trigger={<StyledItem>{formatMessage({ id: 'app.header.menu.engine' })}</StyledItem >}>
      <MenuItem>
        <StyledLink rel='noopener noreferrer' href={`/archive-engine/docs/${context.version}/${context.lang}/getting-started-overview`}>
          {formatMessage({ id: 'app.header.menu.engine.docs' })}
        </StyledLink>
      </MenuItem>
      <MenuItem>
        <StyledLink href={`https://galacean.antgroup.com/editor`} target='_blank'>
          {formatMessage({ id: 'app.header.menu.ecosystem.editor' })}
        </StyledLink>
      </MenuItem>
      <MenuItem>
        <StyledLink rel='noopener noreferrer' href={`/archive-engine/examples/${context.version}`}>
          {formatMessage({ id: 'app.header.menu.engine.examples' })}
        </StyledLink>
      </MenuItem>
      <MenuItem>
        <StyledLink rel='noopener noreferrer' href={`/archive-engine/api/${context.version}`}>
          {formatMessage({ id: 'app.header.menu.engine.api' })}
        </StyledLink>
      </MenuItem>
      <MenuGroup label={""} divider="top">
        <MenuItem>
          <StyledLink rel='noopener noreferrer' href={`/archive-engine/gltf-viewer`}>
            {formatMessage({ id: 'app.header.menu.ecosystem.gltfviewer' })}
          </StyledLink >
        </MenuItem>
        <MenuItem>
          <StyledLink href={`https://github.com/galacean/create-galacean-app`} target='_blank'>
            {formatMessage({ id: 'app.header.menu.ecosystem.createapp' })}
          </StyledLink>
        </MenuItem>
      </MenuGroup>
    </DropdownMenu>
    <DropdownMenu size="lg" trigger={<StyledItem>{formatMessage({ id: 'app.header.menu.effects' })}</StyledItem>}>
      <MenuItem>
        <StyledLink rel='noopener noreferrer' href={`/effects/#/user/`}>
          {formatMessage({ id: 'app.header.menu.effects.doc' })}
        </StyledLink>
      </MenuItem>
      <MenuItem>
        <StyledLink rel='noopener noreferrer' href={`/effects/dashboard/`} target="_blank">
          {formatMessage({ id: 'app.header.menu.ecosystem.effects-editor' })}
        </StyledLink>
      </MenuItem>
      <MenuItem>
        <StyledLink rel='noopener noreferrer' href={`/effects/#/playground/`}>
          {formatMessage({ id: 'app.header.menu.effects.examples' })}
        </StyledLink>
      </MenuItem>
      <MenuItem>
        <StyledLink rel='noopener noreferrer' href={`/effects/#/api/`}>
          {formatMessage({ id: 'app.header.menu.effects.api' })}
        </StyledLink>
      </MenuItem>
    </DropdownMenu>
  </StyledRoot>
};

export default StyledNavigationMenuHome;