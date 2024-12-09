'use client';

import { EditorContent } from '@tiptap/react';
import { useRef } from 'react';
import GroupMenu from '~/lib/block-editor/extensions/Group/GroupMenu';
import { NodeBubbleMenu } from '~/lib/block-editor/extensions/NodeBubbleMenu';
import { useBlockEditor } from '~/lib/block-editor/useBlockEditor';
import PlusMenu from './PlusMenu';
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

      <div className="flex flex-col items-center gap-2">
        <EditorContent editor={editor} />
        <PlusMenu editor={editor} />
      </div>

      <NodeBubbleMenu editor={editor} />
      <GroupMenu editor={editor} appendTo={menuContainerRef} />
    </div>
  );
};

export default BlockEditor;
