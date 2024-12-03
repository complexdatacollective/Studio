import type { Editor, Node } from '@tiptap/react';

export function toggleGroupRequired(editor: Editor) {
  if (!editor) return;

  // find the current group node
  const { from, to } = editor.state.selection;
  let groupPos: number | null = null;
  let groupNode: Node | null = null;

  editor.state.doc.nodesBetween(from, to, (node, pos) => {
    if (node.type.name === 'group') {
      groupPos = pos;
      groupNode = node;
      return false;
    }
    return true;
  });

  if (!groupNode || groupPos === null) return;

  const groupRequired = groupNode.attrs.groupRequired;
  const groupNodeSize = groupNode.nodeSize;

  // traverse nodes inside the group node and update the required attribute of variable nodes
  editor.state.doc.nodesBetween(
    groupPos,
    groupPos + groupNodeSize,
    (node, pos) => {
      if (node.type.name === 'variable') {
        editor.view.dispatch(
          editor.state.tr.setNodeMarkup(pos, undefined, {
            ...node.attrs,
            required: !groupRequired,
          }),
        );
      }
      return true;
    },
  );

  // update the group's groupRequired attribute
  editor.commands.updateAttributes('group', { groupRequired: !groupRequired });
}
