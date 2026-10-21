export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'theme';

/** Browser UI color per theme, for `<meta name="theme-color">`. Mirrors `--color-surface`. */
export const THEME_COLORS: Record<Theme, string> = {
  light: '#faf9f6',
  dark: '#161a17',
};

export function currentTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

/** Apply a theme and remember it, so it wins over the OS setting on later visits. */
export function setTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme]);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage blocked: the theme still applies for this page view.
  }
}
