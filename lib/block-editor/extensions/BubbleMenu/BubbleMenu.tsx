import * as Toolbar from '@radix-ui/react-toolbar';
import {
  BubbleMenu as BaseBubbleMenu,
  useEditorState,
  type Editor,
} from '@tiptap/react';
import { Bold, Italic, Link, Trash } from 'lucide-react';
import { Button } from '~/components/Button';
import Popover from '~/components/Popover';
import { withTooltip } from '~/components/Tooltip';

export const BubbleMenu = ({ editor }: { editor: Editor | null }) => {
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
      <BaseBubbleMenu
        editor={editor}
        tippyOptions={{ duration: 100 }}
        className="flex gap-1 rounded border bg-surface-0 px-2 py-1"
      >
        <Toolbar.ToggleGroup type="multiple">
          <ToolbarToggleItemWithTooltip
            onClick={() => editor.chain().focus().toggleBold().run()}
            tooltipContent="Bold (Ctrl+B)"
            value="bold"
          >
            <Bold />
          </ToolbarToggleItemWithTooltip>
          <ToolbarToggleItemWithTooltip
            onClick={() => editor.chain().focus().toggleItalic().run()}
            tooltipContent="Italic (Ctrl+I)"
            value="italic"
          >
            <Italic />
          </ToolbarToggleItemWithTooltip>
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
            <ToolbarToggleItemWithTooltip
              tooltipContent="Set Link"
              value="link"
            >
              <Link />
            </ToolbarToggleItemWithTooltip>
          </Popover>
        </Toolbar.ToggleGroup>
      </BaseBubbleMenu>
    </Toolbar.Root>
  );
};

export const ToolbarToggleItemWithTooltip = withTooltip(Toolbar.ToggleItem);
