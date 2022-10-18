import { Affix } from 'antd';
import { PkgChild, PkgChildDetail } from '../util/apiUtil';

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
    <a href={'#' + props.id} className={`tsd-parent-kind-module tsd-kind-${props.className}`}>
      <span id={props.name} className='tsd-kind-icon'>
        {props.name}
      </span>
    </a>
  );
};

export default function Menu(props: IPackage) {
  return (
    <Affix>
      <nav className='tsd-menu-nav'>
        <ul className='tsd-menu-list'>
          {props.pkgList.map((pkg: string) => {
            return (
              <li
                key={pkg}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  // props.setSelectedPkg(pkg);
                  props.onPkgClick(pkg);
                }}
              >
                <span className={`tsd-parent-kind-module tsd-kind-module`}>
                  <span className='tsd-kind-icon'>{pkg}</span>
                </span>
                {pkg === props.selectedPkg && (
                  <div className='tsd-menu-class'>
                    <SubMenu
                      id={props.childrenDetail?.name}
                      name={props.childrenDetail?.name}
                      className={props.childrenDetail?.kindString.toLowerCase().replaceAll(' ', '-') || ''}
                    ></SubMenu>
                  </div>
                )}
                <ul className='tsd-menu-list tsd-menu-list-items'>
                  {pkg === props.selectedPkg &&
                    props.childrenDetail?.children &&
                    props.childrenDetail.children.map((child) => {
                      return (
                        <li key={child.id}>
                          <SubMenu
                            id={child.name}
                            name={child.name}
                            className={child.kindString.toLowerCase().replaceAll(' ', '-') || ''}
                          ></SubMenu>
                        </li>
                      );
                    })}
                </ul>
              </li>
            );
          })}
        </ul>
      </nav>
    </Affix>
  );
}
