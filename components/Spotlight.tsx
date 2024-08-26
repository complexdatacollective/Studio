import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

/**
 * Overlay that darkens the background and highlights a specific element.
 */
const SpotlightOverlay = ({
  // targetRef,
  targetElementId,
  margin = 15,
  borderRadius = '1.25rem', // TODO: get this from theme somehow. SVG won't accept CSS variable.
}: {
  // targetRef: React.RefObject<HTMLElement>;
  targetElementId?: string;
  margin?: number;
  borderRadius?: number | string;
}) => {
  const [spotlightPosition, setSpotlightPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updateSpotlightPosition = () => {
      if (!targetElementId) {
        return;
      }

      const targetElement = document.getElementById(targetElementId);

      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        setSpotlightPosition({
          x: rect.left - margin,
          y: rect.top - margin,
          width: rect.width + margin * 2,
          height: rect.height + margin * 2,
        });
      }
    };

    updateSpotlightPosition();
    window.addEventListener('resize', updateSpotlightPosition);

    return () => window.removeEventListener('resize', updateSpotlightPosition);
  }, [targetElementId, margin]);

  return createPortal(
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-50 h-full w-full backdrop-blur-sm backdrop-brightness-75 [mask-image:url(#spotlight-mask)] [mask-size:cover]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <svg
        width="100%"
        height="100%"
        pointerEvents="visiblePainted" // Prevents clicking background elements: https://stackoverflow.com/questions/48447142/svg-how-to-ignore-pointer-events-on-transparent-parts-of-an-image
      >
        <defs>
          <mask id="spotlight-mask" maskUnits="userSpaceOnUse">
            <rect width="100%" height="100%" fill="white" />
            <motion.rect
              initial={false}
              animate={{
                x: spotlightPosition.x,
                y: spotlightPosition.y,
                width: spotlightPosition.width,
                height: spotlightPosition.height,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              fill="black"
              rx={borderRadius}
              ry={borderRadius}
            />
          </mask>
        </defs>
      </svg>
    </motion.div>,
    document.body,
  );
};

export default SpotlightOverlay;
