'use client';

import { EditorContent } from '@tiptap/react';
import { useBlockEditor } from '~/lib/block-editor/useBlockEditor';

const BlockEditor = () => {
  const { editor } = useBlockEditor();

  return (
    <div className="rounded-small border p-10">
      <EditorContent editor={editor} />
    </div>
  );
};

export default BlockEditor;
