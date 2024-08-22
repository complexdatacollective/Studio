import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '~/lib/utils';

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
        <DialogPrimitive.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 z-50 backdrop-blur-md backdrop-brightness-75" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className={cn(
            className,
            'data-[state=open]:animate-contentShow fixed left-[50%] top-[50%] z-50 max-h-[85vh] translate-x-[-50%] translate-y-[-50%] rounded-small bg-overlay p-[25px] text-overlay-foreground shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none',
          )}
        >
          <DialogPrimitive.Title className="font-medium m-0 text-lg text-overlay-foreground">
            {title}
          </DialogPrimitive.Title>
          {children}
          <DialogPrimitive.Close asChild>
            <button
              className="hover:bg-violet4 absolute top-2 inline-flex h-[25px] w-[25px] cursor-default items-center justify-center rounded-full text-overlay-foreground outline-none focus:shadow-[0_0_0_2px] focus:shadow-background ltr:right-2 rtl:left-2"
              aria-label="Close"
            >
              <X />
            </button>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default Dialog;
