/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import { breakpoints } from '../tailwind.config';

type Breakpoint = keyof typeof breakpoints;

const getMediaQuery = (key: Breakpoint) => {
  const breakpointValue = breakpoints[key];
  if (!breakpointValue) {
    console.warn(
      `Breakpoint ${key} is not defined in the Tailwind configuration.`,
    );
    return null;
  }

  if (typeof breakpointValue === 'string') {
    return `(min-width: ${breakpointValue})`;
  } else {
    console.warn(`Couldn't parse breakpoint value for ${key}.`);
  }

  return null;
};

/**
 * Hook to get the current media query match status for a given breakpoint.
 * Uses the tailwind theme values.
 */
export const useMediaQuery = (queryKey: Breakpoint) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = getMediaQuery(queryKey);
    if (!mediaQuery) return;

    const mediaQueryList = window.matchMedia(mediaQuery);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    setMatches(mediaQueryList.matches);

    mediaQueryList.addEventListener('change', handleChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, [queryKey]);

  return matches;
};
