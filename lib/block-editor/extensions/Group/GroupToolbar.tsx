import { type Editor } from '@tiptap/react';
import { ChevronDown, CircleAlert, Trash } from 'lucide-react';
import DropdownMenu from '~/components/DropdownMenu';
import Toolbar from '~/components/Toolbar';

export default function VariableToolbar({
  deleteNode,
  editor,
  attributes,
  updateAttributes,
}: {
  deleteNode: () => void;
  editor: Editor | null;
  attributes: {
    columns: number;
  };
  updateAttributes: (attributes: { columns: number }) => void;
}) {
  if (!editor) {
    return null;
  }

  return (
    <Toolbar.Root>
      <Toolbar.Button
        onClick={() => {
          deleteNode();
        }}
      >
        <Trash className="h-4 w-4" />
      </Toolbar.Button>
      <DropdownMenu.Root>
        <DropdownMenu.DropdownMenuContent>
          <DropdownMenu.RadioGroup>
            <DropdownMenu.Label>Select number of columns</DropdownMenu.Label>
            <DropdownMenu.Item
              active={attributes?.columns === 1}
              textValue="1"
              onSelect={() => updateAttributes({ columns: 1 })}
            >
              1
            </DropdownMenu.Item>
            <DropdownMenu.Item
              active={attributes?.columns === 2}
              textValue="2"
              onSelect={() => updateAttributes({ columns: 2 })}
            >
              2
            </DropdownMenu.Item>
            <DropdownMenu.Item
              active={attributes?.columns === 3}
              textValue="3"
              onSelect={() => updateAttributes({ columns: 3 })}
            >
              3
            </DropdownMenu.Item>
            <DropdownMenu.Item
              active={attributes?.columns === 4}
              textValue="4"
              onSelect={() => updateAttributes({ columns: 4 })}
            >
              4
            </DropdownMenu.Item>
          </DropdownMenu.RadioGroup>
        </DropdownMenu.DropdownMenuContent>
        <Toolbar.Button>
          <DropdownMenu.Trigger>
            <div className="flex items-center gap-1">
              {attributes?.columns} Grid columns
              <ChevronDown className="h-4 w-4" />
            </div>
          </DropdownMenu.Trigger>
        </Toolbar.Button>
      </DropdownMenu.Root>
      {/* required toggle */}
      <Toolbar.ToggleGroup
        type="single"
        onValueChange={() => () => console.log('set group required')}
      >
        <Toolbar.ToggleItem
          value="required"
          aria-label="required"
          active={false} // get this from somewhere
        >
          <CircleAlert className="h-4 w-4" /> Group Required
        </Toolbar.ToggleItem>
      </Toolbar.ToggleGroup>
    </Toolbar.Root>
  );
}
