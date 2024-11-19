import { useEditorState, type Editor } from '@tiptap/react';
import {
  CircleAlert,
  Columns2,
  Columns3,
  Columns4,
  Group,
  RectangleVertical,
} from 'lucide-react';
import DropdownMenu from '~/components/DropdownMenu';
import Toolbar from '~/components/Toolbar';
import { toggleGroupRequired } from './utils';

type GroupEditorState = {
  columns: number;
  groupRequired: boolean;
};

export default function GroupMenu({ editor }: { editor: Editor | null }) {
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
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Group />
      </DropdownMenu.Trigger>

      <DropdownMenu.Content side="top">
        <DropdownMenu.Label>Group Settings</DropdownMenu.Label>

        <DropdownMenu.Item
          onSelect={() => {
            editor?.commands.deleteNode('group');
          }}
          textValue="Delete Group"
        >
          Delete Group
        </DropdownMenu.Item>
        <Toolbar.ToggleGroup type="multiple">
          <Toolbar.ToggleItem
            active={columns === 1}
            value="1"
            onClick={() => {
              editor?.commands.updateAttributes('group', {
                columns: 1,
              });
            }}
          >
            <RectangleVertical className="h-4 w-4" />
          </Toolbar.ToggleItem>
          <Toolbar.ToggleItem
            active={columns === 2}
            value="2"
            onClick={() => {
              editor?.commands.updateAttributes('group', {
                columns: 2,
              });
            }}
          >
            <Columns2 className="h-4 w-4" />
          </Toolbar.ToggleItem>
          <Toolbar.ToggleItem
            active={columns === 3}
            value="3"
            onClick={() => {
              editor?.commands.updateAttributes('group', {
                columns: 3,
              });
            }}
          >
            <Columns3 className="h-4 w-4" />
          </Toolbar.ToggleItem>
          <Toolbar.ToggleItem
            active={columns === 4}
            value="4"
            onClick={() => {
              editor?.commands.updateAttributes('group', {
                columns: 4,
              });
            }}
          >
            <Columns4 className="h-4 w-4" />
          </Toolbar.ToggleItem>
        </Toolbar.ToggleGroup>

        {/* Required toggle */}
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
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
