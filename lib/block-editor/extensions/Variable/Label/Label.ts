// basically extends p tag to be an editable paragraph above the control
import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { LabelNodeView } from './LabelNodeView';

export const LabelNode = Node.create({
  name: 'label',
  group: 'block',
  content: 'inline*',
  draggable: false,

  parseHTML() {
    return [
      {
        tag: 'label',
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ['label', mergeAttributes(HTMLAttributes)];
  },
  addNodeView() {
    return ReactNodeViewRenderer(LabelNodeView);
  },
});
