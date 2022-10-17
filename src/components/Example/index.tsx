import React, { useEffect } from 'react';
import siteConfig from '../../siteconfig.json';
import 'regenerator-runtime/runtime';
import { fetchDocDetailById } from '../doc/util/docUtil';
import * as Babel from '@babel/standalone';
import { useParams } from 'react-router-dom';

const packageGlobals = {
  'oasis-engine-toolkit': 'oasisEngineToolkit',
  '@oasis-engine-toolkit/controls': '@oasisEngineToolkit/controls',
  '@oasis-engine-toolkit/framebuffer-picker': '@oasisEngineToolkit/framebufferPicker',
  '@oasis-engine-toolkit/stats': '@oasisEngineToolkit/stats',
  '@oasis-engine-toolkit/auxiliary-lines': '@oasisEngineToolkit/auxiliaryLines',
  '@oasis-engine-toolkit/skeleton-viewer': '@oasisEngineToolkit/skeletonViewer',
  '@oasis-engine-toolkit/planar-shadow-material': '@oasisEngineToolkit/planarShadowMaterial',
  '@oasis-engine-toolkit/lines': '@oasisEngineToolkit/lines',
  '@oasis-engine-toolkit/gizmo': '@oasisEngineToolkit/gizmo',
  '@oasis-engine-toolkit/outline': '@oasisEngineToolkit/outline',
  '@oasis-engine/physics-lite': '@oasisEngine/physicsLite',
  '@oasis-engine/physics-physx': '@oasisEngine/physicsPhysx',
  '@oasis-engine/spine': 'oasisSpine',
  '@oasis-engine/lottie': 'engine-lottie',
  '@oasis-engine/baker': '@oasisEngine/baker',
  'dat.gui': 'dat',
  '@tweenjs/tween.js': 'TWEEN',
};

const transformTsToJs = (ts: string) => {
  var output = Babel.transform(ts, {
    presets: [
      [
        'env',
        {
          loose: true,
          modules: 'umd',
        },
      ],
      'typescript',
    ],
    plugins: [
      ['proposal-class-properties', { loose: true }],
      [
        'transform-modules-umd',
        {
          globals: packageGlobals,
          exactGlobals: true,
        },
      ],
    ],
    filename: 'index.ts',
  });

  return output.code;
};

const useScript = async (libs: any, id?: string) => {
  useEffect(() => {
    const promises: Promise<any>[] = [];
    const scripts: any[] = [];

    fetchDocDetailById(id).then((res) => {
      const code = transformTsToJs(res);

      const addLib = (lib: any): Promise<any> => {
        const promise = new Promise((resolve) => {
          if (lib.cdn) {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            document.body.appendChild(script);

            script.onload = () => {
              scripts.push(script);
              resolve(script);
            };

            script.src = lib.cdn;
          }
        });

        return promise;
      };

      addLib(libs['oasis-engine']).then(() => {
        Object.keys(libs).forEach((name) => {
          if (name !== 'oasis-engine') {
            const lib = libs[name];
            let promise;

            // child packages
            if (lib.packages) {
              const childPromises = [];
              for (const name in lib.packages) {
                childPromises.push(addLib(lib.packages[name]));
              }
              promise = Promise.all(childPromises).then(() => addLib(lib));
            } else {
              promise = addLib(lib);
            }

            promises.push(promise);
          }
        });

        Promise.all(promises).then(() => {
          const script = document.createElement('script');
          if (code) {
            script.text = code;
            document.body.appendChild(script);
            scripts.push(script);
          }
        });
      });
    });

    return () => {
      scripts.forEach((script) => {
        document.body.removeChild(script);
      });
    };
  }, [id]);
};

export default function Example() {
  const { exampleId } = useParams();

  useScript(siteConfig.packages, exampleId);

  return (
    <>
      <canvas id='canvas' style={{ width: '100vw', height: '100vh' }} />
    </>
  );
}
