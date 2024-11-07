import { type Editor } from '@tiptap/react';
import { Pencil, X } from 'lucide-react';
import { Button } from '~/components/Button';
import Popover from '~/components/Popover';
import { MenuButton } from '../BubbleMenu';
import { type VariableNodeAttributes } from './Variable';

export default function VariableHoverMenu({
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (!formData.get('control')) {
      return;
    }

    updateAttributes({
      control: formData.get('control') as string,
    });

    editor.commands.focus(); // Focus the editor after the update
  };

  return (
    <div className="flex gap-1">
      <MenuButton
        onClick={() => {
          deleteNode();
        }}
      >
        <X />
      </MenuButton>
      <Popover
        content={
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              {attributes?.type === 'categorical' && (
                <select
                  name="control"
                  defaultValue={attributes?.control ?? 'checkboxGroup'}
                >
                  <option value="checkboxGroup">Checkbox Group</option>
                  <option value="toggleGroup">Toggle Button Group</option>
                </select>
              )}
              {attributes?.type === 'text' && (
                <select
                  name="control"
                  defaultValue={attributes?.control ?? 'text'}
                >
                  <option value="text">Text</option>
                  <option value="textArea">Text Area</option>
                </select>
              )}

              <Button size="xs" type="submit">
                Update
              </Button>
            </div>
          </form>
        }
      >
        <MenuButton>
          <Pencil />
        </MenuButton>
      </Popover>
    </div>
  );
}
