import { useEditorState, type Editor } from '@tiptap/react';
import { Bold, Italic, Link, Trash } from 'lucide-react';
import BubbleMenu from '~/components/block-editor/BubbleMenu';
import { Button } from '~/components/Button';
import Popover from '~/components/Popover';
import Toolbar from '~/components/Toolbar';

export const TextMenu = ({ editor }: { editor: Editor | null }) => {
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      return {
        isBold: !!editor?.isActive('bold'),
        isItalic: !!editor?.isActive('italic'),
        isLink: !!editor?.isActive('link'),
        activeLink: editor?.getAttributes('link').href,
        isVariable:
          !!editor?.isActive('variable') ||
          !!editor?.isActive('control') ||
          !!editor?.isActive('label') ||
          !!editor?.isActive('hint'),
      };
    },
  });

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

  const handleLinkRemove = () => {
    editor?.chain().focus().unsetLink().run();
  };

  return (
    <Toolbar.Root>
      <BubbleMenu
        editor={editor}
        tippyOptions={{ duration: 100 }}
        className="flex gap-1 rounded border bg-surface-0 px-2 py-1"
      >
        <Toolbar.ToggleGroup type="multiple">
          <Toolbar.ToggleItem
            value="bold"
            onClick={() => {
              editor?.chain().focus().toggleBold().run();
            }}
            active={editorState?.isBold}
          >
            <Bold />
          </Toolbar.ToggleItem>
          <Toolbar.ToggleItem
            value="italic"
            onClick={() => {
              editor?.chain().focus().toggleItalic().run();
            }}
            active={editorState?.isItalic}
          >
            <Italic />
          </Toolbar.ToggleItem>

          <Toolbar.ToggleItem value="link" active={!!editorState?.activeLink}>
            <Popover
              content={
                editorState?.activeLink ? (
                  <div className="flex items-center gap-1 pr-8">
                    <a href={editorState.activeLink as string}>
                      {editorState.activeLink}
                    </a>
                    <Button variant="text" size="xs" onClick={handleLinkRemove}>
                      <Trash />
                    </Button>
                  </div>
                ) : (
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
                )
              }
            >
              <Link />
            </Popover>
          </Toolbar.ToggleItem>
        </Toolbar.ToggleGroup>
      </BubbleMenu>
    </Toolbar.Root>
  );
};
