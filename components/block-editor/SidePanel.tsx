import { Card } from '../Card';

// simplified version of the variable type
type Variable = {
  id: string;
  type: string;
  name: string;
  // control: ReactNode;
};

export default function SidePanel() {
  // dummy data, will get from the protocol
  const availableVariables = [
    { id: 'var1', type: 'text', name: 'Name' },
    { id: 'var2', type: 'number', name: 'Age' },
    { id: 'var3', type: 'categorical', name: 'School' },
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
          className="w-48 border p-2"
        >
          {variable.name} ({variable.type})
        </div>
      ))}
    </Card>
  );
}
