import { type Editor } from '@tiptap/react';
import { ChevronDown, CircleAlert, Trash } from 'lucide-react';
import DropdownMenu from '~/components/DropdownMenu';
import Toolbar from '~/components/Toolbar';
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
            <DropdownMenu.Label>Select an input control</DropdownMenu.Label>
            {attributes?.type === 'categorical' && (
              <>
                <DropdownMenu.Item
                  active={attributes?.control === 'checkboxGroup'}
                  textValue="checkboxGroup"
                  onSelect={() => updateAttribute('control', 'checkboxGroup')}
                >
                  Checkbox Group
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  active={attributes?.control === 'toggleButtonGroup'}
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
                  active={attributes?.control === 'text'}
                  textValue="text"
                  onSelect={() => updateAttribute('control', 'text')}
                >
                  Text
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  active={attributes?.control === 'textArea'}
                  textValue="textArea"
                  onSelect={() => updateAttribute('control', 'textArea')}
                >
                  Text Area
                </DropdownMenu.Item>
              </>
            )}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.DropdownMenuContent>
        <Toolbar.Button>
          <DropdownMenu.Trigger>
            <div className="flex items-center gap-1">
              {attributes?.control} <ChevronDown className="h-4 w-4" />
            </div>
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
          active={attributes.required}
        >
          <CircleAlert className="h-4 w-4" /> Required
        </Toolbar.ToggleItem>
      </Toolbar.ToggleGroup>
    </Toolbar.Root>
  );
}
