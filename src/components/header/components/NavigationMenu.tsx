import { DropdownMenu, Flex, MenuItem, styled } from "@galacean/editor-ui";
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

  return (
    <StyledRoot align="both" gap="lg">
      <DropdownMenu size="lg" trigger={<StyledItem>{formatMessage({ id: 'app.header.menu.docs' })}</StyledItem >}>
        <MenuItem>
          <StyledLink to={`/docs/${context.version}/${context.lang}/install`}>
            {formatMessage({ id: 'app.header.menu.engine.docs' })}
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink to={`/docs/${context.version}/cn/editor`}>
            {formatMessage({ id: 'app.header.menu.editor.docs' })}
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink as="a" rel='noopener noreferrer' href={`/effects/#/user/`}>
            {formatMessage({ id: 'app.header.menu.effects.doc' })}
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink to={`/docs/${context.version}/${context.lang}/artist-bake`}>
            {formatMessage({ id: 'app.header.menu.artist.docs' })}
          </StyledLink>
        </MenuItem>
      </DropdownMenu>
      <DropdownMenu size="lg" trigger={<StyledItem>{formatMessage({ id: 'app.header.menu.ecosystem' })}</StyledItem>}>
        <MenuItem>
          <StyledLink to={`https://galacean.antgroup.com/editor`} target='_blank'>
            {formatMessage({ id: 'app.header.menu.ecosystem.editor' })}
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink as="a" rel='noopener noreferrer' href={`/effects/studio/`} target="_blank">
            {formatMessage({ id: 'app.header.menu.ecosystem.effects-editor' })}
          </StyledLink>
        </MenuItem>
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
      <DropdownMenu size="lg" trigger={<StyledItem>{formatMessage({ id: 'app.header.menu.api' })}</StyledItem>}>
        <MenuItem>
          <StyledLink to={`https://galacean.antgroup.com/editor`} target='_blank'>
            {formatMessage({ id: 'app.header.menu.engine.api' })}
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink as="a" rel='noopener noreferrer' href={`/effects/#/api/`}>
            {formatMessage({ id: 'app.header.menu.effects.api' })}
          </StyledLink>
        </MenuItem>
      </DropdownMenu>
      <DropdownMenu size="lg" trigger={<StyledItem>{formatMessage({ id: 'app.header.menu.examples' })}</StyledItem>}>
        <MenuItem>
          <StyledLink to={`/examples/${context.version}`}>
            {formatMessage({ id: 'app.header.menu.engine.examples' })}
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink as="a" rel='noopener noreferrer' href={`/effects/#/api/`}>
            {formatMessage({ id: 'app.header.menu.effects.examples' })}
          </StyledLink>
        </MenuItem>
      </DropdownMenu>
    </StyledRoot>
  );
};

export default StyledNavigationMenu;