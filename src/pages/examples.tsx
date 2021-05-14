import React, { useState } from 'react';
import { graphql } from "gatsby";
import WrapperLayout from '../components/layout';
import { Layout, Menu, Popover } from 'antd';
import { version } from '../../siteconfig.json';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import Media from 'react-media';
import './examples.less';
import Playground from '../components/Playground';

const { Sider, Content } = Layout;

export default function Examples(props: any) {
  const { nodes } = props.data.allPlayground;

  const [name, setName] = useState('pbr-helmet');
  const [menuVisible, toggleMenu] = useState(false);

  const menu = <Menu onSelect={(item) => { 
    setName(item.key); 
    toggleMenu(false);
  }} style={{ width: '300px!important', height: 'calc(100vh - 64px)', overflow: 'auto'}}>
    {nodes.map((node: any) => {
      const { name } = node;
      return <Menu.Item key={name}>
        {node.name}
      </Menu.Item>
    })}
  </Menu>

  const selectNode = nodes.find((node) => {
    return node.name === name;
  });

  let sourceCode = '';
  let formatedCode = '';

  if (selectNode) {
    sourceCode = selectNode.sourceCode;
    formatedCode = selectNode.formatedCode;
  }
  
  return (
    <>
      <WrapperLayout {...props}>
        <Media query="(max-width: 599px)">
          {(isMobile) => 
            <Layout hasSider={!isMobile}>
              {!isMobile && <Sider>{menu}</Sider>}
              <Content style={{height: 'calc(100vh - 64px)'}} className="examples-content">
                {isMobile &&
                  <Popover
                    className="examples-popover-menu"
                    placement="bottomRight"
                    content={menu}
                    trigger="click"
                    visible={menuVisible}
                    arrowPointAtCenter
                  >
                    <MenuUnfoldOutlined className="nav-phone-icon" onClick={() => {toggleMenu(!menuVisible)}} />
                  </Popover>
                }
                <Playground name={name} sourceCode={sourceCode} formatedCode={formatedCode}></Playground>
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
        id
        sourceCode, 
        formatedCode, 
      }
    }
  }
`;