import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '~/lib/utils';
import Heading from '../typography/Heading';
import CloseButton from './CloseButton';
import ModalOverlay from './form/ModalOverlay';

function DialogContent({
  className,
  children,
  title,
  description,
}: {
  className?: string;
  children?: React.ReactNode;
  title?: string;
  description?: string;
}) {
  return (
    <div
      className={cn(
        className,
        'md:w-90% mx-4 max-w-4xl md:mx-auto',
        'px-6 py-10',
        'fixed left-1/2 top-1/2 z-50 max-h-[85vh] -translate-x-1/2 -translate-y-1/2 rounded bg-card text-card-foreground shadow-xl focus:outline-none',
      )}
    >
      {title && (
        <DialogPrimitive.Title asChild>
          <Heading variant="h2">{title}</Heading>
        </DialogPrimitive.Title>
      )}
      {description && (
        <DialogPrimitive.Description>{description}</DialogPrimitive.Description>
      )}
      {children}
      <DialogPrimitive.Close asChild>
        <CloseButton className="top-4 ltr:right-4 rtl:left-4" />
      </DialogPrimitive.Close>
    </div>
  );
}

const Dialog = ({
  children,
  isOpen,
  onOpenChange,
  title,
  description,
  className,
}: {
  children?: React.ReactNode;
  isOpen?: boolean;
  title?: string;
  description?: string;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}) => {
  return (
    <ModalOverlay open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className={className}
        title={title}
        description={description}
      >
        {children}
      </DialogContent>
    </ModalOverlay>
  );
};

export default Dialog;
