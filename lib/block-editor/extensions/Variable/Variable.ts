import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { VariableNodeView } from './VariableNodeView';

export const VariableNode = Node.create({
  name: 'variable',

  group: 'inline',
  inline: true,
  selectable: true,
  draggable: true,

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
        tag: 'span[data-type="form-variable"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes({ 'data-type': 'form-variable' }, HTMLAttributes),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(VariableNodeView);
  },
});
