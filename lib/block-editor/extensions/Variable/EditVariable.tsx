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
        variable: editor?.getAttributes('variable'),
        control: editor?.getAttributes('control'),
      };
    },
  });

  if (!editor || !editorState?.isVariable) {
    return null;
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const control = formData.get('control') as string;

    editor.commands.updateAttributes('control', {
      control: control,
    });
    editor.commands.focus(); // Focus the editor after the update
  };

  return (
    <>
      <Popover
        content={
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              {editorState.control.type === 'categorical' && (
                <select name="control">
                  <option value="checkboxGroup">Checkbox Group</option>
                  <option value="toggleGroup">Toggle Button Group</option>
                </select>
              )}
              {editorState.control.type === 'text' && (
                <select
                  name="control"
                  defaultValue={editorState.control.control}
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
        <MenuButtonWithTooltip tooltipContent="Edit Variable" variant="text">
          Edit Variable
        </MenuButtonWithTooltip>
      </Popover>
    </>
  );
};
