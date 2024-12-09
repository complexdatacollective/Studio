import { useEditorState, type Editor } from '@tiptap/react';
import { ChevronDown, CircleAlert, Trash } from 'lucide-react';
import DropdownMenu from '~/components/DropdownMenu';
import Toolbar from '~/components/Toolbar';

type VariableEditorState = {
  type: 'categorical' | 'text';
  control: 'checkboxGroup' | 'toggleButtonGroup' | 'text' | 'textArea';
  required: boolean;
};

export default function VariableMenu({ editor }: { editor: Editor | null }) {
  const { type, control, required } = useEditorState({
    editor,
    selector: (ctx) => {
      return {
        type: ctx.editor?.getAttributes('variable')?.type as
          | 'categorical'
          | 'text'
          | 'number'
          | undefined,
        control: ctx.editor?.getAttributes('variable')?.control as
          | 'checkboxGroup'
          | 'toggleButtonGroup'
          | 'text'
          | 'textArea',
        required: ctx.editor?.getAttributes('variable')?.required as boolean,
      };
    },
  }) as VariableEditorState;

  if (!editor) {
    return null;
  }

  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Content>
          <DropdownMenu.RadioGroup>
            <DropdownMenu.Label>Select an input control</DropdownMenu.Label>
            {type === 'categorical' && (
              <>
                <DropdownMenu.Item
                  active={control === 'checkboxGroup'}
                  textValue="checkboxGroup"
                  onSelect={() =>
                    editor?.commands.updateAttributes('variable', {
                      control: 'checkboxGroup',
                    })
                  }
                >
                  Checkbox Group
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  active={control === 'toggleButtonGroup'}
                  textValue="toggleButtonGroup"
                  onSelect={() =>
                    editor?.commands.updateAttributes('variable', {
                      control: 'toggleButtonGroup',
                    })
                  }
                >
                  Toggle Button Group
                </DropdownMenu.Item>
              </>
            )}
            {type === 'text' && (
              <>
                <DropdownMenu.Item
                  active={control === 'text'}
                  textValue="text"
                  onSelect={() =>
                    editor?.commands.updateAttributes('variable', {
                      control: 'text',
                    })
                  }
                >
                  Text
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  active={control === 'textArea'}
                  textValue="textArea"
                  onSelect={() =>
                    editor?.commands.updateAttributes('variable', {
                      control: 'textArea',
                    })
                  }
                >
                  Text Area
                </DropdownMenu.Item>
              </>
            )}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
        <Toolbar.Button>
          <DropdownMenu.Trigger>
            <div className="flex items-center gap-1">
              {control} <ChevronDown className="h-4 w-4" />
            </div>
          </DropdownMenu.Trigger>
        </Toolbar.Button>
      </DropdownMenu.Root>
      {/* required toggle */}
      <Toolbar.ToggleGroup
        type="single"
        onValueChange={() =>
          editor?.commands.updateAttributes('variable', {
            required: !required,
          })
        }
      >
        <Toolbar.ToggleItem
          value="required"
          aria-label="required"
          active={required}
        >
          <CircleAlert className="h-4 w-4" /> Required
        </Toolbar.ToggleItem>
      </Toolbar.ToggleGroup>
      <Toolbar.Button
        onClick={() => {
          editor?.commands.deleteNode('variable');
        }}
      >
        <Trash className="h-4 w-4" />
      </Toolbar.Button>
    </>
  );
}
