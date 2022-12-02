import { List } from 'iconoir-react';
import { useContext, useEffect, useRef, useState } from 'react';
import Media from 'react-media';
import { useNavigate, useParams } from 'react-router-dom';
import { ActionButton } from '../../ui/ActionButton';
import { styled } from '../../ui/design-system';
import { Flex } from '../../ui/Flex';
import { Popover } from '../../ui/Popover';
import { AppContext } from '../contextProvider';
import Footer from '../footer';
import LoadingIcon from '../Loading';
import DocDetail from './components/DocDetail';
import DocMenu from './components/DocMenu';
import { fetchMenuList } from './util/docUtil';

const StyledDocContent = styled('div', {
  flex: 1
});

const StyledMenu = styled('div', {
  minWidth: "250px",
  maxHeight: '100vh',
  overflowY: 'auto',
  position: 'sticky',
  top: 0,
  borderRight: '1px solid $slate5',
  zIndex: 1
});

function Doc() {
  const context = useContext(AppContext);
  const [selectedDocId, setSelectedDocId] = useState('');
  const [items, setItems] = useState<any[]>([]);
  const { ver, docTitle, lang } = useParams();
  const languageCode = lang === 'en' ? 'en' : 'zh-CN';
  const navigate = useNavigate();
  const menuKeyTitleMapRef = useRef<Map<string, string>>(new Map());

  useEffect(() => {
    const currentSelectedDocTitle = menuKeyTitleMapRef.current.get(selectedDocId);
    navigate(
      `/docs/${context.version}/${context.lang === 'en' ? 'en' : 'zh'}/${context.lang === 'en'
        ? currentSelectedDocTitle?.replace('.zh-CN', '')
        : currentSelectedDocTitle + '.zh-CN'
      }`
    );
    setItems([]);
  }, [context.lang, context.version]);

  useEffect(() => {
    context.setVersion(ver);
  }, [ver]);

  useEffect(() => {
    menuKeyTitleMapRef.current.clear();
    fetchMenuList('markdown', context.version).then((list) => {
      const itemRes: any[] = [];
      list
        .sort((a, b) => a.weight - b.weight)
        .filter((item) => item.files.length > 0 || item.children.length > 0)
        .forEach((data) => {
          const { id, name, children, files, cn_name } = data;
          const newRootMenu: any = {
            key: id,
            label: lang === 'en' ? name : cn_name,
            children: [],
          };
          // create items
          if (files?.length > 0) {
            files
              .sort((a, b) => a.weight - b.weight)
              .filter((file) => file.lang === languageCode && file.type === 'markdown')
              .forEach((file) => {
                menuKeyTitleMapRef.current.set(id + '-' + file.id, file.filename.slice(0, -3));
                newRootMenu.children.push({
                  label: file.title,
                  key: id + '-' + file.id,
                });
              });
          }
          children
            .filter((item) => item.files.length > 0 || item.children.length > 0)
            .forEach((child, index) => {
              let newGroup: any = { type: 'group', label: lang === 'en' ? child.name : child.cn_name };
              newGroup.children = child.files
                .sort((a, b) => a.weight - b.weight)
                .filter((file) => file.lang === languageCode && file.type === 'markdown')
                .map((item, index) => {
                  menuKeyTitleMapRef.current.set(`${id}-${child.id}-${item.id}`, item.filename.slice(0, -3));
                  return { label: item.title, key: `${id}-${child.id}-${item.id}`, lang: item.lang };
                });
              newRootMenu.children.push(newGroup);
            });
          itemRes.push(newRootMenu);
        });
      // init routing from path params
      if (docTitle && Array.from(menuKeyTitleMapRef.current.values()).includes(docTitle)) {
        for (let [key, value] of menuKeyTitleMapRef.current.entries()) {
          if (value === docTitle) {
            setSelectedDocId(key);
            break;
          }
        }
        // init routing by default first doc
      } else {
        const defaultSelectedDocId =
          (itemRes[0] as any)?.children?.[0]?.children?.[0]?.key || (itemRes[0] as any)?.children?.[0]?.key;
        if (defaultSelectedDocId) {
          setSelectedDocId(defaultSelectedDocId);
          const selectedDocTitle = menuKeyTitleMapRef.current.get(defaultSelectedDocId);
          selectedDocTitle &&
            navigate(`/docs/${ver}/${context.lang === 'en' ? 'en' : 'zh'}/${selectedDocTitle}`);
        }
      }
      setItems(itemRes);
    });
  }, [lang, context.version]);

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    const selectedDocTitle = menuKeyTitleMapRef.current.get(selectedDocId);
    if (!selectedDocTitle) {
      return;
    }
    if (!docTitle && selectedDocId) {
      navigate(`/docs/${ver}/${context.lang === 'en' ? 'en' : 'zh'}/${selectedDocTitle}`);
      return;
    }
    if (docTitle && docTitle !== selectedDocTitle) {
      setSelectedDocId(selectedDocId);
      navigate(`/docs/${ver}/${context.lang === 'en' ? 'en' : 'zh'}/${selectedDocTitle}`);
    }
  }, [selectedDocId, items.length]);

  if (items.length === 0) {
    return <LoadingIcon></LoadingIcon>;
  }

  const menu = (
    <DocMenu
      {...{
        selectedDocId,
        setSelectedDocId,
        items,
        defaultOpenKeys: items[0]?.key as string,
      }}
    ></DocMenu>
  );

  const docDetail = <DocDetail {...{ selectedDocId, setSelectedDocId, menuKeyTitleMapRef }}></DocDetail>;

  return (
    <Media query='(max-width: 768px)'>
      {(isMobile) =>
        isMobile ? (
          <StyledDocContent>
            {docDetail}
            <Popover trigger={
              <ActionButton size="lg" css={{
                position: "fixed",
                right: "$4",
                bottom: "$16",
                zIndex: 11,
              }}>
                <List />
              </ActionButton>
            }
            sideOffset={6}
            css={{
              marginRight: "$4",
              maxHeight: "70vh",
              overflow: "auto"
            }}>
              {menu}
            </Popover>
            <Footer></Footer>
          </StyledDocContent>
        ) : (
          <Flex wrap={false}>
            <StyledMenu>{menu}</StyledMenu>
            <StyledDocContent>
              {docDetail}
              <Footer></Footer>
            </StyledDocContent>
          </Flex>
        )
      }
    </Media>
  );
}

export default Doc;
