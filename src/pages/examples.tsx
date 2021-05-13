import React, { useState } from 'react';
import { graphql } from "gatsby";
import WrapperLayout from '../components/layout';
import { Layout, Menu } from 'antd';
import { version } from '../../siteconfig.json';

const { Sider, Content } = Layout;

export default function Examples(props: any) {
  const { nodes } = props.data.allPlayground;

  const [url, setUrl] = useState('pbr-helmet');

  return (
    <>
      <WrapperLayout {...props}>
        <Layout hasSider={true}>
          <Sider>
            <Menu onSelect={(item) => { setUrl(item.key); }} style={{ width: '300px!important', height: 'calc(100vh - 102px)', overflow: 'auto'}}>
              {nodes.map((node: any) => {
                const { name } = node;
                return <Menu.Item key={name}>
                  {node.name}
                </Menu.Item>
              })}
            </Menu>
          </Sider>
          <Content style={{height: 'calc(100vh - 102px)'}}>
            <iframe src={`/${version}/playground/${url}`} frameBorder="0" width="100%" height="100%"></iframe>
          </Content>
        </Layout>
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