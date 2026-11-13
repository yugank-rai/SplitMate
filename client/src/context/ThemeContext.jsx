import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.setAttribute('data-theme', 'dark');
      root.style.setProperty('--bg', '#0B0F19');
      root.style.setProperty('--bg-card', '#151D2F');
      root.style.setProperty('--bg-subtle', '#1E293B');
      root.style.setProperty('--text-primary', '#F8FAFC');
      root.style.setProperty('--text-secondary', '#94A3B8');
      root.style.setProperty('--border', '#1E293B');
      root.style.setProperty('--shadow', '0 4px 20px rgba(0,0,0,0.4)');
      root.style.setProperty('--primary', '#3B82F6');
      root.style.setProperty('--accent', '#14B8A6');
      document.body.style.background = '#0B0F19';
      document.body.style.color = '#F8FAFC';
      localStorage.setItem('theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
      root.style.setProperty('--bg', '#FFFFFF');
      root.style.setProperty('--bg-card', '#F5F7FA');
      root.style.setProperty('--bg-subtle', '#F0F3F7');
      root.style.setProperty('--text-primary', '#0F172A');
      root.style.setProperty('--text-secondary', '#64748B');
      root.style.setProperty('--border', '#E2E8F0');
      root.style.setProperty('--shadow', '0 1px 3px rgba(15, 23, 42, 0.06), 0 1px 2px rgba(15, 23, 42, 0.04)');
      root.style.setProperty('--primary', '#1A56DB');
      root.style.setProperty('--accent', '#00A99D');
      document.body.style.background = '#FFFFFF';
      document.body.style.color = '#0F172A';
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
