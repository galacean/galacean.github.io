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
  const pkg = packages[packageIndex];

  if (type === 'module' && packageIndex !== undefined) {
    pkg.child = node;
  }

  const menu = {children: packages}

  console.log('paths', paths, node, pkg)
  return (
    <>
      <WrapperLayout {...props}>
        <Layout hasSider={true}>
          <Content className="api" style={{ padding: '20px', backgroundColor: '#fff' }}>
            <div className="tsc-content">
              <div className="tsc-nav">
                <Breadcrumb>
                  <Breadcrumb.Item>API</Breadcrumb.Item>
                  {pkg && <Breadcrumb.Item>
                    <a href="./index">{pkg.name}</a>
                  </Breadcrumb.Item>}
                  {node && <Breadcrumb.Item>
                    {node.name && node.name.replace('/src', '')}
                  </Breadcrumb.Item>}
                </Breadcrumb>
              </div>
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
