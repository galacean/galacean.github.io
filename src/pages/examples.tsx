import React, { useState, useEffect } from 'react';
import { graphql } from "gatsby";
import WrapperLayout from '../components/layout';
import { Layout, Menu, Popover, Input } from 'antd';
import { MenuUnfoldOutlined, SearchOutlined } from '@ant-design/icons';
import Media from 'react-media';
import './examples.less';
import Playground from '../components/Playground';

const { Sider, Content } = Layout;

export default function Examples(props: any) {
  const { nodes } = props.data.allPlayground;

  const [name, setName] = useState('pbr-helmet');
  const [menuVisible, toggleMenu] = useState(false);
  const [search, setSearch] = useState('');

  const groups: any = {};

  let selectNode;

  nodes.forEach((node: any) => {
    const { category } = node;
    if (category) {
      if (!groups[category]) {
        groups[category] = [];
      }

      groups[category].push(node);
    }

    if (node.name === name) {
      selectNode = node;
    }
  });

  const itemGroups = []
  const searchReg = new RegExp(search, 'i');

  Object.keys(groups).forEach((category) => {
    const groupNodes = groups[category];
    let hasNodes = false;
    const filteredNodes = groupNodes.map((node) => {
      const nodeName = node.name;
      if (searchReg.test(nodeName)) {
        hasNodes = true;
        return <Menu.Item key={nodeName}>
          {node.title}
        </Menu.Item>
      }

      return null;
    });

    if (hasNodes) {
      itemGroups.push(<Menu.ItemGroup key={category} title={category}>
        {filteredNodes}
      </Menu.ItemGroup>)
    }
  })

  const menu = <Menu selectedKeys={[name]} onSelect={(item) => {
    setName(item.key);
    window.history.pushState(null, null, `#${item.key}`);
    toggleMenu(false);
  }} style={{ width: '300px!important', height: 'calc(100vh - 124px)', overflow: 'auto' }}>
    {itemGroups}
  </Menu>


  let sourceCode = '';
  let formatedCode = '';

  if (selectNode) {
    sourceCode = selectNode.sourceCode;
    formatedCode = selectNode.formatedCode;
  }

  useEffect(() => {
    const { hash } = window.location;

    if (hash) {
      setName(hash.replace('#', '') || 'pbr-helmet');
    }
  }, []);

  return (
    <>
      <WrapperLayout {...props} showVersion="true">
        <Media query="(max-width: 599px)">
          {(isMobile) =>
            <Layout hasSider={true}>
              {!isMobile && <Sider>
                <div className="examples-search">
                  <Input size="large" placeholder="Search..." prefix={<SearchOutlined />} onChange={(e) => {
                    setSearch(e.currentTarget.value);
                  }} />
                </div>
                {menu}
              </Sider>}
              <Content style={{ height: 'calc(100vh - 64px)' }} className="examples-content">
                {isMobile &&
                  <Popover
                    className="examples-popover-menu"
                    placement="bottomRight"
                    content={menu}
                    trigger="click"
                    visible={menuVisible}
                    arrowPointAtCenter
                  >
                    <MenuUnfoldOutlined className="nav-phone-icon" onClick={() => { toggleMenu(!menuVisible) }} />
                  </Popover>
                }
                <Playground name={name} sourceCode={sourceCode} formatedCode={formatedCode} />
              </Content>
            </Layout>
          }
        </Media>
      </WrapperLayout>
    </>
  );
}

export const query = graphql`
  query {
    allPlayground {
      nodes {
        internal {
          content
        }
        name
        title
        category
        id
        sourceCode 
        formatedCode 
      }
    }
  }
`;