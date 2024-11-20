import { Node, mergeAttributes } from '@tiptap/react';

export const Group = Node.create({
  name: 'group',

  group: 'block',

  content: 'block*',

  parseHTML() {
    return [{ tag: 'div[data-type="group"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    const { columns } = HTMLAttributes;

    const gridClasses = {
      1: 'grid-cols-1',
      2: 'grid-cols-2',
      3: 'grid-cols-3',
      4: 'grid-cols-4',
    };

    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'group',
        'class': `gap-4 p-4 grid rounded-small ${gridClasses[columns]} border hover:border-accent`,
      }),
      0,
    ];
  },

  addAttributes() {
    return {
      columns: {
        default: 2,
      },
      groupRequired: {
        default: false,
      },
    };
  },
});
