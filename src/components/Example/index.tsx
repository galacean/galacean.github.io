import * as Babel from '@babel/standalone';
import { Spin } from 'antd';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'regenerator-runtime/runtime';
import { fetchEngineDataConfig } from '../../utils';
import { AppContext } from '../contextProvider';
import { fetchDocDataById } from '../doc/util/docUtil';

const useScript = async (libs: any) => {
  const promises: Promise<any>[] = [];
  const scripts: any[] = [];


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

  await addLib(libs['oasis-engine']);

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

  await Promise.all(promises);

  return () => {
    scripts.forEach((script) => {
      document.body.removeChild(script);
    });
  };
};

type PackageGlobals = Record<string, string>;

const transformTsToJs = (ts: string, packageGlobals: PackageGlobals) => {
  if (!ts) {
    return '';
  }

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
}

type Packages = Record<string, {
  version: string,
  global: string,
  packages: Packages
}>

function getPackageGlobals(packages: Packages): PackageGlobals {
  const packageGlobals: PackageGlobals = {};

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

  return packageGlobals;
}

type VersionConfig = Array<{ version: string, packages: string }>;

export default function Example() {
  const { exampleId } = useParams();
  const { version } = useContext(AppContext);
  let script: HTMLScriptElement;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEngineDataConfig().then(async (res: VersionConfig) => {
      const packages = JSON.parse(res.find((config) => config.version === version)?.packages || '');
      const packageGlobals = getPackageGlobals(packages);

      await useScript(packages);

      if (exampleId) {
        fetchDocDataById(exampleId).then((res) => {
          const code = transformTsToJs(res?.content || '', packageGlobals);
          if (code) {
            script = document.createElement('script');
            script.text = code;
            document.body.appendChild(script);

            setLoading(false);
          }
        });
      }
    });

    return () => {
      if (script) {
        document.body.removeChild(script);
      }
    }
  }, []);

  return <div style={{ width: '100vw', height: '100vh' }}>
    {loading && <Spin style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />}
    <canvas id='canvas' style={{ width: '100%', height: '100%' }} />;
  </div>
}
