import { CaseSensitive, Hash, SquareStack } from 'lucide-react';
import { Card } from '../Card';

// simplified version of the variable type
type Variable = {
  id: string;
  type: string;
  name: string;
  control: string;
  options?: string[];
};

export default function SidePanel() {
  // dummy data, will get from the protocol
  const availableVariables = [
    {
      id: 'var1',
      type: 'text',
      name: 'Name',
      control: 'text',
      hint: 'Add some text...',
    },
    {
      id: 'var2',
      type: 'number',
      name: 'Age',
      control: 'number',
      hint: 'Add a number...',
    },
    {
      id: 'var3',
      type: 'categorical',
      name: 'School',
      control: 'checkboxGroup',
      options: ['Northwestern', 'U Chicago'],
    },
  ] as Variable[];

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    variable: Variable,
  ) => {
    event.dataTransfer.setData('application/json', JSON.stringify(variable));
    // this is used to identify the data as a form variable in handleDrop
    event.dataTransfer.setData('application/x-form-variable', 'true');
  };

  return (
    <Card title="Available Variables" className="flex flex-col gap-2">
      {availableVariables.map((variable, index) => (
        <div
          key={index}
          draggable
          onDragStart={(e) => handleDragStart(e, variable)}
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
