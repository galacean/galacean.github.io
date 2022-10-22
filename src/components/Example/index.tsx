import React, { useEffect } from 'react';
import 'regenerator-runtime/runtime';
import { fetchDocDataById } from '../doc/util/docUtil';
import * as Babel from '@babel/standalone';
import { useParams } from 'react-router-dom';

const packages = {
  'oasis-engine': {
    version: '0.8.0-beta.2',
    cdn: 'https://gw.alipayobjects.com/os/lib/oasis-engine/0.8.0-beta.2/dist/browser.min.js',
    global: 'oasisEngine',
  },
  'oasis-engine-toolkit': {
    version: '0.8.0-beta.1',
    cdn: 'https://gw.alipayobjects.com/os/lib/oasis-engine-toolkit/0.8.0-beta.1/dist/browser.min.js',
    global: 'oasisEngineToolkit',
    packages: {
      '@oasis-engine-toolkit/controls': {
        version: '0.8.0-beta.1',
        cdn: 'https://gw.alipayobjects.com/os/lib/oasis-engine-toolkit/controls/0.8.0-beta.1/dist/browser.min.js',
        global: '@oasisEngineToolkit/controls',
      },
      '@oasis-engine-toolkit/framebuffer-picker': {
        version: '0.8.0-beta.1',
        cdn: 'https://gw.alipayobjects.com/os/lib/oasis-engine-toolkit/framebuffer-picker/0.8.0-beta.1/dist/browser.min.js',
        global: '@oasisEngineToolkit/framebufferPicker',
      },
      '@oasis-engine-toolkit/stats': {
        version: '0.8.0-beta.1',
        cdn: 'https://gw.alipayobjects.com/os/lib/oasis-engine-toolkit/stats/0.8.0-beta.1/dist/browser.min.js',
        global: '@oasisEngineToolkit/stats',
      },
      '@oasis-engine-toolkit/auxiliary-lines': {
        version: '0.8.0-beta.1',
        cdn: 'https://gw.alipayobjects.com/os/lib/oasis-engine-toolkit/auxiliary-lines/0.8.0-beta.1/dist/browser.min.js',
        global: '@oasisEngineToolkit/auxiliaryLines',
      },
      '@oasis-engine-toolkit/skeleton-viewer': {
        version: '0.8.0-beta.1',
        cdn: 'https://gw.alipayobjects.com/os/lib/oasis-engine-toolkit/skeleton-viewer/0.8.0-beta.1/dist/browser.min.js',
        global: '@oasisEngineToolkit/skeletonViewer',
      },
      '@oasis-engine-toolkit/planar-shadow-material': {
        version: '0.8.0-beta.1',
        cdn: 'https://gw.alipayobjects.com/os/lib/oasis-engine-toolkit/planar-shadow-material/0.8.0-beta.1/dist/browser.min.js',
        global: '@oasisEngineToolkit/planarShadowMaterial',
      },
      '@oasis-engine-toolkit/lines': {
        version: '0.8.0-beta.1',
        cdn: 'https://gw.alipayobjects.com/os/lib/oasis-engine-toolkit/lines/0.8.0-beta.1/dist/browser.min.js',
        global: '@oasisEngineToolkit/lines',
      },
      '@oasis-engine-toolkit/gizmo': {
        version: '0.8.0-beta.1',
        cdn: 'https://gw.alipayobjects.com/os/lib/oasis-engine-toolkit/gizmo/0.8.0-beta.1/dist/browser.min.js',
        global: '@oasisEngineToolkit/gizmo',
      },
      '@oasis-engine-toolkit/outline': {
        version: '0.8.0-beta.1',
        cdn: 'https://gw.alipayobjects.com/os/lib/oasis-engine-toolkit/outline/0.8.0-beta.1/dist/browser.min.js',
        global: '@oasisEngineToolkit/outline',
      },
    },
  },
  '@oasis-engine/baker': {
    version: '1.2.0',
    cdn: 'https://gw.alipayobjects.com/os/lib/oasis-engine/baker/1.2.0/dist/index.browser.js',
    dist: 'dist/index.browser.js',
    global: '@oasisEngine/baker',
  },
  '@oasis-engine/physics-lite': {
    version: '0.8.0-beta.2',
    cdn: 'https://gw.alipayobjects.com/os/lib/oasis-engine/physics-lite/0.8.0-beta.2/dist/browser.min.js',
    global: '@oasisEngine/physicsLite',
    dist: 'dist/browser.js',
  },
  '@oasis-engine/physics-physx': {
    version: '0.8.0-beta.2',
    cdn: 'https://gw.alipayobjects.com/os/lib/oasis-engine/physics-physx/0.8.0-beta.2/dist/browser.min.js',
    global: '@oasisEngine/physicsPhysx',
  },
  '@oasis-engine/spine': {
    version: '0.2.1',
    cdn: 'https://gw.alipayobjects.com/os/lib/oasis-engine/spine/0.2.1/dist/browser.js',
    global: 'oasisSpine',
    dist: 'dist/browser.js',
  },
  '@oasis-engine/lottie': {
    version: '0.8.0',
    cdn: 'https://gw.alipayobjects.com/os/lib/oasis-engine/lottie/0.8.0/dist/browser.js',
    global: 'engine-lottie',
    dist: 'dist/browser.js',
  },
  'dat.gui': {
    version: '0.7.7',
    cdn: 'https://gw.alipayobjects.com/os/lib/dat.gui/0.7.7/build/dat.gui.min.js',
    global: 'dat',
    dist: 'build/dat.gui.min.js',
  },
  '@tweenjs/tween.js': {
    version: '18.6.4',
    cdn: 'https://gw.alipayobjects.com/os/lib/tweenjs/tween.js/18.6.4/dist/tween.umd.js',
    global: 'TWEEN',
    dist: 'dist/tween.umd.js',
  },
};

const packageGlobals: Record<string, string> = {};

for (const name in packages) {
  const pkg = packages[name];
  packageGlobals[name] = pkg.global;
  if (pkg.packages) {
    for (const name in pkg.packages) {
      const childPkg = pkg.packages[name];
      packageGlobals[name] = childPkg.global;
    }
  }
}

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

    id &&
      fetchDocDataById(id).then((res) => {
        const code = transformTsToJs(res?.content || '');

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

  useScript(packages, exampleId);

  return <canvas id='canvas' style={{ width: '100vw', height: '100vh' }} />;
}
