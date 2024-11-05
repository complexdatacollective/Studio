// basically extends p tag to be an editable paragraph above the control
import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { HintNodeView } from './HintNodeView';

export const HintNode = Node.create({
  name: 'hint',
  group: 'variable',
  content: 'inline*',
  draggable: false,

  parseHTML() {
    return [
      {
        tag: 'hint',
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ['hint', mergeAttributes(HTMLAttributes)];
  },
  addNodeView() {
    return ReactNodeViewRenderer(HintNodeView);
  },
});
