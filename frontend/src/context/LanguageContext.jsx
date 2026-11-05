import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('apg_language') || 'mr'; // Default Marathi
  });

  useEffect(() => {
    localStorage.setItem('apg_language', lang);
  }, [lang]);

  const toggleLanguage = (selectedLang) => {
    setLang(selectedLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

