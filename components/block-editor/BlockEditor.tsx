'use client';

import { EditorContent } from '@tiptap/react';
import { BubbleMenu } from '~/lib/block-editor/extensions/BubbleMenu/BubbleMenu';
import { useBlockEditor } from '~/lib/block-editor/useBlockEditor';
import SidePanel from './SidePanel';

const placeholderStyles = `

.tiptap p.is-empty::before {
  color: #adb5bd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}

`;

const BlockEditor = () => {
  const { editor } = useBlockEditor();

  return (
    <div className="flex flex-row gap-4 rounded-small border p-10">
      <style>{placeholderStyles}</style>

      <SidePanel />
      <EditorContent editor={editor} />
      <BubbleMenu editor={editor} />
    </div>
  );
};

export default BlockEditor;
