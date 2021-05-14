import React, { useState } from 'react';
import { graphql } from "gatsby";
import WrapperLayout from '../components/layout';
import { Layout, Menu, Popover } from 'antd';
import { version } from '../../siteconfig.json';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import Media from 'react-media';
import './examples.less';

const { Sider, Content } = Layout;

export default function Examples(props: any) {
  const { nodes } = props.data.allPlayground;

  const [url, setUrl] = useState('pbr-helmet');
  const [menuVisible, toggleMenu] = useState(false);

  const menu = <Menu onSelect={(item) => { 
    setUrl(item.key); 
    toggleMenu(false);
  }} style={{ width: '300px!important', height: 'calc(100vh - 64px)', overflow: 'auto'}}>
    {nodes.map((node: any) => {
      const { name } = node;
      return <Menu.Item key={name}>
        {node.name}
      </Menu.Item>
    })}
  </Menu>


  return (
    <>
      <WrapperLayout {...props}>
        <Media query="(max-width: 599px)">
          {(isMobile) => 
            <Layout hasSider={!isMobile}>
              {!isMobile && <Sider>{menu}</Sider>}
              <Content style={{height: 'calc(100vh - 64px)'}}>
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
                <iframe src={`/${version}/playground/${url}`} frameBorder="0" width="100%" height="100%"></iframe>
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
      }
    }
  }
`;