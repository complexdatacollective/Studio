import { type Editor } from '@tiptap/react';
import { Plus } from 'lucide-react';
import { type TiptapContent, contentMap } from '~/lib/block-editor/types';
import { Button } from '../Button';
import Popover from '../Popover';
import Heading from '../typography/Heading';

const Menu = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  const handleCommand = (type: TiptapContent) => () => {
    const endPos = editor.state.doc.content.size;
    editor.chain().focus().insertContentAt(endPos, contentMap[type]).run();
  };

  return (
    <div className="grid gap-2 overflow-scroll p-2">
      <Heading variant="h4">Add block</Heading>
      {Object.keys(contentMap).map((type) => (
        <Button
          key={type}
          onClick={handleCommand(type as TiptapContent)}
          variant="outline"
          size="sm"
          color="primary"
        >
          {type}
        </Button>
      ))}
    </div>
  );
};

// plus button that renders after the editor content and between nodes
export default function PlusMenu({ editor }: { editor: Editor | null }) {
  return (
    <Popover content={<Menu editor={editor} />}>
      <Button variant="outline" size="icon" color="primary">
        <Plus />
      </Button>
    </Popover>
  );
}
