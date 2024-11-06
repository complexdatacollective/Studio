import { CaseSensitive, Hash, SquareStack } from 'lucide-react';
import { handleVariableDrag } from '~/lib/block-editor/extensions/Variable/utils';
import devProtocol from '~/lib/db/sample-data/dev-protocol';
import { Card } from '../Card';

export default function SidePanel() {
  const variables = devProtocol.variables;

  if (!variables) {
    return null;
  }

  return (
    <Card title="Available Variables" className="flex flex-col gap-2">
      {Object.entries(variables).map(([key, variable]) => (
        <div
          key={key}
          draggable
          onDragStart={(e) => handleVariableDrag(e, key, variable)}
          className="flex w-48 flex-row items-center justify-between border p-2"
        >
          {variable.label.en}
          {variable.type === 'text' && <CaseSensitive size={24} />}
          {variable.type === 'number' && <Hash size={24} />}
          {variable.type === 'categorical' && <SquareStack size={24} />}
        </div>
      ))}
    </Card>
  );
}
