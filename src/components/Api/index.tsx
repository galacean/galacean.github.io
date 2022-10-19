import { MenuUnfoldOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Popover } from 'antd';
import { useEffect, useState } from 'react';
import Media from 'react-media';
import { useNavigate, useParams } from 'react-router-dom';
import Menu from './components/Menu';
import Module from './components/Module';
import Package from './components/Package';
import './index.less';
import {
  fetchPkgChildren,
  fetchPkgChildrenDetail,
  fetchPkgList,
  PkgChild,
  PkgChildDetail
} from './util/apiUtil';

const pkgListRes = fetchPkgList();
const { Sider, Content } = Layout;

const Api = () => {
  const [pkgList, setPkgList] = useState<Array<string>>([]);
  const [pkgChildren, setPkgChildren] = useState<PkgChild[]>([]);
  const [childrenDetail, setChildrenDetail] = useState<PkgChildDetail | null>(null);
  const [selectedPkg, setSelectedPkg] = useState('');
  const [selectedItem, setSelectedItem] = useState<number>();
  const navigate = useNavigate();
  const { pkg, item } = useParams();

  const pkgSet = new Set<string>();
  pkgChildren.forEach((item) => {
    if (!pkgSet.has(item.kind)) {
      pkgSet.add(item.kind);
    }
  });

  // page init: get package list; set selected package
  useEffect(() => {
    pkgListRes.then((res) => {
      if (res?.length === 0) {
        return;
      }
      res.sort();
      setPkgList(res);

      if (pkg && res.includes(pkg)) {
        setSelectedPkg(pkg);
      } else {
        setSelectedPkg(res[0]);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // skip running this effect if data is not ready yet.
    if (pkgList.length === 0) {
      return;
    }
    fetchPkgChildren(selectedPkg).then((res) => {
      setPkgChildren(res);
      const chosenItem = res.find((i) => i.name === item);
      if (item && chosenItem) {
        setSelectedItem(chosenItem.id);
        navigate(`/api/${selectedPkg}/${item}`);
      } else {
        setSelectedItem(undefined);
        navigate(`/api/${selectedPkg}`);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPkg]);

  useEffect(() => {
    // skip running this effect if data is not ready yet.
    if (pkgChildren.length === 0) {
      return;
    }
    fetchPkgChildrenDetail(selectedPkg, selectedItem).then((res) => {
      setChildrenDetail(res);
    });
    navigate(
      `/api/${selectedPkg}${selectedItem ? '/' + pkgChildren.find((child) => child.id === selectedItem)?.name : ''
      }`
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem]);

  useEffect(() => {
    const chosenItemId = pkgChildren.find((i) => i.name === item)?.id;
    setSelectedItem(chosenItemId);
  }, [item]);

  useEffect(() => {
    // skip running this effect if data is not ready yet.
    if (pkgList.length === 0) {
      return;
    }
    if (pkg && !pkgList.includes(pkg)) {
      setSelectedPkg(pkgList[0]);
      setSelectedItem(undefined);
      return;
    }
    pkg && setSelectedPkg(pkg);
  }, [pkg]);

  if (pkgList.length === 0 || pkgChildren.length === 0) {
    return null;
  }

  const menu = <Menu
    {...{
      pkgList,
      pkgChildren,
      selectedPkg,
      childrenDetail,
      onPkgClick: (pkg: string) => {
        if (pkg !== selectedPkg) {
          setSelectedPkg(pkg);
          setSelectedItem(undefined);
          setChildrenDetail(null);
        }
      },
    }}
  ></Menu>

  return (
    <Media query="(max-width: 768px)">
      {(isMobile) =>
        <Layout hasSider={true}>
          <Content className='api' style={{ padding: '20px', backgroundColor: '#fff' }}>
            <article className='tsc-content'>
              <div className='tsc-nav'>
                <Breadcrumb>
                  <Breadcrumb.Item className='docsearch-lvl0'>API</Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <span
                      onClick={() => {
                        setSelectedItem(undefined);
                        setChildrenDetail(null);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      {selectedPkg}
                    </span>
                  </Breadcrumb.Item>
                  {selectedItem && (
                    <Breadcrumb.Item>
                      <span>{pkgChildren.find((child) => child.id === selectedItem)?.name}</span>
                    </Breadcrumb.Item>
                  )}
                </Breadcrumb>
              </div>
              {selectedItem ? (
                <>{childrenDetail && <Module {...childrenDetail} />}</>
              ) : (
                <section className='tsd-panel tsd-index-panel'>
                  {Array.from(pkgSet).map((kind) => {
                    return (
                      <Package
                        key={kind}
                        {...{
                          setSelectedItem,
                          kind,
                          pgkChildren: pkgChildren.filter((child) => child.kind === kind),
                        }}
                      />
                    );
                  })}
                </section>
              )}
            </article>
          </Content>
          {isMobile ?
            <Popover
              placement="bottomRight"
              content={menu}
              trigger="click"
              arrowPointAtCenter
            >
              <MenuUnfoldOutlined className="nav-phone-icon" style={{zIndex: 20, top: "25px", left: "30px"}}/>
            </Popover>
            :
            <Sider style={{ width: '300px!important' }}>
              {menu}
            </Sider>
          }
        </Layout>
      }
    </Media>
  );
};

export default Api;
