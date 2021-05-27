// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/no-danger */
import React from 'react';
import { version } from '../siteconfig.json';

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <link
          rel="icon"
          href="https://gw.alipayobjects.com/mdn/rms_d27172/afts/img/A*mXcgQ7ZHThAAAAAAAAAAAAAAARQnAQ"
          type="image/x-icon"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="docsearch:version" content={version} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
          (function () {
            function isLocalStorageNameSupported() {
              var testKey = 'test';
              var storage = window.localStorage;
              try {
                storage.setItem(testKey, '1');
                storage.removeItem(testKey);
                return true;
              } catch (error) {
                return false;
              }
            }
            // 优先级提高到所有静态资源的前面，语言不对，加载其他静态资源没意义
            var pathname = location.pathname;
        
            function isZhCN(pathname) {
              return /-cn\\/?$/.test(pathname);
            }
            function getLocalizedPathname(path, zhCN) {
              var pathname = path.startsWith('/') ? path : '/' + path;
              if (!zhCN) { // to enUS
                return /\\/?index-cn/.test(pathname) ? '/' : pathname.replace('-cn', '');
              } else if (pathname === '/') {
                return '/index-cn';
              } else if (pathname.endsWith('/')) {
                return pathname.replace(/\\/$/, '-cn/');
              }
              return pathname + '-cn';
            }
            // 首页无视链接里面的语言设置 https://github.com/ant-design/ant-design/issues/4552
            if (isLocalStorageNameSupported() && (pathname === '/' || pathname === '/index-cn')) {
              var lang = (window.localStorage && localStorage.getItem('locale')) || (navigator.language.toLowerCase() === 'zh-cn' ? 'zh-CN' : 'en-US');
              // safari is 'zh-cn', while other browser is 'zh-CN';
              if ((lang === 'zh-CN') !== isZhCN(pathname)) {
                location.pathname = getLocalizedPathname(pathname, lang === 'zh-CN');
              }
            }
            document.documentElement.className += isZhCN(pathname) ? 'zh-cn' : 'en-us';
          })()
          `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            !function(t,e,a,r,c){t.TracertCmdCache=t.TracertCmdCache||[],t[c]=window[c]||
            {_isRenderInit:!0,call:function(){t.TracertCmdCache.push(arguments)},
            start:function(t){this.call('start',t)}},t[c].l=new Date;
            var n=e.createElement(a),s=e.getElementsByTagName(a)[0];
            n.async=!0,n.src=r,s.parentNode.insertBefore(n,s);
            n.onerror=function(){console.warn(decodeURI('Tracert%20%E8%84%9A%E6%9C%AC%E6%9C%AA%E6%88%90%E5%8A%9F%E5%8A%A0%E8%BD%BD,%20%E8%AF%B7%E6%A3%80%E6%9F%A5%E7%BD%91%E7%BB%9C%E4%BB%A5%E5%8F%8A%20A%20%E4%BD%8D%E6%98%AF%E5%90%A6%E5%9C%A8%E4%B9%9D%E8%89%B2%E9%B9%BF%E5%BB%BA%E7%AB%8B%E6%B4%9E%E5%AF%9F'));
            var fallback=function(){console.warn(decodeURI('Tracert%20%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C%E5%A4%B1%E8%B4%A5%EF%BC%8C%E8%AF%B7%E6%A3%80%E6%9F%A5%20JS%20%E6%98%AF%E5%90%A6%E6%AD%A3%E7%A1%AE%E5%BC%95%E5%85%A5'))};
            for(var fnlist=["call","start","config","logPv","info","err","click","expo","pageName","pageState","time","timeEnd","parse","checkExpo","stringify","report","set","before"],i=0;i<fnlist.length;i++){t[c][fnlist[i]]=fallback}};
            }(window,document,'script','https://ur.alipay.com/tracert_a1638.js','Tracert');
            Tracert.start({});
          `,
          }}
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes} style={{margin: 0}}>
        {props.preBodyComponents}
        <noscript key="noscript" id="gatsby-noscript">
          This app works best with JavaScript enabled.
        </noscript>
        <div key="body" id="___gatsby" dangerouslySetInnerHTML={{ __html: props.body }} />
        {props.postBodyComponents}
      </body>
    </html>
  );
}
