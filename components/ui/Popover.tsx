import { type PropsWithChildren } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { X } from 'lucide-react';
import { cn } from '~/lib/utils';

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
            'data-[state=open]:data-[side=top]:animate-slideDownAndFade',
            'data-[state=open]:data-[side=right]:animate-slideLeftAndFade',
            'data-[state=open]:data-[side=bottom]:animate-slideUpAndFade',
            'data-[state=open]:data-[side=left]:animate-slideRightAndFade',
            'w-[260px] rounded bg-popover p-5 text-popover-foreground will-change-[transform,opacity]',
            'shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)]',
            'focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_hsl(var(--slate-blue))]',
            'z-50',
          )}
          sideOffset={5}
          collisionPadding={10}
          side={side}
        >
          <div className="flex flex-col gap-2.5">{content}</div>
          <PopoverPrimitive.Close
            className="absolute top-2 inline-flex h-[25px] w-[25px] cursor-default items-center justify-center rounded-full text-popover-foreground outline-none focus:shadow-[0_0_0_2px] focus:shadow-slate-blue ltr:right-2 rtl:left-2"
            aria-label="Close"
          >
            <X />
          </PopoverPrimitive.Close>
          <PopoverPrimitive.Arrow className="fill-white" />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
};

export default Popover;
