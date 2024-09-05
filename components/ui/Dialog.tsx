import * as DialogPrimitive from '@radix-ui/react-dialog';
import { cn } from '~/lib/utils';
import Heading from '../typography/Heading';
import CloseButton from './CloseButton';
import ModalOverlay from './form/ModalOverlay';
import { type ForwardedRef, forwardRef } from 'react';
import { MotionSurface } from '../layout/Surface';

const dialogVariants = {
  closed: { opacity: 0, y: '100px' },
  open: { opacity: 1, y: 0 },
};

const DialogCloseButton = () => (
  <DialogPrimitive.Close asChild>
    <CloseButton />
  </DialogPrimitive.Close>
);

export const DialogContent = forwardRef(
  (
    {
      children,
      ...props
    }: {
      title: string;
      description: string;
    } & DialogPrimitive.DialogContentProps,
    forwardedRef: ForwardedRef<HTMLDivElement>,
  ) => {
    const { title, description, ...rest } = props;
    return (
      <DialogPrimitive.Content forceMount ref={forwardedRef} asChild {...rest}>
        <MotionSurface
          level={0}
          variants={dialogVariants}
          className={cn('max-w-[55ch] md:mx-auto', 'z-50 max-h-[85vh] rounded')}
        >
          <DialogPrimitive.Title asChild>
            <Heading variant="h2">{title}</Heading>
          </DialogPrimitive.Title>
          <DialogPrimitive.Description>
            {description}
          </DialogPrimitive.Description>
          {children}
          <DialogCloseButton />
        </MotionSurface>
      </DialogPrimitive.Content>
    );
  },
);

DialogContent.displayName = 'DialogContent';

const Dialog = ({
  children,
  isOpen,
  onOpenChange,
  title,
  description,
  context,
  className,
}: {
  children?: React.ReactNode;
  isOpen?: boolean;
  title: string;
  description: string;
  onOpenChange?: (open: boolean) => void;
  context?: 'interviewer' | 'default';
  className?: string;
}) => {
  return (
    <ModalOverlay open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        className={className}
        title={title}
        description={description}
        data-context={context}
      >
        {children}
      </DialogContent>
    </ModalOverlay>
  );
};

export default Dialog;
