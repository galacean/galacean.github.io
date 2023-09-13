import { DropdownMenu, Flex, MenuItem, styled } from "@galacean/editor-ui";
import { useContext } from 'react';
import { useIntl } from 'react-intl';
import { AppContext } from '../../contextProvider';

const StyledRoot = styled(Flex, {
});

const StyledItem = styled("div", {
  fontSize: "$2",
  padding: "0 $2"
})

const StyledLink = styled("a", {
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
          <StyledLink href={`/docs/${context.version}/${context.lang}/install`} target='_blank'>
            {formatMessage({ id: 'app.header.menu.engine.docs' })}
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink href={`/docs/${context.version}/cn/editor`} target='_blank'>
            {formatMessage({ id: 'app.header.menu.editor.docs' })}
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink href={`/docs/${context.version}/${context.lang}/artist-bake`} target='_blank'>
            {formatMessage({ id: 'app.header.menu.artist.docs' })}
          </StyledLink>
        </MenuItem>
      </DropdownMenu>
      <DropdownMenu size="lg" trigger={<StyledItem>{formatMessage({ id: 'app.header.menu.ecosystem' })}</StyledItem>}>
        <MenuItem>
          <StyledLink href={`https://galacean.antgroup.com/editor`} target='_blank'>
            {formatMessage({ id: 'app.header.menu.ecosystem.editor' })}
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink href={`/gltf-viewer`} target='_blank'>
            {formatMessage({ id: 'app.header.menu.ecosystem.gltfviewer' })}
          </StyledLink >
        </MenuItem>
        <MenuItem>
          <StyledLink href={`https://github.com/galacean/create-galacean-app`} target='_blank'>
            {formatMessage({ id: 'app.header.menu.ecosystem.createapp' })}
          </StyledLink>
        </MenuItem>
      </DropdownMenu>
      <StyledItem as="a" href={`/api/${context.version}`}>{formatMessage({ id: 'app.header.menu.engine.api' })}</StyledItem >
      <StyledItem as="a" href={`/examples/${context.version}`}>{formatMessage({ id: 'app.header.menu.engine.examples' })}</StyledItem >
    </StyledRoot>
  );
};

export default StyledNavigationMenu;