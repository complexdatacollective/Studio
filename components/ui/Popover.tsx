import { useEffect, useState, type PropsWithChildren } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { cn } from '~/lib/utils';
import CloseButton from './CloseButton';
import Heading from '../typography/Heading';
import { MotionSurface } from '../layout/Surface';

const Popover = ({
  children,
  title,
  content,
  modal,
  isOpen,
  onOpenChange,
}: PropsWithChildren<{
  title?: string;
  content: string | React.ReactNode;
  modal?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}>) => {
  // defer getting portal container until the component mounts
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(
    null,
  );
  useEffect(() => {
    if (!document) return;
    const portal = document.getElementById('dialog-portal');
    if (portal) {
      setPortalContainer(portal);
    }
  }, []);
  return (
    <PopoverPrimitive.Root
      modal={modal}
      defaultOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <PopoverPrimitive.Trigger asChild>{children}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal container={portalContainer}>
        <PopoverPrimitive.Content
          className={cn(
            'bg-surface-0 text-surface-0-foreground',
            'motion-safe:data-[state=open]:data-[side=top]:animate-slideDownAndFade',
            'motion-safe:data-[state=open]:data-[side=right]:animate-slideLeftAndFade',
            'motion-safe:data-[state=open]:data-[side=bottom]:animate-slideUpAndFade',
            'motion-safe:data-[state=open]:data-[side=left]:animate-slideRightAndFade',
            'max-w-lg rounded-small will-change-[transform,opacity]',
            'z-50 shadow-xl',
          )}
          sideOffset={5}
          collisionPadding={10}
          avoidCollisions
          asChild
          // floating-ui prop exposed in @radix-ui/react-popper patch
          // see https://floating-ui.com/docs/flip#fallbackaxissidedirection
          fallbackAxisSideDirection="start"
        >
          <MotionSurface
            level={0}
            spacing="sm"
            layoutId="popover-content"
            layout="position"
          >
            {title && <Heading variant="h4">{title}</Heading>}
            {content}
            <PopoverPrimitive.Close asChild>
              <CloseButton />
            </PopoverPrimitive.Close>
            <PopoverPrimitive.Arrow
              className="fill-surface-0"
              width={26}
              height={16}
            />
          </MotionSurface>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
};

export default Popover;
