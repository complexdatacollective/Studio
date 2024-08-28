import { cn } from '~/lib/utils';
import { motion } from 'framer-motion';
import { forwardRef, type ReactNode } from 'react';

export const backdropClasses =
  'fixed inset-0 flex items-center justify-center bg-overlay/50';

const overlayVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

const PopoverBackdrop = forwardRef(
  (
    {
      className,
      children,
    }: {
      className?: string;
      children: ReactNode;
    },
    ref,
  ) => {
    return (
      <motion.div
        ref={ref}
        className={cn(backdropClasses, className)}
        variants={overlayVariants}
        initial="closed"
        animate="open"
        exit="closed"
      >
        {children}
      </motion.div>
    );
  },
);

PopoverBackdrop.displayName = 'PopoverBackdrop';

export default PopoverBackdrop;
