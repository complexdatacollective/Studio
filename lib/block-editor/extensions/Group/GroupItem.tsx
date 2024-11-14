import { Node, mergeAttributes } from '@tiptap/core';

export const GroupItem = Node.create({
  name: 'groupItem',

  group: 'block',

  content: 'block*',

  parseHTML() {
    return [{ tag: 'div[data-type="groupItem"]' }];
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
        'class': `gap-4 rounded-small border border-dashed p-4 grid ${gridClasses[columns]}`,
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

  // addNodeView() {
  //   return ReactNodeViewRenderer(GroupNodeView);
  // },
});
