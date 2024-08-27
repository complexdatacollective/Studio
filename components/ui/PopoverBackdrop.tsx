import { cn } from '~/lib/utils';
import { motion } from 'framer-motion';

export const backdropClasses =
  'pointer-events-none fixed left-0 top-0 z-50 h-full w-full backdrop-blur-sm backdrop-brightness-75 [mask-image:url(#spotlight-mask)] [mask-size:cover]';

const overlayVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};

export default function PopoverBackdrop({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn(backdropClasses, className)}
      variants={overlayVariants}
      initial="closed"
      animate="open"
      exit="closed"
    />
  );
}
