import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { VariableNodeView } from './VariableNodeView';

export const VariableNode = Node.create({
  name: 'variable',

  group: 'block',
  content: 'inline*', // todo: this should be block+ but it needs to be inline* for the content to be editable
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
      options: {
        default: [],
      },
      label: {
        default: '',
      },
      hint: {
        default: '',
      },
      value: {
        default: '',
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(
        {
          'data-type': 'variable',
        },
        HTMLAttributes,
      ),
      0,
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(VariableNodeView);
  },
});
