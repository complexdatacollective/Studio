import { type Editor } from '@tiptap/react';
import { Plus } from 'lucide-react';
import { createVariableNode } from '~/lib/block-editor/extensions/Variable/utils';
import { type TiptapContent, contentMap } from '~/lib/block-editor/types';
import devProtocol from '~/lib/db/sample-data/dev-protocol';
import { type TVariableDefinition } from '~/schemas/protocol/variables';
import { Button } from '../Button';
import DropdownMenu from '../DropdownMenu';

export default function PlusMenu({ editor }: { editor: Editor | null }) {
  if (!editor) return null;
  const { variables } = devProtocol;

  const handleCommand = (type: TiptapContent) => () => {
    const endPos = editor.state.doc.content.size;
    editor.chain().focus().insertContentAt(endPos, contentMap[type]).run();
    editor.view.focus();
  };

  const addVariable = (variable: TVariableDefinition) => {
    const endPos = editor.state.doc.content.size;
    const variableNode = createVariableNode({
      newVariable: variable,
      view: editor.view,
      key: variable.label.en,
    });
    const transaction = editor.view.state.tr.insert(endPos, variableNode);
    editor.view.dispatch(transaction);
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="outline" size="icon" color="primary">
          <Plus />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Label>Add content</DropdownMenu.Label>
        {Object.keys(contentMap).map((type) => (
          <DropdownMenu.Item
            key={type}
            onSelect={handleCommand(type as TiptapContent)}
            textValue={type}
          >
            {type}
          </DropdownMenu.Item>
        ))}

        <DropdownMenu.Separator />

        <DropdownMenu.Label>Add variable</DropdownMenu.Label>
        {variables &&
          Object.entries(variables).map(([key, variable]) => (
            <DropdownMenu.Item
              key={key}
              onSelect={() => {
                addVariable(variable);
              }}
              textValue={variable.label.en}
            >
              {variable.label.en}
            </DropdownMenu.Item>
          ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
