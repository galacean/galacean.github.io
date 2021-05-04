import React from 'react';
import { graphql } from "gatsby";
import Menu from '../components/typedoc/Menu';
import WrapperLayout from '../components/layout';
import { Layout, Breadcrumb } from 'antd';
import Package from '../components/typedoc/Package';
import Module from '../components/typedoc/Module';

const { Sider, Content } = Layout;

export default function API (props: any) {
  const { node, paths, type, packages, packageIndex } = props.pageContext;
  const path = paths.split('/');

  if (type === 'module' && packageIndex !== undefined) {
    packages[packageIndex].child = node;
  }

  const menu = {children: packages}

  return (
    <>
      <WrapperLayout {...props}>
        <Layout hasSider={true}>
          <Content className="api" style={{ padding: '20px', backgroundColor: '#fff' }}>
            <div className="tsc-content">
              <Breadcrumb>
                <Breadcrumb.Item>API</Breadcrumb.Item>
                {path[0] && <Breadcrumb.Item>
                  <a href="">{path[0]}</a>
                </Breadcrumb.Item>}
                {path[1] && <Breadcrumb.Item>
                  <a href="">{path[1]}</a>
                </Breadcrumb.Item>}
              </Breadcrumb>
              {type === 'package' ? <Package {...node} /> : <Module {...node} />}
            </div>
          </Content>
          <Sider style={{ width: '300px!important' }}><Menu {...menu} /></Sider>
        </Layout>
      </WrapperLayout>
    </>
  );
}

export const query = graphql`
  query {
    typedoc(typedocId: { eq: "default" }) {
      internal {
        content
      }
    }
  }
`;
