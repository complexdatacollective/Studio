import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Toolbar from '@radix-ui/react-toolbar';
import { type Editor } from '@tiptap/react';
import { ChevronDown, CircleAlert, Trash } from 'lucide-react';
import { type VariableNodeAttributes } from './Variable';

export default function VariableToolbar({
  deleteNode,
  editor,
  attributes,
  updateAttributes,
}: {
  deleteNode: () => void;
  editor: Editor | null;
  attributes: VariableNodeAttributes;
  updateAttributes: (attributes: Partial<VariableNodeAttributes>) => void; // this allows partial updates
}) {
  if (!editor) {
    return null;
  }

  const updateAttribute = <K extends keyof VariableNodeAttributes>(
    attribute: K,
    value: VariableNodeAttributes[K],
  ) => {
    updateAttributes({
      [attribute]: value,
    });

    editor.commands.focus(); // Focus the editor after the update
  };

  return (
    <Toolbar.Root className="flex items-center gap-2 pr-8 text-sm">
      <Toolbar.Button
        onClick={() => {
          deleteNode();
        }}
        className="hover:text-destructive"
      >
        <Trash className="h-4 w-4" />
      </Toolbar.Button>
      <DropdownMenu.Root>
        <DropdownMenu.Portal>
          <DropdownMenu.DropdownMenuContent className="bg-surface-0">
            <DropdownMenu.RadioGroup>
              {attributes?.type === 'categorical' && (
                <>
                  <DropdownMenu.Item
                    className="hover:cursor-pointer"
                    textValue="checkboxGroup"
                    onSelect={() => updateAttribute('control', 'checkboxGroup')}
                  >
                    Checkbox Group
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    className="hover:cursor-pointer"
                    textValue="toggleButtonGroup"
                    onSelect={() =>
                      updateAttribute('control', 'toggleButtonGroup')
                    }
                  >
                    Toggle Button Group
                  </DropdownMenu.Item>
                </>
              )}
              {attributes?.type === 'text' && (
                <>
                  <DropdownMenu.Item
                    className="hover:cursor-pointer"
                    textValue="text"
                    onSelect={() => updateAttribute('control', 'text')}
                  >
                    Text
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    className="hover:cursor-pointer"
                    textValue="textArea"
                    onSelect={() => updateAttribute('control', 'textArea')}
                  >
                    Text Area
                  </DropdownMenu.Item>
                </>
              )}
            </DropdownMenu.RadioGroup>
          </DropdownMenu.DropdownMenuContent>
        </DropdownMenu.Portal>
        <Toolbar.Button asChild>
          <DropdownMenu.Trigger className="flex items-center gap-1">
            {attributes?.control} <ChevronDown className="h-4 w-4" />
          </DropdownMenu.Trigger>
        </Toolbar.Button>
      </DropdownMenu.Root>
      {/* required toggle */}
      <Toolbar.ToggleGroup
        type="single"
        onValueChange={() => updateAttribute('required', !attributes.required)}
      >
        <Toolbar.ToggleItem
          value="required"
          aria-label="required"
          className="flex items-center gap-1"
        >
          <CircleAlert className="h-4 w-4" /> Required
        </Toolbar.ToggleItem>
      </Toolbar.ToggleGroup>
    </Toolbar.Root>
  );
}
