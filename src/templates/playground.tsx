import React from 'react';
import { graphql } from "gatsby";
import Menu from '../components/typedoc/Menu';
import WrapperLayout from '../components/layout';
import { Layout, Breadcrumb } from 'antd';
import Package from '../components/typedoc/Package';
import Module from '../components/typedoc/Module';

const { Sider, Content } = Layout;

export default function API (props: any) {

  console.log('playground props:', props)
  return (
    <>
    </>
  );
}

// export const query = graphql`
//   query {
//     playground(playgroundId: { eq: "default" }) {
//       internal {
//         content
//       }
//     }
//   }
// `;
