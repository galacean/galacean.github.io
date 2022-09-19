import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Col, Menu, Row } from "antd";
import classNames from "classnames";
import MobileMenu from "rc-drawer-menu";
import React from "react";
import { ServerDataProps } from "../../pages/docs";

interface DocProps {
  isMobile: boolean;
  serverData: ServerDataProps[];
}
type MenuItem = {
  type: string;
  children?: { title: string; key: string }[];
  groups?: { [groupName: string]: { title: string; key: string }[] };
};

const generateSubMenu = (groups: { [groupName: string]: { title: string; key: string }[] }, type: string) => {
  const res: JSX.Element[] = [];
  for (const [key, value] of Object.entries(groups)) {
    res.push(
      <Menu.ItemGroup key={type + key} title={key}>
        {value.map((item) => {
          return <Menu.Item key={item.key}>{item.title}</Menu.Item>;
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
      res.push(
        <Menu.SubMenu key={item.type} title={item.type}>
          {generateSubMenu(item.groups, item.type)}
        </Menu.SubMenu>
      );
    }
    if (item.children.length > 0) {
      res.push(
        <Menu.SubMenu key={item.type} title={item.type}>
          {item.children.map((child) => {
            return <Menu.Item key={child.key}>{child.title}</Menu.Item>;
          })}
        </Menu.SubMenu>
      );
    }
  });
  return res;
};

const Doc: React.FC<DocProps> = (props) => {
  const { isMobile } = props;
  const onOpenChange = () => {
    console.log("test");
  };
  const mainContainerClass = classNames("main-container", {});

  const menuItems: MenuItem[] = [];
  props.serverData
    .filter((data) => data.lang === "cn")
    .forEach((data) => {
      const {
        frontmatter: { order, type, title, group }
      } = data;
      if (!menuItems.find((item) => item.type === type)) {
        // create a new top level menu item
        const newMenuItem: MenuItem = { type, groups: {}, children: [] };
        if (group) {
          newMenuItem.groups[group] = [];
          newMenuItem.groups[group].push({ title, key: data.fileName });
        } else {
          newMenuItem.children = [];
          newMenuItem.children.push({ title, key: data.fileName });
        }
        menuItems.push(newMenuItem);
      } else {
        // add item into menu groups/children
        const currentMenuItem = menuItems.find((item) => item.type === type);
        if (data.frontmatter.group) {
          if (currentMenuItem.groups[group]) {
            currentMenuItem.groups[group].push({ title, key: data.fileName });
          } else {
            currentMenuItem.groups[group] = [];
            currentMenuItem.groups[group].push({ title, key: data.fileName });
          }
        } else {
          if (currentMenuItem.children) {
            currentMenuItem.children.push({ title, key: data.fileName });
          } else {
            currentMenuItem.children = [];
            currentMenuItem.children.push({ title, key: data.fileName });
          }
        }
      }
    });
  let openKeys: Array<string> = ["1"];
  let selectedKeys: Array<string> = ["sub1"];

  const menuComponent = (
    <Menu mode="inline" defaultSelectedKeys={selectedKeys} defaultOpenKeys={openKeys} className="aside-container">
      {generateMenuItem(menuItems)}
    </Menu>
  );
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
