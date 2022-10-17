import { useContext } from 'react';
import { IntlProvider } from 'react-intl';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { AppContext } from './components/contextProvider';
import { translationsData } from './constants/locale';
import { router } from './routes';

function App() {
  const context = useContext(AppContext);
  return (
    <IntlProvider locale={context.lang} messages={translationsData[context.lang]}>
      <RouterProvider router={router}></RouterProvider>
    </IntlProvider>
  );
}

export default App;
