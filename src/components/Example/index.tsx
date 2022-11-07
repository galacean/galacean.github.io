import * as Babel from '@babel/standalone';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'regenerator-runtime/runtime';
import { fetchEngineDataConfig } from '../../utils';
import { AppContext } from '../contextProvider';
import { fetchDocDataById } from '../doc/util/docUtil';

const useScript = async (libs: any, id: string, transformTsToJs: Function) => {
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
  }, [id, libs, transformTsToJs]);
};

export default function Example() {
  const { exampleId } = useParams();
  const { version } = useContext(AppContext);
  const [packages, setPackage] = useState<any>(null);
  const [globalPackages, setGlobalPackage] = useState<any>(null);
  const transformTsToJs = useCallback(
    (ts: string) => {
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
              globals: globalPackages,
              exactGlobals: true,
            },
          ],
        ],
        filename: 'index.ts',
      });

      return output.code;
    },
    [globalPackages]
  );

  useScript(packages, exampleId || '', transformTsToJs);

  useEffect(() => {
    fetchEngineDataConfig().then((res) => {
      const packages = JSON.parse(res.find((config) => config.version === version)?.packages || '');

      const packageGlobals: Record<string, string> = {};

      for (const name in packages) {
        const pkg = packages[name as keyof typeof packages];
        packageGlobals[name] = pkg.global;
        if ('packages' in pkg) {
          for (const name in pkg.packages) {
            const childPkg = pkg.packages[name as keyof typeof pkg.packages];
            packageGlobals[name] = childPkg.global;
          }
        }
      }

      setPackage(packages);
      setGlobalPackage(packageGlobals);
    });
  }, [version]);

  if (!packages) return null;

  return <canvas id='canvas' style={{ width: '100vw', height: '100vh' }} />;
}
