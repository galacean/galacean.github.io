import { MenuUnfoldOutlined, SearchOutlined } from '@ant-design/icons';
import { useContext, useEffect, useRef, useState } from 'react';
import Media from 'react-media';
import { useNavigate, useParams } from 'react-router-dom';
import { Flex } from '../../ui/Flex';
import MenuBar from '../../ui/MenuBar';
import { Input } from '../../ui/Input';
import { AppContext } from '../contextProvider';
import { fetchMenuList } from '../doc/util/docUtil';
import Header from '../header';
import Playground, { StyledCodeBox, StyledSource } from '../Playground';
import { styled } from '../../ui/design-system';

const StyledSearchBar = styled("div", {
  padding: "$4 $4 0"
});

const StyledContent = styled("div", {
  flex: 1,
  height: 'calc(100vh - 64px)',
  width: "calc(100vw - 300px)",
  [`& ${StyledCodeBox}`]: {
    height: "100%"
  },
  [`& ${StyledSource}`]: {
    maxHeight: "100%"
  }
});

const StyledNav = styled("nav", {
  borderRight: "1px solid $slate5"
})

export default function Examples() {
  const context = useContext(AppContext);
  const [items, setItems] = useState<any[]>([]);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [selectedExampleId, setSelectedExampleId] = useState('');
  const menuKeyTitleMapRef = useRef<Map<string, string>>(new Map());
  const { version, exampleTitle } = useParams();
  const navigate = useNavigate();

  const [menuVisible, toggleMenu] = useState(false);
  const [search, setSearch] = useState('');

  const menu = (
    <MenuBar
      items={filteredItems}
      selectedKeys={[selectedExampleId]}
      onClick={(item) => {
        setSelectedExampleId(item.key);
      }}
      css={{
        width: '300px',
        height: 'calc(100vh - 124px)',
        overflow: 'auto'
      }}
    ></MenuBar>
  );

  useEffect(() => {
    context.setVersion(version);
  }, [version]);

  useEffect(() => {
    setSelectedExampleId('');
    setItems([]);
    setFilteredItems([]);
    menuKeyTitleMapRef.current.clear();
    navigate(`/examples/${context.version}`);
    fetchMenuList('ts', context.version).then((list) => {
      const itemRes: any[] = [];
      list
        .sort((a, b) => a.weight - b.weight)
        .forEach((data) => {
          const { id, name, children, files } = data;
          const newRootMenu: any = {
            type: 'group',
            key: id,
            label: name,
            children: [],
          };
          // create items
          if (files?.length > 0) {
            files
              .sort((a, b) => a.weight - b.weight)
              .filter((a) => a.type === 'ts')
              .forEach((file) => {
                menuKeyTitleMapRef.current.set(id + '-' + file.id, file.filename.slice(0, -3));
                newRootMenu.children.push({
                  label: file.title,
                  key: id + '-' + file.id,
                });
              });
          }
          itemRes.push(newRootMenu);
        });
      // init routing from path params
      if (exampleTitle && Array.from(menuKeyTitleMapRef.current.values()).includes(exampleTitle)) {
        for (let [key, value] of menuKeyTitleMapRef.current.entries()) {
          if (value === exampleTitle) {
            setSelectedExampleId(key);
            break;
          }
        }
        // init routing by default first doc
      } else {
        const defaultSelectedDocId =
          (itemRes[0] as any)?.children?.[0]?.children?.[0]?.key || (itemRes[0] as any)?.children?.[0].key;
        if (defaultSelectedDocId) {
          setSelectedExampleId(defaultSelectedDocId);
        }
      }
      setItems(itemRes);
      setFilteredItems(itemRes);
    });
  }, [context.version]);

  // update URL address
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    const selectedExampleTitle = menuKeyTitleMapRef.current.get(selectedExampleId);
    if (!exampleTitle && selectedExampleId) {
      navigate(`/examples/${context.version}/${selectedExampleTitle}`);
      return;
    }
    if (exampleTitle && exampleTitle !== selectedExampleTitle) {
      setSelectedExampleId(selectedExampleId);
      navigate(`/examples/${context.version}/${selectedExampleTitle}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedExampleId, items.length, context.version]);

  // update selected items when url changes
  useEffect(() => {
    if (!exampleTitle) {
      return;
    }
    for (let [key, value] of menuKeyTitleMapRef.current.entries()) {
      if (value === exampleTitle) {
        setSelectedExampleId(key);
        break;
      }
    }
  }, [exampleTitle, context.version]);

  // filter items
  useEffect(() => {
    const filtered: Array<any> = [];
    if (!search) {
      setFilteredItems([...items]);
    } else {
      items.forEach((group: any) => {
        let newGroup: any = Object.assign({}, group);
        newGroup.children = (group as any).children.filter((i: { label: string }) =>
          i.label?.toLocaleLowerCase().includes(search?.toLocaleLowerCase())
        );
        filtered.push(newGroup);
      });
      setFilteredItems(filtered);
    }
  }, [search]);

  return (
    <>
      <Media query='(max-width: 599px)'>
        {(isMobile) => (
          <>
            <Header></Header>
            <Flex wrap="false">
              {!isMobile && (
                <StyledNav>
                  <StyledSearchBar>
                    <Input
                      size='md'
                      placeholder='Search...'
                      startSlot={<SearchOutlined />}
                      onChange={(e) => {
                        setSearch(e.currentTarget.value);
                      }}
                    />
                  </StyledSearchBar>
                  {menu}
                </StyledNav>
              )}
              <StyledContent>
                {isMobile && (
                  <Popover
                    className='examples-popover-menu'
                    placement='bottomRight'
                    content={menu}
                    trigger='click'
                    visible={menuVisible}
                    arrowPointAtCenter
                  >
                    <MenuUnfoldOutlined
                      className='nav-phone-icon'
                      onClick={() => {
                        toggleMenu(!menuVisible);
                      }}
                    />
                  </Popover>
                )}
                <Playground id={selectedExampleId} title={exampleTitle} />
              </StyledContent>
            </Flex>
          </>
        )}
      </Media>
    </>
  );
}
