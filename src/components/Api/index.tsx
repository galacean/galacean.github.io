import { List } from 'iconoir-react';
import { useContext, useEffect, useState } from 'react';
import Media from 'react-media';
import { useNavigate, useParams } from 'react-router-dom';
import { ActionButton } from '@oasis-engine/editor-components';
import { Breadcrumb, BreadcrumbItem } from '@oasis-engine/editor-components';
import { styled } from "@oasis-engine/editor-design-system";
import { Flex } from '@oasis-engine/editor-components';
import { Popover } from '@oasis-engine/editor-components';
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
  PkgChildDetail
} from './util/apiUtil';

const StyledContent = styled("article", {
  padding: '$8',
  backgroundColor: '$slate1',
  fontSize: "$2",
  flex: 1,
  '@media (max-width: 768px)': {
    padding: '$4',
  }
});

const StyledBreadcrumb = styled("div", {
  marginBottom: "$2"
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


const PackagePage = ({ isMobile, pkg, version, pkgChildren }: { isMobile: boolean, pkg: string, version: string, pkgChildren: PkgChild[] }) => {
  const [children, setChildren] = useState<Record<string, PkgChild[]>>();
  const navigate = useNavigate();

  useEffect(() => {
    const tempChildren: Record<string, PkgChild[]> = {};

    pkgChildren.forEach((item) => {
      if (!tempChildren[item.kind]) {
        tempChildren[item.kind] = [];
      }

      tempChildren[item.kind].push(item);
    });

    setChildren(tempChildren);
  }, [pkg, pkgChildren]);


  return <Flex wrap="false">
    <StyledContent>
      <NavBreadcrumb pkg={pkg} version={version} />
      <StyledPanel>
        {children && Object.keys(children).map((kind) => {
          return (
            <Package
              key={kind}
              setSelectedItem={(id: number, name: string) => {
                navigate(`/api/${version}/${pkg}/${name}`);
              }}
              kind={kind}
              pgkChildren={children[kind]}
            />
          );
        })}
      </StyledPanel>
    </StyledContent>
    <ResponsibleMenu isMobile={isMobile} version={version} pkg={pkg} pkgChildren={pkgChildren} />
  </Flex>
}

const ModulePage = ({ isMobile, pkg, version, id, name, pkgChildren }: { isMobile: boolean, pkg: string, version: string, name?: string, id?: number, pkgChildren: PkgChild[] }) => {
  const [childrenDetail, setChildrenDetail] = useState<PkgChildDetail | null>();

  useEffect(() => {
    if (id) {
      fetchPkgChildrenDetail(pkg, id, version).then((res) => {
        setChildrenDetail(res);
      });
    }
    else if (name) {
      const item = pkgChildren.find((child) => child.name === name);

      if (item) {
        fetchPkgChildrenDetail(pkg, item.id, version).then((res) => {
          setChildrenDetail(res);
        });
      }
    }
  }, []);

  return <Flex wrap="false">
    {childrenDetail ? <StyledContent>
      <NavBreadcrumb pkg={pkg} version={version} name={name} />
      <Module {...childrenDetail} />
    </StyledContent> : null}
    <ResponsibleMenu isMobile={isMobile} version={version} pkg={pkg} pkgChildren={pkgChildren} childrenDetail={childrenDetail} />
  </Flex>
}

const NavMenu = ({ version, pkg, pkgChildren, childrenDetail }: { version: string, pkg: string, pkgChildren: PkgChild[], childrenDetail?: PkgChildDetail }) => {
  const [pkgList, setPkgList] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPkgList(version).then((res: string[]) => {
      if (res?.length === 0) {
        return;
      }
      res.sort();
      setPkgList(res);
    });

  }, []);

  return <Menu
    {...{
      pkgList,
      pkgChildren,
      selectedPkg: pkg,
      childrenDetail,
      onPkgClick: (newPkg: string) => {
        if (pkg !== newPkg) {
          navigate(`/api/${version}/${newPkg}`);
        }
      },
    }}
  ></Menu>
}

const ResponsibleMenu = ({ isMobile, version, pkg, pkgChildren, childrenDetail }: { isMobile: boolean, version: string, pkg: string, pkgChildren: PkgChild[], childrenDetail?: PkgChildDetail }) => {
  return isMobile ? (
    <Popover trigger={
      <ActionButton size="lg" css={{ position: "fixed", right: "$4", bottom: "$16", zIndex: 11, }}>
        <List />
      </ActionButton>
    } sideOffset={6} css={{ marginRight: "$4", maxHeight: "70vh", overflow: "auto" }}>
      <NavMenu version={version} pkgChildren={pkgChildren} pkg={pkg} childrenDetail={childrenDetail} />
    </Popover>
  ) :
  <NavMenu version={version} pkgChildren={pkgChildren} pkg={pkg} childrenDetail={childrenDetail} />
}

const NavBreadcrumb = ({ pkg, version, name }: { pkg: string, version: string, name?: string }) => {
  const navigate = useNavigate();

  return <StyledBreadcrumb>
    <Breadcrumb>
      <BreadcrumbItem>API</BreadcrumbItem>
      <BreadcrumbItem>
        <span onClick={() => {
          navigate(`/api/${version}/${pkg}`);
        }}
          style={{ cursor: 'pointer' }}
        >
          {pkg}
        </span>
      </BreadcrumbItem>
      {name && (
        <BreadcrumbItem>
          <span>{name}</span>
        </BreadcrumbItem>
      )}
    </Breadcrumb>
  </StyledBreadcrumb>
}

const Api = () => {
  let { pkg, name } = useParams();
  let { version } = useContext(AppContext);
  const [pkgChildren, setPkgChildren] = useState<PkgChild[]>();
  const navigate = useNavigate();

  if (!pkg) {
    pkg = pkg || 'core';
    navigate(`/api/${version}/${pkg}`);
  }

  useEffect(() => {
    fetchPkgChildren(pkg, version).then((res) => {
      setPkgChildren(res);
    });
  }, [pkg]);

  return (
    <Media query='(max-width: 768px)'>
      {(isMobile) => pkgChildren ? (name ?
        <ModulePage pkgChildren={pkgChildren} pkg={pkg} name={name} version={version} isMobile={isMobile} /> :
        <PackagePage pkgChildren={pkgChildren} pkg={pkg} version={version} isMobile={isMobile} />) : <LoadingIcon></LoadingIcon>}
    </Media >
  );
};

export default Api;
