import { TooltipProvider } from '@radix-ui/react-tooltip';
import { useContext, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { RouterProvider } from 'react-router-dom';
import { AppContext } from './components/contextProvider';
import LoadingIcon from './components/Loading';
import { translationsData } from './constants/locale';
import { router } from './routes';
import { globalCSS } from '@galacean/editor-ui';

function App() {
  const context = useContext(AppContext);

  useEffect(() => {
    const { pathname, hash } = window.location;
    // 检查是否为旧的哈希路由格式
    if (pathname === '/engine/' && hash.startsWith('#/')) {
      // 提取哈希部分，移除 `#/`，然后构建新的路径，确保在 "/engine" 和哈希部分之间添加一个斜杠
      const newPath = `/engine/${hash.slice(2)}`; // 修改在这里
      // 使用 history API 更新 URL，不触发页面重载
      window.location.replace(newPath);
    }
  }, []);

  useEffect(() => {
    globalCSS({
      body: {
        backgroundColor: "$slate1",
        minHeight: "100vh",
      },
      figure: {
        textAlign: 'center',
        fontSize: '12px',
        color: 'var(--colors-slate11)',
      }
    });
  }, []);

  const lang = context.lang === 'cn' ? 'zh-CN' : 'en';

  return (
    <IntlProvider locale={lang} messages={translationsData[lang]}>
      <TooltipProvider>
        <RouterProvider router={router} fallbackElement={<LoadingIcon />}></RouterProvider>
      </TooltipProvider>
    </IntlProvider>
  );
}

export default App;
