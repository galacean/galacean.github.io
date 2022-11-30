import { Translate } from 'iconoir-react';
import { useContext } from 'react';
import { useIntl } from 'react-intl';
import Media from 'react-media';
import { Link } from 'react-router-dom';
import config from '../../siteconfig.json';
import { ActionButton } from '../../ui/ActionButton';
import { styled } from '../../ui/design-system';
import { Flex } from '../../ui/Flex';
import { Item, Select } from '../../ui/Select';
import { AppContext } from '../contextProvider';
import NavigationMenu from './components/NavigationMenu';
import SearchBox from './components/SearchBox';
import Socials from './components/Socials';
import ThemeButton from './components/ThemeButton';

const { versions } = config;
const LOGO_URL = 'https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*w3sZQpMix18AAAAAAAAAAAAAARQnAQ';

function Header() {
  const formatMessage = useIntl().formatMessage;
  const context = useContext(AppContext);
  const isZhCN = context.lang === 'zh-CN';

  const StyledHeader = styled(Flex, {
    padding: "$2 $4",
    position: "relative",
    zIndex: 10,
    borderBottom: "1px solid $slate5"
  });

  const StyledLogo = styled(Link, {
    textDecoration: "none",
    "& img": {
      width: "200px",
      opacity: 0.9
    }
  });

  return (
    <Media query='(max-width: 768px)'>
      {(isMobile) => (
        <StyledHeader justifyContent="between" align="both">
          {isMobile && (
            null
            // <Popover
            //   overlayClassName='popover-menu'
            //   placement='bottomRight'
            //   content={getMenu(true)}
            //   trigger='click'
            //   arrowPointAtCenter
            // >
            //   <MenuOutlined className='nav-phone-icon' />
            // </Popover>
          )}
          <Flex css={{ flex: 1 }}>
            <StyledLogo to='/' css={context.theme === 'dark-theme' ? { filter: "invert(0.9)" } : {}}>
              <img src={LOGO_URL} alt='Oasis Engine' />
            </StyledLogo>
            {!isMobile && <SearchBox></SearchBox>}
          </Flex>
          {!isMobile && (
            <Flex align="both" gap="sm">
              <NavigationMenu />
              <Socials />
              <ThemeButton />
              <ActionButton
                size="sm"
                onClick={() => {
                  const newLang = context.lang === 'zh-CN' ? 'en' : 'zh-CN';
                  context.setLang(newLang);
                  localStorage.setItem('lang', newLang);
                }}
              >
                <Translate />
              </ActionButton>
              <Select size='sm'
                onSelectionChange={(e) => {
                  context.setVersion(e)
                }}
                selectedKey={context.version}
              >
                {versions.map((v) => <Item key={v}>{v}</Item>)}
              </Select>
            </Flex>
          )}
        </StyledHeader>
      )}
    </Media>
  );
}

export default Header;
