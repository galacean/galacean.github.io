import React, { useEffect } from 'react';
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

export default function Playground (props: any) {
  const content = props.pageContext.node.internal.content;

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