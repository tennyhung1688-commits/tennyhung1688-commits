'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

type Lang = 'en' | 'zh';

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (en: string, zh?: string) => string;
}

const LangContext = createContext<LangContextType>({
  lang: 'en',
  setLang: () => {},
  t: (en) => en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  useEffect(() => {
    const stored = localStorage.getItem('lang');
    if (stored === 'en' || stored === 'zh') {
      setLang(stored);
    } else {
      const browserLang = navigator.language.toLowerCase();
      setLang(browserLang.startsWith('zh') ? 'zh' : 'en');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
  }, [lang]);

  const t = (en: string, zh?: string) => {
    if (lang === 'zh' && zh) return zh;
    return en;
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

export function pickLang(lang: Lang, en: string, zh?: string) {
  if (lang === 'zh' && zh) return zh;
  return en;
}
