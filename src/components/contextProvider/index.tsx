import { createContext, PropsWithChildren, useState } from 'react';

interface AppContext {
  lang: 'zh-CN' | 'en';
  version: string;
  theme: string;
  setLang: Function;
  setVersion: Function;
  setTheme: Function;
}

const defaultValue: AppContext = {
  lang: 'zh-CN',
  version: 'latest',
  theme: "light-theme",
  setLang: () => {},
  setVersion: () => {},
  setTheme: () => {}
};

export const AppContext = createContext<AppContext>(defaultValue);
AppContext.displayName = 'AppContext';

const AppContextProvider = (props: PropsWithChildren) => {
  const localStorageLang = localStorage.getItem('lang') === 'en' ? 'en' : 'zh-CN';
  const localStorageTheme = localStorage.getItem('theme') === 'dark-theme' ? 'dark-theme' : 'light-theme';
  const [lang, setLang] = useState<'zh-CN' | 'en'>(
    localStorageLang || (navigator.language.includes('en') ? 'en' : 'zh-CN')
  );
  const [version, setVersion] = useState('latest');
  const [theme, setTheme] = useState(localStorageTheme);

  return (
    <AppContext.Provider value={{ lang, setLang, version, setVersion, theme, setTheme }}>{props.children}</AppContext.Provider>
  );
};
export default AppContextProvider;
