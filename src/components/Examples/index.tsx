import { MenuUnfoldOutlined, SearchOutlined } from '@ant-design/icons';
import { Input, Layout, Menu, Popover } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { useContext, useEffect, useRef, useState } from 'react';
import Media from 'react-media';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../contextProvider';
import { fetchMenuList } from '../doc/util/docUtil';
import Footer from '../footer';
import Header from '../header';
import Playground from '../Playground';
import './index.less';

const { Sider, Content } = Layout;

export default function Examples() {
  const context = useContext(AppContext);
  const [items, setItems] = useState<ItemType[]>([]);
  const [filteredItems, setFilteredItems] = useState<ItemType[]>([]);
  const [selectedExampleId, setSelectedExampleId] = useState('');
  const menuKeyTitleMapRef = useRef<Map<string, string>>(new Map());
  const { exampleTitle } = useParams();
  const navigate = useNavigate();

  const [menuVisible, toggleMenu] = useState(false);
  const [search, setSearch] = useState('');

  const menu = (
    <Menu
      items={filteredItems}
      selectedKeys={[selectedExampleId]}
      onSelect={(item) => {
        setSelectedExampleId(item.key);
      }}
      style={{ width: '300px!important', height: 'calc(100vh - 124px)', overflow: 'auto' }}
    ></Menu>
  );

  useEffect(() => {
    fetchMenuList('ts', context.version).then((list) => {
      const itemRes: ItemType[] = [];
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
      if (!selectedExampleId) {
        // init routing from path params
        if (exampleTitle) {
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
      navigate(`/examples/${selectedExampleTitle}`);
      return;
    }
    if (exampleTitle && exampleTitle !== selectedExampleTitle) {
      setSelectedExampleId(selectedExampleId);
      navigate(`/examples/${selectedExampleTitle}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedExampleId, items.length]);

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
  }, [exampleTitle]);

  // filter items
  useEffect(() => {
    const filtered: Array<ItemType> = [];
    if (!search) {
      setFilteredItems([...items]);
    } else {
      items.forEach((group: any) => {
        let newGroup: any = Object.assign({}, group);
        newGroup.children = (group as any).children.filter((i: { label: string }) =>
          i.label.includes(search)
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
            <Layout hasSider={true}>
              {!isMobile && (
                <Sider>
                  <div className='examples-search'>
                    <Input
                      size='large'
                      placeholder='Search...'
                      prefix={<SearchOutlined />}
                      onChange={(e) => {
                        setSearch(e.currentTarget.value);
                      }}
                    />
                  </div>
                  {menu}
                </Sider>
              )}
              <Content style={{ height: 'calc(100vh - 64px)' }} className='examples-content'>
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
              </Content>
            </Layout>
          </>
        )}
      </Media>
    </>
  );
}
