import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { GroupNodeView } from './GroupNodeView';

export const Group = Node.create({
  name: 'group',

  group: 'block',

  content: 'variable*',

  parseHTML() {
    return [{ tag: 'div[data-type="group"]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'group',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'group',
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

  addNodeView() {
    return ReactNodeViewRenderer(GroupNodeView);
  },
});
