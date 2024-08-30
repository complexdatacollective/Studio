import { useState, useEffect } from 'react';

export const getTargetElement = (dataId: string): HTMLElement | null => {
  return document.querySelector(`[data-id="${dataId}"]`);
};

export const useElementPosition = (targetElementId?: string) => {
  const [position, setPosition] = useState<{
    top: number;
    left: number;
    height: number;
    width: number;
  } | null>(null);

  useEffect(() => {
    const updatePosition = () => {
      if (!targetElementId) {
        setPosition(null);
        return;
      }

      const element = document.getElementById(targetElementId);

      if (!element) {
        setPosition(null);
        return;
      }

      const { top, left, height, width } = element.getBoundingClientRect();
      setPosition({ top, left, height, width });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);

    return () => window.removeEventListener('resize', updatePosition);
  }, [targetElementId]);

  return position;
};
