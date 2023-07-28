'use client';
import { createContext, useEffect, useState } from 'react';

interface ThemeContextData {
  theme: string;
  toggleTheme: (theme: string) => void;
}

export const ThemeContext = createContext({} as ThemeContextData);

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const whatIsStorageTheme = localStorage.getItem('theme');

  const [theme, setTheme] = useState<string>(whatIsStorageTheme || 'system');

  useEffect(() => {
    if (whatIsStorageTheme != null) {
      setTheme(whatIsStorageTheme);
    } else {
      setTheme('system');
      localStorage.setItem('theme', 'system');
    }
  }, []);

  const toggleTheme = (theme: string) => {
    setTheme(theme);
    localStorage.setItem('theme', theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
