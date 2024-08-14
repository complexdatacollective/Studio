import { cookies } from 'next/headers';
import {
  DARK_MODE_COOKIE_NAME,
  type Theme,
  THEME_COOKIE_NAME,
  THEMES,
} from './constants';

/**
 * Todo:
 *   - getDefaultTheme() which will handle user preferences such as high
 *     contrast, dark mode, etc.
 *   - Work out i18n for theme names
 */

export const getTheme = () =>
  (cookies().get(THEME_COOKIE_NAME)?.value as Theme) ?? ('default' as Theme);
export const getForceDarkMode = () =>
  cookies().get(DARK_MODE_COOKIE_NAME)?.value ?? 'no';

export const getThemeDataFromCookies = () => {
  return {
    forceDarkMode: getForceDarkMode(),
    theme: getTheme(),
  };
};

export function getThemeData(theme: Theme) {
  return THEMES[theme];
}
