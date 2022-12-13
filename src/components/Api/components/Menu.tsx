import { styled } from "@oasis-engine/editor-design-system";
import { PkgChild, PkgChildDetail } from '../util/apiUtil';
import { StyledKind, StyledKindIcon } from './KindModule';

interface IPackage {
  selectedPkg: string;
  pkgChildren: PkgChild[];
  pkgList: string[];
  childrenDetail: PkgChildDetail | null;
  onPkgClick: Function;
}

const SubMenu = (props: { id?: string; className: string; name?: string }) => {
  if (!props.name) return null;
  return (
    <StyledKind type={props.className}>
      <StyledKindIcon id={props.name}>
        {props.name}
      </StyledKindIcon>
    </StyledKind>
  );
};

const StyledNav = styled("nav", {
  position: "sticky",
  top: "$16",
  padding: "$4",
  overflow: "auto",
  fontSize: "$1",
  maxHeight: "100vh",
  width: "200px"
});

const StyledNavList = styled("ul", {
  listStyle: "none",
  variants: {
    "type": {
      "items": {
        paddingLeft: "$6",
        borderLeft: "1px solid $slate5"
      }
    }
  }
});

const StyledItem = styled("li", {
  variants: {
    current: {
      true: {
        position: "relative",
      },
      "&::before": {
        position: "absolute",
        top: "2px",
        left: "-31px",
        width: "1px",
        height: "20px",
        backgroundColor: "#0672de",
        content: ""
      }
    }
  }
});

const StyledMenuClass = styled("div", {
  "paddingLeft": "$3"
});

export default function Menu(props: IPackage) {
  return (
    <StyledNav>
      <StyledNavList>
        {props.pkgList.map((pkg: string) => {
          return (
            <StyledItem
              key={pkg}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                // props.setSelectedPkg(pkg);
                props.onPkgClick(pkg);
              }}
            >
              <StyledKind type="module">
                <StyledKindIcon>{pkg}</StyledKindIcon>
              </StyledKind>
              {pkg === props.selectedPkg && (
                <StyledMenuClass>
                  <SubMenu
                    id={props.childrenDetail?.name}
                    name={props.childrenDetail?.name}
                    className={props.childrenDetail?.kindString.toLowerCase().replaceAll(' ', '-') || ''}
                  ></SubMenu>
                </StyledMenuClass>
              )}
              <StyledNavList type="items">
                {pkg === props.selectedPkg &&
                  props.childrenDetail?.children &&
                  props.childrenDetail.children.map((child) => {
                    return (
                      child.name.startsWith("_") ? null : <StyledItem key={child.id}>
                        <SubMenu
                          id={child.name}
                          name={child.name}
                          className={child.kindString.toLowerCase().replaceAll(' ', '-') || ''}
                        ></SubMenu>
                      </StyledItem>
                    );
                  })}
              </StyledNavList>
            </StyledItem>
          );
        })}
      </StyledNavList>
    </StyledNav>
  );
}
