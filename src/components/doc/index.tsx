import mermaid from 'mermaid'
import { List } from 'iconoir-react';
import { useContext, useEffect, useRef, useState } from 'react';
import Media from 'react-media';
import { useNavigate, useParams } from 'react-router-dom';
import { ActionButton } from '@oasis-engine/editor-components';
import { styled } from "@oasis-engine/editor-design-system";
import { Flex } from '@oasis-engine/editor-components';
import { Popover } from '@oasis-engine/editor-components';
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
  let { ver, docTitle, lang } = useParams();
  const navigate = useNavigate();
  const menuKeyTitleMapRef = useRef<Map<string, string>>(new Map());

  const setSelectedItem = (docTitle: string) => {
    let title = docTitle;

    if (context.lang === 'cn') {
      title += '.zh-CN'
    }
    // init routing from path params
    if (Array.from(menuKeyTitleMapRef.current.values()).includes(title)) {
      for (let [key, value] of menuKeyTitleMapRef.current.entries()) {
        if (value === title) {
          setSelectedDocId(key);
          break;
        }
      }
    }
  }

  useEffect(() => {
    if (!ver || !docTitle) {
      // set default version
      if (!ver) {
        ver = context.version;
      }

      if (!lang) {
        lang = context.lang;
      }

      // set default 
      if (!docTitle) {
        docTitle = 'install';
      }

      navigate(`/docs/${ver}/${lang}/${docTitle}`);
    }

    mermaid.initialize({
      startOnLoad: true,
    })
  }, [])

  useEffect(() => {
    // when route changes
    if (docTitle) {
      setSelectedItem(docTitle);
    }
  }, [docTitle])

  useEffect(() => {
    // navigate to new url if selectedDocId changes
    if (selectedDocId) {
      const selectedDocTitle = menuKeyTitleMapRef.current.get(selectedDocId);

      if (selectedDocTitle) {
        let title = selectedDocTitle.replace('.zh-CN', '');

        navigate(`/docs/${context.version}/${context.lang}/${title}`);
      }
    }
  }, [selectedDocId]);

  useEffect(() => {
    // navigate to new url if version or lang change.
    navigate(
      `/docs/${context.version}/${context.lang === 'en' ? 'en' : 'cn'}/${docTitle}`
    );

    menuKeyTitleMapRef.current.clear();

    const languageCode = context.lang === 'en' ? 'en' : 'zh-CN';

    fetchMenuList('markdown', context.version).then((list) => {
      const itemRes: any[] = [];
      list
        .sort((a, b) => a.weight - b.weight)
        .filter((item) => item.files.length > 0 || item.children.length > 0)
        .forEach((data) => {
          const { id, name, children, files, cn_name } = data;
          const newRootMenu: any = {
            key: id,
            label: context.lang === 'en' ? name : cn_name,
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
              let newGroup: any = { type: 'group', label: context.lang === 'en' ? child.name : child.cn_name };
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

      setItems(itemRes);
      setSelectedItem(docTitle);
    });
  }, [context.lang, context.version]);

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
