import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { ControlNode } from './Control/Control';
import { LabelNode } from './Label/Label';
import { VariableNodeView } from './VariableNodeView';

export const VariableNode = Node.create({
  name: 'variable',

  group: 'block',
  content: 'label control',
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

  addExtensions() {
    // adds nested label and control nodes
    return [LabelNode, ControlNode];
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
