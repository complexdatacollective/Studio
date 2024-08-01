import { type PropsWithChildren } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { X } from 'lucide-react';

const Popover = ({
  children,
  content,
  side = 'top',
}: PropsWithChildren<{
  content: string | React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
}>) => (
  <PopoverPrimitive.Root>
    <PopoverPrimitive.Trigger asChild>{children}</PopoverPrimitive.Trigger>
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        className="data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade w-[260px] rounded bg-white p-5 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.slate-blue)]"
        sideOffset={5}
        collisionPadding={10}
        side={side}
      >
        <div className="flex flex-col gap-2.5">{content}</div>
        <PopoverPrimitive.Close
          className="hover:bg-violet4 absolute right-[5px] top-[5px] inline-flex h-[25px] w-[25px] cursor-default items-center justify-center rounded-full text-cyber-grape outline-none focus:shadow-[0_0_0_2px] focus:shadow-slate-blue"
          aria-label="Close"
        >
          <X />
        </PopoverPrimitive.Close>
        <PopoverPrimitive.Arrow className="fill-white" />
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  </PopoverPrimitive.Root>
);

export default Popover;
