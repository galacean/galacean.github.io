import { MenuUnfoldOutlined } from '@ant-design/icons';
import { useContext, useEffect, useState } from 'react';
import Media from 'react-media';
import { useNavigate, useParams } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from '../../ui/Breadcrumb';
import { styled } from '../../ui/design-system';
import { Flex } from '../../ui/Flex';
import { AppContext } from '../contextProvider';
import LoadingIcon from '../Loading';
import Menu from './components/Menu';
import Module from './components/Module';
import Package from './components/Package';

import {
  fetchPkgChildren,
  fetchPkgChildrenDetail,
  fetchPkgList,
  PkgChild,
  PkgChildDetail,
} from './util/apiUtil';

const StyledContent = styled("article", {
  padding: '$8',
  backgroundColor: '$slate1',
  fontSize: "$2",
  flex: 1
});

const StyledBreadcrumb = styled("div", {
  margin: "0 $2 $4"
});

const StyledPanel = styled("section", {
  padding: "0 $4 $4 $4",
  border: "1px solid $slate5",
  borderRadius: "$2",
  "& h2": {
    margin: "0 -$4 0",
    padding: "$2 $4 $2",
    fontSize: "$4"
  },
  "& h3": {
    fontSize: "$3",
    margin: "$2 -$4 0"
  },
  "& h4": {
    fontSize: "$2"
  }
});


const Api = () => {
  const [pkgList, setPkgList] = useState<Array<string>>([]);
  const [pkgChildren, setPkgChildren] = useState<PkgChild[]>([]);
  const [childrenDetail, setChildrenDetail] = useState<PkgChildDetail | null>(null);
  const [selectedPkg, setSelectedPkg] = useState('');
  const [selectedItem, setSelectedItem] = useState<number>();
  const { ver, pkg, item } = useParams();
  const { version, setVersion } = useContext(AppContext);

  const pkgSet = new Set<string>();
  pkgChildren.forEach((item) => {
    if (!pkgSet.has(item.kind)) {
      pkgSet.add(item.kind);
    }
  });

  // page init: get package list; set selected package
  useEffect(() => {
    setSelectedItem(undefined);
    setPkgChildren([]);
    setChildrenDetail(null);
    setPkgList([]);

    fetchPkgList(version).then((res) => {
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
  }, [version]);

  useEffect(() => {
    // skip running this effect if data is not ready yet.
    if (pkgList.length === 0) {
      return;
    }
    fetchPkgChildren(selectedPkg, version).then((res) => {
      setPkgChildren(res);
      const chosenItem = res.find((i) => i.name === item);
      if (item && chosenItem) {
        setSelectedItem(chosenItem.id);
      } else {
        setSelectedItem(undefined);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPkg, version]);

  useEffect(() => {
    // skip running this effect if data is not ready yet.
    if (pkgChildren.length === 0) {
      return;
    }
    fetchPkgChildrenDetail(selectedPkg, selectedItem, version).then((res) => {
      setChildrenDetail(res);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem, version]);

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

  useEffect(() => {
    setVersion(ver);
  }, [ver]);

  if (pkgList.length === 0 || pkgChildren.length === 0) {
    return <LoadingIcon></LoadingIcon>;
  }

  const menu = (
    <Menu
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
  );

  return (
    <Media query='(max-width: 768px)'>
      {(isMobile) => (
        <Flex wrap="false">
          <StyledContent>
            <StyledBreadcrumb>
              <Breadcrumb>
                <BreadcrumbItem>API</BreadcrumbItem>
                <BreadcrumbItem>
                  <span
                    onClick={() => {
                      setSelectedItem(undefined);
                      setChildrenDetail(null);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    {selectedPkg}
                  </span>
                </BreadcrumbItem>
                {selectedItem && (
                  <BreadcrumbItem>
                    <span>{pkgChildren.find((child) => child.id === selectedItem)?.name}</span>
                  </BreadcrumbItem>
                )}
              </Breadcrumb>
            </StyledBreadcrumb>
            {selectedItem ? (
              <>{childrenDetail && <Module {...childrenDetail} />}</>
            ) : (
              <StyledPanel >
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
              </StyledPanel>
            )}
          </StyledContent>
          {isMobile ? (
            <Popover placement='bottomRight' content={menu} trigger='click' arrowPointAtCenter>
              <MenuUnfoldOutlined
                className='nav-phone-icon'
                style={{ zIndex: 20, top: '25px', left: '30px' }}
              />
            </Popover>
          ) : (
            <nav>{menu}</nav>
          )}
        </Flex>
      )
      }
    </Media >
  );
};

export default Api;
