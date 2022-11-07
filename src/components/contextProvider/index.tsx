import { createContext, PropsWithChildren, useState } from 'react';

interface AppContext {
  lang: 'zh-CN' | 'en';
  version: string;
  setLang: Function;
  setVersion: Function;
}

const defaultValue: AppContext = { lang: 'zh-CN', version: 'latest', setLang: () => {}, setVersion: () => {} };
export const AppContext = createContext<AppContext>(defaultValue);
AppContext.displayName = 'AppContext';

const AppContextProvider = (props: PropsWithChildren) => {
  const localStorageLang = localStorage.getItem('lang') === 'en' ? 'en' : 'zh-CN';
  const [lang, setLang] = useState<'zh-CN' | 'en'>(
    localStorageLang || (navigator.language.includes('en') ? 'en' : 'zh-CN')
  );
  const [version, setVersion] = useState('latest');
  return (
    <AppContext.Provider value={{ lang, setLang, version, setVersion }}>{props.children}</AppContext.Provider>
  );
};
export default AppContextProvider;
