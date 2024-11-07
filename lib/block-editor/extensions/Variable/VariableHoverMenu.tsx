import { type Editor } from '@tiptap/react';
import { Pencil, X } from 'lucide-react';
import { Button } from '~/components/Button';
import Popover from '~/components/Popover';
import { MenuButtonWithTooltip } from '../BubbleMenu';
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
    <div className="absolute left-0 top-[-40px] flex gap-1 rounded border bg-surface-0 px-2 py-1">
      <MenuButtonWithTooltip
        tooltipContent="Remove Variable"
        onClick={() => {
          deleteNode();
        }}
      >
        <X />
      </MenuButtonWithTooltip>
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
        <MenuButtonWithTooltip tooltipContent="Edit Variable Control Type">
          <Pencil />
        </MenuButtonWithTooltip>
      </Popover>
    </div>
  );
}
