import React, { useEffect } from 'react';
import { graphql } from "gatsby";
import Menu from '../components/typedoc/Menu';
import WrapperLayout from '../components/layout';
import { Layout, Breadcrumb } from 'antd';
import Package from '../components/typedoc/Package';
import Module from '../components/typedoc/Module';

const { Sider, Content } = Layout;

interface IScript {
  engine: string;
  playground: string;
}

const useScript = (s: IScript) => {
  useEffect(() => {
    const script = document.createElement('script');
    if (s.engine) {
      script.src = s.engine;
    }

    script.onload = () => {
      const script = document.createElement('script');
      if (s.playground) {
        script.text = s.playground;
      }
      document.body.appendChild(script);
    }

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, [s]);
};

export default function API(props: any) {
  const content = props.pageContext.node.data.playground.internal.content;

  useScript({
    engine: 'https://g.alipay.com/oasis-engine@0.3.4/dist/browser.min.js',
    playground: content
  });

  return (
    <>
      <canvas id="canvas"></canvas>
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
