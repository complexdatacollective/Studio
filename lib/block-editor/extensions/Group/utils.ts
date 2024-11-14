import type { Editor } from '@tiptap/react';

export function toggleGroupRequired(editor: Editor) {
  if (!editor) return;
  const groupRequired = editor.getAttributes('group')?.groupRequired;

  // Traverse variable nodes and update required attribute
  editor.state.doc.descendants((node, pos) => {
    if (node.type.name === 'variable') {
      editor.view.dispatch(
        editor.state.tr.setNodeMarkup(pos, undefined, {
          ...node.attrs,
          required: !groupRequired,
        }),
      );
    }
    return true;
  });
  editor.commands.updateAttributes('group', { groupRequired: !groupRequired });
}
