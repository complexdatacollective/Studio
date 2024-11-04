import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { ControlNodeView } from './ControlNodeView';

export const ControlNode = Node.create({
  name: 'control',
  group: 'block',
  content: 'block+',

  addAttributes() {
    return {
      type: { default: 'text' },
      control: { default: null },
      options: { default: [] },
      value: { default: '' },
      name: { default: '' },
      id: { default: null },
      hint: { default: '' },
    };
  },

  parseHTML() {
    return [{ tag: 'control' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ControlNodeView);
  },
});
