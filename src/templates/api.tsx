import React from 'react';
import { graphql } from "gatsby";
import Menu from '../components/typedoc/Menu';
import WrapperLayout from '../components/layout';
import { Layout, Breadcrumb } from 'antd';
const { Sider, Content } = Layout;
import Package from '../components/typedoc/Package';
import Module from '../components/typedoc/Module';


export default function (props) {
  const { node, paths, type } = props.pageContext;
  const path = paths.split('/');

  return (
    <>
      <WrapperLayout {...props}>
        <Layout>
          <Content className="api" style={{padding: '20px', backgroundColor: '#fff'}}>
            <div className="tsc-content">
              <Breadcrumb>
                <Breadcrumb.Item>API</Breadcrumb.Item>
                {path[0] &&<Breadcrumb.Item>
                  <a href="">{path[0]}</a>
                </Breadcrumb.Item>}
                {path[1] &&<Breadcrumb.Item>
                  <a href="">{path[1]}</a>
                </Breadcrumb.Item>}
              </Breadcrumb>
              { type === 'package' ? <Package {...node}/> : <Module {...node} />}
            </div>
          </Content>
          <Sider style={{width: '300px!important'}}><Menu {...node} /></Sider>
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
