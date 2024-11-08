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
                  onSelect={() =>
                    updateAttributes({ control: 'checkboxGroup' })
                  }
                >
                  Checkbox Group
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  active={attributes?.control === 'toggleButtonGroup'}
                  textValue="toggleButtonGroup"
                  onSelect={() =>
                    updateAttributes({ control: 'toggleButtonGroup' })
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
                  onSelect={() => updateAttributes({ control: 'text' })}
                >
                  Text
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  active={attributes?.control === 'textArea'}
                  textValue="textArea"
                  onSelect={() => updateAttributes({ control: 'textArea' })}
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
        onValueChange={() =>
          updateAttributes({ required: !attributes.required })
        }
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
