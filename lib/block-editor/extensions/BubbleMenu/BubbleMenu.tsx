import { BubbleMenu as BaseBubbleMenu, type Editor } from '@tiptap/react';
import { Bold, Italic, Link, Trash } from 'lucide-react';
import { Button, type ButtonProps } from '~/components/Button';
import Popover from '~/components/Popover';
import { withTooltip } from '~/components/Tooltip';

export const BubbleMenu = ({ editor }: { editor: Editor | null }) => {
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
    <>
      <BaseBubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
        <div className="flex gap-1 rounded border bg-surface-0 px-2 py-1">
          <MenuButtonWithTooltip
            onClick={() => editor.chain().focus().toggleBold().run()}
            tooltipContent="Bold (Ctrl+B)"
            variant={editor.isActive('bold') ? 'default' : 'text'}
          >
            <Bold />
          </MenuButtonWithTooltip>
          <MenuButtonWithTooltip
            onClick={() => editor.chain().focus().toggleItalic().run()}
            tooltipContent="Italic (Ctrl+I)"
            variant={editor.isActive('italic') ? 'default' : 'text'} // maybe should be passed as a 'selected' prop so that the variant can be standardized
          >
            <Italic />
          </MenuButtonWithTooltip>
          <Popover
            content={
              editor.getAttributes('link').href ? (
                <div className="flex items-center gap-1 pr-8">
                  <a href={editor.getAttributes('link').href as string}>
                    {editor.getAttributes('link').href}
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
            <MenuButtonWithTooltip
              tooltipContent="Set Link"
              variant={editor.getAttributes('link').href ? 'default' : 'text'}
            >
              <Link />
            </MenuButtonWithTooltip>
          </Popover>
        </div>
      </BaseBubbleMenu>
    </>
  );
};

const MenuButton = (props: ButtonProps) => {
  const { children, variant, ...rest } = props;

  return (
    <Button
      size="xs"
      variant={variant ?? 'text'}
      onClick={props.onClick}
      {...rest}
    >
      {children}
    </Button>
  );
};

const MenuButtonWithTooltip = withTooltip(MenuButton);
