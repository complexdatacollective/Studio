import { useEditorState, type Editor } from '@tiptap/react';
import { ChevronDown, CircleAlert, Trash } from 'lucide-react';
import { useCallback } from 'react';
import { sticky } from 'tippy.js';
import DropdownMenu from '~/components/DropdownMenu';
import Toolbar from '~/components/Toolbar';
import BubbleMenu from '~/components/block-editor/BubbleMenu';
import getRenderContainer from '../../utils';
import { toggleGroupRequired } from './utils';

type GroupEditorState = {
  columns: number;
  groupRequired: boolean;
};

export default function GroupMenu({
  editor,
  appendTo,
}: {
  editor: Editor | null;
  appendTo: React.RefObject<HTMLDivElement>;
}) {
  const shouldShow = useCallback(() => {
    const isGroup = editor?.isActive('group');
    return !!isGroup;
  }, [editor]);

  const getReferenceClientRect = useCallback(() => {
    if (!editor) return new DOMRect(-1000, -1000, 0, 0);
    const renderContainer = getRenderContainer(editor, 'group');

    const rect =
      renderContainer?.getBoundingClientRect() ??
      new DOMRect(-1000, -1000, 0, 0);

    return rect;
  }, [editor]);

  const { columns, groupRequired } = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        columns: ctx.editor?.getAttributes('group')?.columns as number,
        groupRequired: ctx.editor?.getAttributes('group')
          ?.groupRequired as boolean,
      };
    },
  }) as GroupEditorState;

  if (!editor) {
    return null;
  }

  return (
    <BubbleMenu
      editor={editor}
      shouldShow={shouldShow}
      tippyOptions={{
        offset: [0, 20],
        popperOptions: {
          modifiers: [{ name: 'flip', enabled: false }],
        },
        plugins: [sticky],
        getReferenceClientRect,
        appendTo: () => appendTo?.current ?? document.body,
      }}
    >
      <Toolbar.Root>
        <Toolbar.Button
          onClick={() => {
            editor?.commands.deleteNode('group');
          }}
        >
          <Trash className="h-4 w-4" />
        </Toolbar.Button>
        <DropdownMenu.Root>
          <DropdownMenu.DropdownMenuContent>
            <DropdownMenu.RadioGroup>
              <DropdownMenu.Label>Select number of columns</DropdownMenu.Label>
              <DropdownMenu.Item
                active={columns === 1}
                textValue="1"
                onSelect={() =>
                  editor?.commands.updateAttributes('group', { columns: 1 })
                }
              >
                1
              </DropdownMenu.Item>
              <DropdownMenu.Item
                active={columns === 2}
                textValue="2"
                onSelect={() =>
                  editor?.commands.updateAttributes('group', { columns: 2 })
                }
              >
                2
              </DropdownMenu.Item>
              <DropdownMenu.Item
                active={columns === 3}
                textValue="3"
                onSelect={() =>
                  editor?.commands.updateAttributes('group', { columns: 3 })
                }
              >
                3
              </DropdownMenu.Item>
              <DropdownMenu.Item
                active={columns === 4}
                textValue="4"
                onSelect={() =>
                  editor?.commands.updateAttributes('group', { columns: 4 })
                }
              >
                4
              </DropdownMenu.Item>
            </DropdownMenu.RadioGroup>
          </DropdownMenu.DropdownMenuContent>
          <Toolbar.Button>
            <DropdownMenu.Trigger>
              <div className="flex items-center gap-1">
                {columns} Columns
                <ChevronDown className="h-4 w-4" />
              </div>
            </DropdownMenu.Trigger>
          </Toolbar.Button>
        </DropdownMenu.Root>
        {/* required toggle */}
        <Toolbar.ToggleGroup
          type="single"
          onValueChange={() => toggleGroupRequired(editor)}
        >
          <Toolbar.ToggleItem
            value="required"
            aria-label="required"
            active={!!groupRequired}
          >
            <CircleAlert className="h-4 w-4" /> Group Required
          </Toolbar.ToggleItem>
        </Toolbar.ToggleGroup>
      </Toolbar.Root>
    </BubbleMenu>
  );
}
