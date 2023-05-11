import { ActionButton, Flex, Option, Popover, Select, styled } from '@galacean/editor-ui';
import { Menu, Translate } from 'iconoir-react';
import { useContext } from 'react';
import Media from 'react-media';
import { Link } from 'react-router-dom';
import { AppContext } from '../contextProvider';
import NavigationMenu from './components/NavigationMenu';
import { NavigationMenuMobile } from './components/NavigationMenuMobile';
import ScrollToTop from './components/ScrollToTop';
import SearchBox from './components/SearchBox';
import Socials from './components/Socials';
import ThemeButton from './components/ThemeButton';

const LOGO_URL = 'https://mdn.alipayobjects.com/huamei_2uqjce/afts/img/A*FK6nTLRyI5IAAAAAAAAAAAAADsF_AQ/original';

function Header() {
  const context = useContext(AppContext);

  const StyledHeader = styled(Flex, {
    padding: "$2 $4",
    zIndex: 10,
    borderBottom: "1px solid $slate5",
    backgroundColor: "$slate1",
    position: "sticky",
    top: 0
  });

  const StyledLogo = styled(Link, {
    textDecoration: "none",
    "& img": {
      width: "7rem",
    },
    '@media (max-width: 768px)': {
      "& img": {
        width: "5rem",
      },
    }
  });

  const {versions} = useContext(AppContext);

  const rightActions = (isMobile: boolean) => {
    return <Flex gap="sm" align="both">
      <ThemeButton />
      <ActionButton
        size="sm"
        onClick={() => {
          const newLang = context.lang === 'cn' ? 'en' : 'cn';
          context.setLang(newLang);
          localStorage.setItem('lang', newLang);
        }}
      >
        <Translate />
      </ActionButton>
      <Select
        label="version"
        size='sm'
        onSelectionChange={(e) => {
          context.setVersion(e)
          localStorage.setItem('version', e as string);
        }}
        selectedKey={context.version}
      >
        {versions?.map((v) => <Option key={v.version}>{v.version}</Option>)}
      </Select>
      {isMobile && <Popover trigger={
        <ActionButton>
          <Menu />
        </ActionButton>
      }
        sideOffset={6}
        css={{ marginRight: "$4" }}
      >
        <NavigationMenuMobile />
      </Popover>
      }
    </Flex>
  }

  return (
    <>
      <ScrollToTop />
      <Media query='(max-width: 768px)'>
        {(isMobile) => (
          <StyledHeader justifyContent="between" align="v">
            <Flex wrap="false" align="v" css={{
              flex: 1,
              '@media (max-width: 768px)': {
                justifyContent: "space-between"
              }
            }}>
              <StyledLogo to='/' css={context.theme === 'dark-theme' ? { filter: "invert(0.9)" } : {}}>
                <img src={LOGO_URL} alt='galacean' />
              </StyledLogo>
              {isMobile && rightActions(true)}
              {!isMobile && <SearchBox></SearchBox>}
            </Flex>
            {!isMobile && (
              <Flex align="both" gap="sm">
                <NavigationMenu />
                <Socials />
                {rightActions(false)}
              </Flex>
            )}
          </StyledHeader>
        )
        }
      </Media >
    </>
  );
}

export default Header;
