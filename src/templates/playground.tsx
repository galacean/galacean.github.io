import React, { useEffect } from 'react';
import siteConfig from '../../siteconfig.json';

interface IScript {
  libs: any;
  playground: string;
}

const useScript = (s: IScript) => {
  useEffect(() => {
    const promises: Promise<any>[] = [];
    const scripts: any[] = [];
    
    const addLib = (lib:any): Promise<any> => {
      const promise = new Promise((resolve) => {
        if (lib.cdn) {
          const script = document.createElement('script');
          script.type = "text/javascript";
          document.body.appendChild(script);

          script.onload = () => {
            scripts.push(script);
            resolve(script);
          }

          script.src = lib.cdn;
        }

      });

      return promise;
    }

    addLib(s.libs['oasis-engine']).then(() => {
      for (const name in s.libs) {
        if (name !== 'oasis-engine') {
          const promise = addLib(s.libs[name])
          promises.push(promise);
        }
      }

      Promise.all(promises).then(() => {
        const script = document.createElement('script');
        if (s.playground) {
          script.text = s.playground;
          document.body.appendChild(script);
          scripts.push(script);
          // console.log(s.playground)
        }
      });
    });


    return () => {
      scripts.forEach((script)=>{
        document.body.removeChild(script);
      });
    }
  }, [s]);
};

export default function Playground (props: any) {
  const {content} = props.pageContext.node.internal;

  useScript({
    libs: siteConfig.packages,
    playground: content
  });

  return (
    <>
      <canvas id="canvas" style={{width: '100vw', height: '100vh'}}></canvas>
    </>
  );
}