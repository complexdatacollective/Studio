import { cn } from '~/lib/utils';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export const backdropClasses =
  'pointer-events-none flex items-center justify-center fixed inset-0 h-full w-full backdrop-blur-sm backdrop-brightness-75 [mask-image:url(#spotlight-mask)] [mask-size:cover]';

const overlayVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

export default function PopoverBackdrop({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.div
      className={cn(backdropClasses, className)}
      variants={overlayVariants}
      initial="closed"
      animate="open"
      exit="closed"
    >
      {children}
    </motion.div>
  );
}
