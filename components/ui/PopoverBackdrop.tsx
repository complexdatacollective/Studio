import { cn } from '~/lib/utils';
import * as motion from 'framer-motion/client';
import { type ReactNode } from 'react';

const backdropClasses =
  'fixed inset-0 flex items-center justify-center bg-overlay/70 backdrop-blur-xs';

const overlayVariants = {
  closed: {
    opacity: 0,
    // transition: { when: 'afterChildren' }
  },
  open: {
    opacity: 1,
    // transition: { when: 'beforeChildren' }
  },
};

const PopoverBackdrop = ({
  className,
  children,
  ref,
}: {
  className?: string;
  children: ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}) => {
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
};

export default PopoverBackdrop;
