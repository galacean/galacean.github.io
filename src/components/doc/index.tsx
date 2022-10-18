import { Col, Row } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../contextProvider';
import DocDetail from './components/DocDetail';
import DocMenu from './components/DocMenu';
import { fetchMenuList } from './util/docUtil';

function Doc() {
  const context = useContext(AppContext);
  const [selectedDocId, setSelectedDocId] = useState('');
  const [items, setItems] = useState<ItemType[]>([]);
  const { docTitle, lang } = useParams();
  const navigate = useNavigate();
  const menuKeyTitleMapRef = useRef<Map<string, string>>(new Map());

  useEffect(() => {
    navigate(`/docs/${context.lang}`);
  }, [context.lang]);

  useEffect(() => {
    fetchMenuList('markdown', context.version).then((list) => {
      const itemRes: ItemType[] = [];
      list
        .sort((a, b) => a.weight - b.weight)
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
              .filter((file) => lang === file.lang)
              .forEach((file) => {
                menuKeyTitleMapRef.current.set(id + '-' + file.id, file.filename.slice(0, -3));
                newRootMenu.children.push({
                  label: file.title,
                  key: id + '-' + file.id,
                });
              });
          }
          children.forEach((child, index) => {
            let newGroup: any = { type: 'group', label: lang === 'en' ? name : cn_name };
            newGroup.children = child.files
              .sort((a, b) => a.weight - b.weight)
              .filter((file) => file.lang === lang)
              .map((item, index) => {
                menuKeyTitleMapRef.current.set(id + '-' + item.id, item.filename.slice(0, -3));
                return { label: item.title, key: id + '-' + item.id, lang: item.lang };
              });
            newRootMenu.children.push(newGroup);
          });
          itemRes.push(newRootMenu);
        });
      if (!selectedDocId) {
        // init routing from path params
        if (docTitle) {
          for (let [key, value] of menuKeyTitleMapRef.current.entries()) {
            if (value === docTitle) {
              setSelectedDocId(key);
              break;
            }
          }
          // init routing by default first doc
        } else {
          const defaultSelectedDocId =
            (itemRes[0] as any)?.children?.[0]?.children?.[0]?.key || (itemRes[0] as any)?.children?.[0].key;
          if (defaultSelectedDocId) {
            setSelectedDocId(defaultSelectedDocId);
          }
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
    if (!docTitle && selectedDocId) {
      navigate(`/docs/${context.lang}/${selectedDocTitle}`);
      return;
    }
    if (docTitle && docTitle !== selectedDocTitle) {
      setSelectedDocId(selectedDocId);
      navigate(`/docs/${context.lang}/${selectedDocTitle}`);
    }
  }, [selectedDocId, items.length]);

  if (items.length === 0) {
    return null;
  }
  return (
    <>
      <Row>
        <Col xxl={4} xl={5} lg={6} md={24} sm={24} xs={24} className='main-menu'>
          <DocMenu
            {...{
              selectedDocId,
              setSelectedDocId,
              items,
              defaultOpenKeys: items[0]?.key as string,
            }}
          ></DocMenu>
        </Col>
        <Col xxl={20} xl={19} lg={18} md={24} sm={24} xs={24}>
          <DocDetail selectedDocId={selectedDocId}></DocDetail>
        </Col>
      </Row>
    </>
  );
}

export default Doc;
