import { type PropsWithChildren } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { X } from 'lucide-react';

const Popover = ({ children }: PropsWithChildren) => (
  <PopoverPrimitive.Root>
    <PopoverPrimitive.Trigger asChild>{children}</PopoverPrimitive.Trigger>
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        className="data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade w-[260px] rounded bg-white p-5 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] will-change-[transform,opacity] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.slate-blue)]"
        sideOffset={5}
      >
        <div className="flex flex-col gap-2.5">
          <p className="mb-2.5 text-sm font-medium leading-[19px] text-slate-blue">
            Dimensions
          </p>
          <fieldset className="flex items-center gap-5">
            <label
              className="w-[75px] text-[13px] text-cyber-grape"
              htmlFor="width"
            >
              Width
            </label>
            <input
              className="focus:shadow-focus inline-flex h-[25px] w-full flex-1 items-center justify-center rounded px-2.5 text-[13px] leading-none text-cyber-grape shadow-[0_0_0_1px] shadow-slate-blue outline-none focus:shadow-[0_0_0_2px]"
              id="width"
              defaultValue="100%"
            />
          </fieldset>
          <fieldset className="flex items-center gap-5">
            <label
              className="w-[75px] text-[13px] text-cyber-grape"
              htmlFor="maxWidth"
            >
              Max. width
            </label>
            <input
              className="focus:shadow-focus inline-flex h-[25px] w-full flex-1 items-center justify-center rounded px-2.5 text-[13px] leading-none text-cyber-grape shadow-[0_0_0_1px] shadow-slate-blue outline-none focus:shadow-[0_0_0_2px]"
              id="maxWidth"
              defaultValue="300px"
            />
          </fieldset>
          <fieldset className="flex items-center gap-5">
            <label
              className="w-[75px] text-[13px] text-cyber-grape"
              htmlFor="height"
            >
              Height
            </label>
            <input
              className="focus:shadow-focus inline-flex h-[25px] w-full flex-1 items-center justify-center rounded px-2.5 text-[13px] leading-none text-cyber-grape shadow-[0_0_0_1px] shadow-slate-blue outline-none focus:shadow-[0_0_0_2px]"
              id="height"
              defaultValue="25px"
            />
          </fieldset>
          <fieldset className="flex items-center gap-5">
            <label
              className="w-[75px] text-[13px] text-cyber-grape"
              htmlFor="maxHeight"
            >
              Max. height
            </label>
            <input
              className="focus:shadow-focus inline-flex h-[25px] w-full flex-1 items-center justify-center rounded px-2.5 text-[13px] leading-none text-cyber-grape shadow-[0_0_0_1px] shadow-slate-blue outline-none focus:shadow-[0_0_0_2px]"
              id="maxHeight"
              defaultValue="none"
            />
          </fieldset>
        </div>
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
