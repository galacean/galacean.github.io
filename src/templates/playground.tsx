import React, { useEffect } from 'react';
import siteConfig from '../../siteconfig.json';

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
  const {content} = props.pageContext.node.internal;

  useScript({
    engine: siteConfig.packages['oasis-engine'].cdn,
    playground: content
  });

  return (
    <>
      <canvas id="canvas" style={{width: '100vw', height: '100vh'}}></canvas>
    </>
  );
}