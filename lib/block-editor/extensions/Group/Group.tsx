import { Node, mergeAttributes } from '@tiptap/core';

export const Group = Node.create({
  name: 'group',

  group: 'block',

  content: 'variable*',

  parseHTML() {
    return [{ tag: 'div[data-type="group"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    const columnClasses = {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
    };

    const columns = HTMLAttributes.columns ?? 2; // Default to 2 columns
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'group',
        'class': `border border-dashed hover:border-accent p-4 rounded-small grid gap-4 ${columnClasses[columns]}`,
      }),
      0,
    ];
  },

  addAttributes() {
    return {
      columns: {
        default: 2,
      },
    };
  },
});
