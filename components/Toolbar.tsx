import * as ToolbarPrimitive from '@radix-ui/react-toolbar';
import { type PropsWithChildren } from 'react';
import { cn } from '~/lib/utils';

const ToolbarRoot = ({ children }: PropsWithChildren) => (
  <ToolbarPrimitive.Root className="flex gap-2 bg-surface-0">
    {children}
  </ToolbarPrimitive.Root>
);

const ToolbarButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <ToolbarPrimitive.Button asChild onClick={onClick}>
    <div className="rounded-small p-2 text-sm hover:cursor-pointer hover:bg-surface-1">
      {children}
    </div>
  </ToolbarPrimitive.Button>
);

const ToolbarToggleGroup = ({
  children,
  type,
  onValueChange,
}: PropsWithChildren<{
  type: 'single' | 'multiple';
  onValueChange?: (value?: string) => void;
}>) => (
  <ToolbarPrimitive.ToggleGroup
    type={type}
    className="flex items-center gap-2"
    onValueChange={onValueChange}
  >
    {children}
  </ToolbarPrimitive.ToggleGroup>
);

const ToolbarToggleItem = ({
  value,
  children,
  active,
  onClick,
}: {
  value: string;
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}) => (
  <ToolbarPrimitive.ToggleItem
    value={value}
    data-state={active}
    onClick={onClick}
  >
    <div
      className={cn(
        'flex items-center gap-1 rounded-small p-2 text-sm hover:cursor-pointer',
        {
          'bg-surface-1': active,
        },
      )}
    >
      {children}
    </div>
  </ToolbarPrimitive.ToggleItem>
);

const ToolbarMenu = {
  Root: ToolbarRoot,
  Button: ToolbarButton,
  ToggleGroup: ToolbarToggleGroup,
  ToggleItem: ToolbarToggleItem,
  Separator: ToolbarPrimitive.Separator,
};

export default ToolbarMenu;
