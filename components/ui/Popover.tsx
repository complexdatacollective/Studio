import { type PropsWithChildren } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { X } from 'lucide-react';
import { cn } from '~/lib/utils';
import CloseButton from './CloseButton';

const Popover = ({
  children,
  content,
  side = 'top',
  modal,
  isOpen,
  onOpenChange,
}: PropsWithChildren<{
  content: string | React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  modal?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}>) => {
  return (
    <PopoverPrimitive.Root
      modal={modal}
      defaultOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <PopoverPrimitive.Trigger asChild>{children}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          className={cn(
            'motion-safe:data-[state=open]:data-[side=top]:animate-slideDownAndFade',
            'motion-safe:data-[state=open]:data-[side=right]:animate-slideLeftAndFade',
            'motion-safe:data-[state=open]:data-[side=bottom]:animate-slideUpAndFade',
            'motion-safe:data-[state=open]:data-[side=left]:animate-slideRightAndFade',
            'bg-card text-card-foreground max-w-96 rounded-small px-6 py-10 will-change-[transform,opacity]',
            'z-50 shadow-xl',
          )}
          sideOffset={5}
          collisionPadding={10}
          side={side}
          avoidCollisions
        >
          {content}
          <PopoverPrimitive.Close asChild>
            <CloseButton />
          </PopoverPrimitive.Close>
          <PopoverPrimitive.Arrow
            className="fill-card"
            width={26}
            height={16}
          />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
};

export default Popover;
