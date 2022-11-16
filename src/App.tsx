import { useContext, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { RouterProvider } from 'react-router-dom';
import './App.less';
import { AppContext } from './components/contextProvider';
import LoadingIcon from './components/Loading';
import { translationsData } from './constants/locale';
import { router } from './routes';
import { globalCSS } from './ui/design-system';

function App() {
  const context = useContext(AppContext);

  useEffect(() => {
    globalCSS();
  }, []);

  return (
    <IntlProvider locale={context.lang} messages={translationsData[context.lang]}>
      <RouterProvider router={router} fallbackElement={<LoadingIcon />}></RouterProvider>
    </IntlProvider>
  );
}

export default App;
