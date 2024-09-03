// hooks/useMediaQuery.js
import { useState, useEffect } from 'react';
import { breakpoints } from '../tailwind.config';

// Convert Tailwind breakpoints to media queries
const getMediaQuery = (key) => {
  console.log(breakpoints);
  const breakpointValue = breakpoints[key];
  if (!breakpointValue) {
    console.warn(
      `Breakpoint ${key} is not defined in the Tailwind configuration.`,
    );
    return null;
  }

  if (typeof breakpointValue === 'string') {
    return `(min-width: ${breakpointValue})`;
  } else if (typeof breakpointValue === 'object') {
    return `(min-width: ${breakpointValue.min}) and (max-width: ${breakpointValue.max})`;
  }

  return null;
};

// General-purpose useMediaQuery hook
export const useMediaQuery = (queryKey) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = getMediaQuery(queryKey);
    if (!mediaQuery) return;

    const mediaQueryList = window.matchMedia(mediaQuery);

    const handleChange = (event) => {
      setMatches(event.matches);
    };

    // Set initial value
    setMatches(mediaQueryList.matches);

    // Listen for changes
    mediaQueryList.addEventListener('change', handleChange);

    // Cleanup listener on unmount
    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, [queryKey]);

  return matches;
};
