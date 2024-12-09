import {
  BubbleMenu as BaseBubbleMenu,
  type BubbleMenuProps,
} from '@tiptap/react';

export default function BubbleMenu(props: BubbleMenuProps) {
  return (
    <BaseBubbleMenu
      {...props}
      className="flex w-fit items-center gap-1 rounded border bg-surface-0 px-2 py-1"
    />
  );
}
