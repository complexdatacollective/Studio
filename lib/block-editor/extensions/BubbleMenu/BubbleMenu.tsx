import { BubbleMenu as BaseBubbleMenu, type Editor } from '@tiptap/react';
import { Bold, Italic, Link } from 'lucide-react';
import { Button } from '~/components/Button';
import Popover from '~/components/Popover';

type BubbleMenuProps = {
  editor: Editor | null;
};

export const BubbleMenu = ({ editor }: BubbleMenuProps) => {
  if (!editor) {
    return null;
  }

  const handleLinkSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const url = formData.get('url') as string;

    if (url) {
      editor
        .chain()
        .focus()
        .setLink({
          href: url,
          target: '_blank',
        })
        .run();
    }
  };

  return (
    <>
      <BaseBubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <div className="flex gap-1 rounded border bg-surface-0 px-2 py-1">
          <Button
            size="xs"
            variant="text"
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold size={18} />
          </Button>
          <Button
            size="xs"
            variant="text"
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic size={18} />
          </Button>
          <Popover
            content={
              <form
                className="flex flex-row gap-1 pr-8"
                onSubmit={handleLinkSubmit}
              >
                <input
                  type="text"
                  placeholder="Enter URL"
                  name="url"
                  className="rounded border px-2 py-1"
                />
                <Button size="xs" type="submit">
                  Set Link
                </Button>
              </form>
            }
          >
            <Button size="xs" variant="text">
              <Link size={18} />
            </Button>
          </Popover>
        </div>
      </BaseBubbleMenu>
    </>
  );
};
