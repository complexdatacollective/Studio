import { cn } from '~/lib/utils';
import { motion } from 'framer-motion';
import { forwardRef, type ReactNode } from 'react';

export const backdropClasses =
  'fixed inset-0 flex items-center justify-center bg-overlay/50';

const overlayVariants = {
  closed: { opacity: 0, transition: { when: 'afterChildren' } },
  open: { opacity: 1, transition: { when: 'beforeChildren' } },
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
      // @ts-expect-error has to do with 12.0.0-alpha release
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
