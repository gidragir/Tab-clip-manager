import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
    theme: string;
    toggleTheme: () => void;
};
const ThemeContext = createContext<ThemeContextType | string>("light");

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children } : { children : React.ReactNode}) => {
  const getInitialTheme = () => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme ? storedTheme : 'dark';
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};