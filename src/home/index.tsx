import ReactDOM from 'react-dom/client';
import AppContextProvider from '../components/contextProvider';

import { globalCSS } from '@galacean/editor-ui';
import { useContext, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { AppContext } from '../components/contextProvider';
import { translationsData } from '../constants/locale';
import Home from './Home';

function App() {
  const context = useContext(AppContext);

  useEffect(() => {
    globalCSS({
      body: {
        backgroundColor: "$slate1",
        minHeight: "100vh",
      }
    });
  }, []);

  const lang = context.lang === 'cn' ? 'zh-CN' : 'en';

  return (
    <IntlProvider locale={lang} messages={translationsData[lang]}>
      <Home />
    </IntlProvider>
  );
}


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <AppContextProvider>
    <App />
  </AppContextProvider>
);
