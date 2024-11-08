import * as ToolbarPrimitive from '@radix-ui/react-toolbar';
import { type PropsWithChildren } from 'react';
import { Button } from './Button';

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
    <Button variant="text" size="sm">
      {children}
    </Button>
  </ToolbarPrimitive.Button>
);

const ToolbarToggleGroup = ({
  children,
  type,
  onValueChange,
}: PropsWithChildren<{
  type: 'single' | 'multiple';
  onValueChange: (value?: string) => void;
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
  onChange,
  children,
  active,
}: {
  value: string;
  onChange?: () => void;
  children: React.ReactNode;
  active?: boolean;
}) => (
  <ToolbarPrimitive.ToggleItem
    value={value}
    onChange={onChange}
    data-state={active}
  >
    <Button
      variant={active ? 'default' : 'text'}
      size="sm"
      className="flex items-center gap-1"
    >
      {children}
    </Button>
  </ToolbarPrimitive.ToggleItem>
);

const ToolbarMenu = {
  Root: ToolbarRoot,
  Button: ToolbarButton,
  ToggleGroup: ToolbarToggleGroup,
  ToggleItem: ToolbarToggleItem,
};

export default ToolbarMenu;
