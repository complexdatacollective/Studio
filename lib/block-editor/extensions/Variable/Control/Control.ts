import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { ControlNodeView } from './ControlNodeView';

export type ControlNodeAttributes = {
  type: string;
  control?: string;
  options: string[];
  name: string;
};

export const ControlNode = Node.create<ControlNodeAttributes>({
  name: 'control',
  group: 'variable',
  content: '', // should not have any nested content

  addAttributes() {
    return {
      type: { default: 'text' },
      control: { default: null },
      options: { default: [] },
      name: { default: '' },
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
