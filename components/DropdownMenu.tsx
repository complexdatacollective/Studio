import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { type PropsWithChildren } from 'react';
import { cn } from '~/lib/utils';
import Heading from './typography/Heading';

const DropdownTrigger = ({ children }: PropsWithChildren) => (
  <DropdownMenuPrimitive.Trigger asChild>
    {children}
  </DropdownMenuPrimitive.Trigger>
);

const DropdownMenuContent = ({ children }: PropsWithChildren) => {
  // defer getting portal container until the component mounts
  const portalContainer =
    typeof window !== 'undefined'
      ? document.getElementById('dialog-portal')
      : null;
  return (
    <DropdownMenuPrimitive.Portal container={portalContainer}>
      <DropdownMenuPrimitive.Content
        sideOffset={5}
        className="z-50 rounded-small border bg-surface-0 p-2"
      >
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
};

const DropdownItem = ({
  children,
  textValue,
  onSelect,
  active,
}: PropsWithChildren<{
  textValue: string;
  onSelect: () => void;
  active?: boolean;
}>) => (
  <DropdownMenuPrimitive.Item
    textValue={textValue}
    onSelect={onSelect}
    className={cn(
      'rounded-small p-2 text-sm hover:cursor-pointer hover:bg-surface-1',
      active && 'bg-surface-1',
    )}
  >
    {children}
  </DropdownMenuPrimitive.Item>
);

const DropdownLabel = ({ children }: PropsWithChildren) => (
  <DropdownMenuPrimitive.Label className="p-2 text-sm text-muted-foreground">
    <Heading variant="label">{children}</Heading>
  </DropdownMenuPrimitive.Label>
);

const DropdownMenu = {
  Root: DropdownMenuPrimitive.Root,
  RadioGroup: DropdownMenuPrimitive.RadioGroup,
  Trigger: DropdownTrigger,
  DropdownMenuContent: DropdownMenuContent,
  Label: DropdownLabel,
  Item: DropdownItem,
};

export default DropdownMenu;
