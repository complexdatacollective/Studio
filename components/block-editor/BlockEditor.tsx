'use client';

import { EditorContent } from '@tiptap/react';
import { useRef } from 'react';
import GroupMenu from '~/lib/block-editor/extensions/Group/GroupMenu';
import { TextMenu } from '~/lib/block-editor/extensions/TextMenu';
import { useBlockEditor } from '~/lib/block-editor/useBlockEditor';
import SidePanel from './SidePanel';

const BlockEditor = () => {
  const { editor } = useBlockEditor();
  const menuContainerRef = useRef(null);

  return (
    <div
      className="flex flex-row gap-4 rounded-small border p-10"
      ref={menuContainerRef}
    >
      <SidePanel />
      <EditorContent editor={editor} />
      <TextMenu editor={editor} />
      <GroupMenu editor={editor} appendTo={menuContainerRef} />
    </div>
  );
};

export default BlockEditor;
