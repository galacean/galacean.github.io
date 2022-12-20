import { TooltipProvider } from '@radix-ui/react-tooltip';
import { useContext, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { RouterProvider } from 'react-router-dom';
import { AppContext } from './components/contextProvider';
import LoadingIcon from './components/Loading';
import { translationsData } from './constants/locale';
import { router } from './routes';
import { globalCSS } from '@oasis-engine/editor-design-system';

function App() {
  const context = useContext(AppContext);

  useEffect(() => {
    globalCSS({body: {
      backgroundColor: "$slate1",
      minHeight: "100vh"
    }});
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
