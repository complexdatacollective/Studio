import { CaseSensitive, Hash, SquareStack } from 'lucide-react';
import {
  handleVariableDrag,
  type Variable,
} from '~/lib/block-editor/extensions/Variable/utils';
import { Card } from '../Card';

export default function SidePanel() {
  // dummy data, will get from the protocol
  const availableVariables = [
    {
      id: 'var1',
      type: 'text',
      name: 'Name',
      control: 'text',
    },
    {
      id: 'var2',
      type: 'number',
      name: 'Age',
      control: 'number',
    },
    {
      id: 'var3',
      type: 'categorical',
      name: 'School',
      control: 'checkboxGroup',
      options: ['Northwestern', 'U Chicago'],
    },
    {
      id: 'var4',
      type: 'categorical',
      name: 'Color',
      control: 'toggleGroup',
      options: ['Red', 'Blue'],
    },
    {
      id: 'var5',
      type: 'text',
      name: 'Address',
      control: 'textArea',
    },
  ] as Variable[];

  return (
    <Card title="Available Variables" className="flex flex-col gap-2">
      {availableVariables.map((variable, index) => (
        <div
          key={index}
          draggable
          onDragStart={(e) => handleVariableDrag(e, variable)}
          className="flex w-48 flex-row items-center justify-between border p-2"
        >
          {variable.name}
          {variable.type === 'text' && <CaseSensitive size={24} />}
          {variable.type === 'number' && <Hash size={24} />}
          {variable.type === 'categorical' && <SquareStack size={24} />}
        </div>
      ))}
    </Card>
  );
}
