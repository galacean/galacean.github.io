// matchMedia polyfill for
// https://github.com/WickyNilliams/enquire.js/issues/82

export function isZhCN() {
  if (typeof window !== 'undefined') {
    const local = window.localStorage.getItem('locale');
    return local
      ? local === 'cn'
      : window.navigator.language && window.navigator.language.toLocaleLowerCase() === 'zh-cn';
  }
}

/**
 * @param {*} path url
 * @param {*} zhCN boolean
 */
export function getLocalizedPathname(path: string, zhCN: boolean) {
  let pathname = path.startsWith('/') ? path : `/${path}`;
  pathname = pathname.replace('-cn', '');

  if (pathname === '/docs') return pathname;

  if (pathname === '/' || pathname === '/index') {
    if (zhCN) {
      return '/index-cn';
    }
    return '/';
  }

  if (!zhCN) {
    return `${pathname}`;
  }

  if (pathname.endsWith('/')) {
    return `${pathname.substring(0, pathname.length - 1)}-cn`;
  }

  return `${pathname}-cn`;
}

export function getMenuItems(moduleData: Record<string, any>, locale: string) {
  const menuMeta = moduleData.map((item: { meta: any }) => item.meta);
  const menuItems: Record<string, any> = { topLevel: {} };
  menuMeta
    .sort((a: { order: number }, b: { order: number }) => (a.order || 0) - (b.order || 0))
    .forEach((meta: { category: Record<string, any>; type: string }) => {
      const category = (meta.category && meta.category[locale]) || meta.category || 'topLevel';
      if (!menuItems[category]) {
        menuItems[category] = {};
      }

      const type = meta.type || 'topLevel';
      if (!menuItems[category][type]) {
        menuItems[category][type] = [];
      }

      menuItems[category][type].push(meta);
    });
  return menuItems;
}

export function ping(callback: (arg0: any) => void) {
  const url =
    'https://private-a' +
    'lipay' +
    'objects.alip' +
    'ay.com/alip' +
    'ay-rmsdeploy-image/rmsportal/RKuAiriJqrUhyqW.png';

  const img = new Image();
  let done: boolean;
  const finish = (status: string) => {
    if (!done) {
      done = true;
      img.src = '';
      callback(status);
    }
  };
  img.onload = () => finish('responded');
  img.onerror = () => finish('error');
  img.src = url;
  return setTimeout(() => finish('timeout'), 1500);
}

export enum Env {
  local = 'local',
  dev = 'dev',
  test = 'test',
  pre = 'pre',
  prod = 'prod',
}

export function getEnv() {
  const host = window.location.host;
  if (host.indexOf('local.alipay.net') > -1 || host.indexOf('localhost') > -1) {
    return Env.local;
  }

  if (/dev.*alipay/.test(host)) {
    return Env.dev;
  }

  if (/pre/.test(host)) {
    return Env.pre;
  }

  return Env.prod;
}

const cache: any = {};
async function getH5Data(path: string) {
  if (!cache[path]) {
    const data = await fetch(
      'https://render.alipay.com/p/h5data/oasis-version_site-doc-versions-h5data.json'
    ).then((res) => res.json());
    cache[path] = data;
  }
  return cache[path];
}

export async function fetchEngineDataConfig() {
  const dependencyConfig: { version: string; packages: string }[] = await getH5Data(
    'oasis-version/site-doc-versions-h5data'
  );
  return dependencyConfig;
}
