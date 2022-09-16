import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Col, Menu, Row } from "antd";
import classNames from "classnames";
import MobileMenu from "rc-drawer-menu";
import React, { useEffect } from "react";
import { useImmer } from "use-immer";
import { ServerDataProps } from "../../pages/docs";

interface DocProps {
  isMobile: boolean;
  serverData: ServerDataProps[];
}
type MenuItem = { key: string; type: string; children?: string[]; groups?: { [groupName: string]: string[] } };

const generateSubMenu = (groups: { [groupName: string]: string[] }) => {
  const res: JSX.Element[] = [];
  for (const [key, value] of Object.entries(groups)) {
    res.push(
      <Menu.ItemGroup title={key}>
        {value.map((item) => {
          return <Menu.SubMenu>{item}</Menu.SubMenu>;
        })}
      </Menu.ItemGroup>
    );
  }
  return res;
};

const generateMenuItem = (menuItemArray: MenuItem[]) => {
  const res: JSX.Element[] = [];
  menuItemArray.forEach((item) => {
    if (Object.keys(item.groups).length > 0) {
      res.push(<Menu.Item key={item.key}>{generateSubMenu(item.groups)}</Menu.Item>);
      return;
    }
    if (item.children.length > 0) {
      res.push(
        <Menu.Item key={item.key}>
          {item.children.map((child) => {
            return (
              <Menu.SubMenu title={child}>
                <Menu.Item>{child}</Menu.Item>
              </Menu.SubMenu>
            );
          })}
        </Menu.Item>
      );
    }
  });
  return res;
};

const Doc: React.FC<DocProps> = (props) => {
  const [menuItems, setMenuItems] = useImmer<MenuItem[]>([]);
  const { isMobile } = props;
  let openKeys: Array<string> = [];
  let selectedKeys: Array<string> = [];
  const onOpenChange = () => {};
  const mainContainerClass = classNames("main-container", {});
  const menuComponent = (
    <Menu
      {...{
        openKeys, //当前展开的 SubMenu 菜单项 key 数组
        selectedKeys, //当前选中的菜单项 key 数组
        mode: "inline", //内嵌模式
        onOpenChange, //SubMenu 展开/关闭的回调
        className: "aside-container",
      }}
    >
      {generateMenuItem(menuItems)}
    </Menu>
  );
  useEffect(() => {
    const menuItemArray: MenuItem[] = [];
    props.serverData
      .filter((data) => data.lang === "cn")
      .forEach((data) => {
        const {
          frontmatter: { order, type, title, group }
        } = data;
        if (!menuItemArray.find((item) => item.type === type)) {
          // create a new top level menu item
          const newMenuItem: MenuItem = { type, key: type, groups: {} };
          if (group) {
            newMenuItem.groups[group] = [];
            newMenuItem.groups[group][order] = title;
          } else {
            newMenuItem.children = [];
            newMenuItem.children[order] = title;
          }
          menuItemArray.push(newMenuItem);
        } else {
          // add item into menu groups/children
          const currentMenuItem = menuItemArray.find((item) => item.type === type);
          if (data.frontmatter.group) {
            if (currentMenuItem.groups[group]) {
              currentMenuItem.groups[group][order] = title;
            } else {
              currentMenuItem.groups[group] = [];
              currentMenuItem.groups[group][order] = title;
            }
          } else {
            if (currentMenuItem.children) {
              currentMenuItem.children[order] = title;
            } else {
              currentMenuItem.children = [];
              currentMenuItem.children[order] = title;
            }
          }
        }
        setMenuItems((draft) => {
          draft = menuItemArray;
        });
      });
    setMenuItems(menuItemArray);
  }, [props.serverData]);
  return (
    <div className="main-wrapper">
      <Row>
        {isMobile ? (
          <MobileMenu
            iconChild={[<MenuUnfoldOutlined />, <MenuFoldOutlined />]}
            key="mobile-menu"
            wrapperClassName="drawer-wrapper"
          >
            {menuComponent}
          </MobileMenu>
        ) : (
          <Col xxl={4} xl={5} lg={6} md={24} sm={24} xs={24} className="main-menu">
            {menuComponent}
            {/* {JSON.stringify(menuItems)} */}
          </Col>
        )}
        {/* <Col xxl={20} xl={19} lg={18} md={24} sm={24} xs={24}>
          <div className={mainContainerClass}>
            <Article content={localizedPageData} />
          </div>
        </Col> */}
      </Row>
      {/* <Row>
        <Col lg={{ span: 20, offset: 4 }} md={24} sm={24} xs={24}>
          <section className="prev-next-nav">
            {previous ? (
              <div className="prev-page">
                <LeftOutlined className="footer-nav-icon-before" />
                {previous.props.children}
              </div>
            ) : null}
            {next ? (
              <div className="next-page">
                {next.props.children}
                <RightOutlined className="footer-nav-icon-after" />
              </div>
            ) : null}
          </section>
        </Col>
      </Row> */}
    </div>
  );
};

export default Doc;
