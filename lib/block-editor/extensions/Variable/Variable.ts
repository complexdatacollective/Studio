import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { HintNode } from './Hint/Hint';
import { LabelNode } from './Label/Label';
import { VariableNodeView } from './VariableNodeView';

export type VariableNodeAttributes = {
  type: string;
  control?: string;
  options: string[];
  name: string;
};

export const VariableNode = Node.create({
  name: 'variable',

  group: 'block',
  content: 'label hint?',
  draggable: true,
  selectable: true,
  isolating: true,

  parseHTML() {
    return [
      {
        tag: 'variable',
      },
    ];
  },

  addAttributes() {
    return {
      type: { default: 'text' },
      control: { default: null },
      options: { default: [] },
      name: { default: '' },
    };
  },

  addExtensions() {
    // adds nested label and control nodes
    return [LabelNode, HintNode];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'variable',
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
