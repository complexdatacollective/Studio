'use client';

import { EditorContent } from '@tiptap/react';
import { BubbleMenu } from '~/lib/block-editor/extensions/BubbleMenu/BubbleMenu';
import { useBlockEditor } from '~/lib/block-editor/useBlockEditor';

const BlockEditor = () => {
  const { editor } = useBlockEditor();

  return (
    <div className="rounded-small border p-10">
      <EditorContent editor={editor} />
      <BubbleMenu editor={editor} />
    </div>
  );
};

export default BlockEditor;
