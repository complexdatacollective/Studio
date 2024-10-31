import { useEditorState, type Editor } from '@tiptap/react';
import { Button } from '~/components/Button';
import Popover from '~/components/Popover';
import { MenuButtonWithTooltip } from '../BubbleMenu/BubbleMenu';

export const VariableMenu = ({ editor }: { editor: Editor | null }) => {
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => {
      return {
        isVariable: !!editor?.isActive('variable'),
        variableType: editor?.getAttributes('variable').type,
      };
    },
  });

  if (!editor || !editorState?.isVariable) {
    return null;
  }

  const handleLinkSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const label = formData.get('label') as string;
    const hint = formData.get('hint') as string;
    const control = formData.get('control') as string;

    editor.commands.updateAttributes('variable', {
      control,
      label,
      hint,
    });
  };

  return (
    <>
      <Popover
        content={
          <form onSubmit={handleLinkSubmit}>
            <div className="flex flex-col gap-1">
              <input
                name="label"
                type="text"
                placeholder="Label"
                className="input"
              />
              <input
                name="hint"
                type="text"
                placeholder="Hint"
                className="input"
              />
              {editorState.variableType === 'categorical' && (
                <select name="control">
                  <option value="checkbox">Checkbox Group</option>
                  <option value="toggle">Toggle Button Group</option>
                </select>
              )}

              <Button size="xs" type="submit">
                Update
              </Button>
            </div>
          </form>
        }
      >
        <MenuButtonWithTooltip tooltipContent="Edit Variable" variant="default">
          Edit Variable
        </MenuButtonWithTooltip>
      </Popover>
    </>
  );
};
