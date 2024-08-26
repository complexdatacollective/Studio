import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '~/lib/utils';
import Heading from '../typography/Heading';
import CloseButton from './CloseButton';

const Dialog = ({
  children,
  isOpen,
  onOpenChange,
  title,
  className,
}: {
  children?: React.ReactNode;
  isOpen?: boolean;
  title?: string;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}) => {
  return (
    <DialogPrimitive.Root defaultOpen={isOpen} onOpenChange={onOpenChange}>
      <DialogPrimitive.Trigger asChild>{children}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="motion-safe:data-[state=open]:animate-overlayShow fixed inset-0 z-50 backdrop-blur-md backdrop-brightness-75" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className={cn(
            className,
            'md:w-90% mx-4 max-w-4xl md:mx-auto',
            'px-6 py-10',
            'motion-safe:data-[state=open]:animate-contentShow bg-card text-card-foreground fixed left-[50%] top-[50%] z-50 max-h-[85vh] translate-x-[-50%] translate-y-[-50%] rounded shadow-xl focus:outline-none',
          )}
        >
          {title && (
            <DialogPrimitive.Title asChild>
              <Heading variant="h2">{title}</Heading>
            </DialogPrimitive.Title>
          )}
          {children}
          <DialogPrimitive.Close asChild>
            <CloseButton className="top-4 ltr:right-4 rtl:left-4" />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default Dialog;
