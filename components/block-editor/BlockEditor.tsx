'use client';

import { EditorContent } from '@tiptap/react';
import { useBlockEditor } from '~/lib/block-editor/useBlockEditor';

const BlockEditor = () => {
  const { editor } = useBlockEditor();

  return <EditorContent editor={editor} />;
};

export default BlockEditor;
