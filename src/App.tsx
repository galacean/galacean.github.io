import { TooltipProvider } from '@radix-ui/react-tooltip';
import { useContext, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import { RouterProvider } from 'react-router-dom';
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
      <TooltipProvider>
        <RouterProvider router={router} fallbackElement={<LoadingIcon />}></RouterProvider>
      </TooltipProvider>
    </IntlProvider>
  );
}

export default App;
