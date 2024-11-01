import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { VariableNodeView } from './VariableNodeView';

export const VariableNode = Node.create({
  name: 'variable',

  content: 'block+',
  group: 'block',

  addAttributes() {
    return {
      type: {
        default: 'text',
      },
      name: {
        default: '',
      },
      id: {
        default: null,
      },
      control: {
        default: null,
      },
      label: {
        default: '',
      },
      hint: {
        default: '',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="variable"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes({ 'data-type': 'variable' }, HTMLAttributes),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(VariableNodeView);
  },
});
