/* eslint-disable jsx-a11y/no-static-element-interactions */
import { CaseSensitive, Hash, SquareStack } from 'lucide-react';
import Heading from '~/components/typography/Heading';
import { handleVariableDrag } from '~/lib/block-editor/extensions/Variable/utils';
import { handleDrag } from '~/lib/block-editor/utils';
import devProtocol from '~/lib/db/sample-data/dev-protocol';
import { cn } from '~/lib/utils';
import { Card } from '../Card';

const VARIABLE_ICONS = {
  text: CaseSensitive,
  number: Hash,
  categorical: SquareStack,
};

const FORMATS = [
  { name: 'Paragraph', type: 'paragraph' },
  { name: 'H1', type: 'h1' },
  { name: 'H2', type: 'h2' },
  { name: 'H3', type: 'h3' },
  { name: 'H4', type: 'h4' },
  { name: 'Bullet List', type: 'bulletList' },
];

export default function SidePanel() {
  const { variables } = devProtocol;

  if (!variables) return null;

  const renderDraggableItem = (
    label: string,
    onDragStart: (e: React.DragEvent) => void,
  ) => (
    <div
      draggable
      onDragStart={onDragStart}
      className={cn(
        'flex w-48 flex-row items-center justify-between border p-2',
        'cursor-pointer',
      )}
    >
      {label}
    </div>
  );

  return (
    <Card title="Nodes side panel" className="flex flex-col gap-2">
      <Heading variant="h4">Variables</Heading>
      {Object.entries(variables).map(([key, variable]) => {
        const Icon = VARIABLE_ICONS[variable.type];
        return (
          <div
            key={key}
            draggable
            onDragStart={(e) => handleVariableDrag(e, key, variable)}
            className={cn(
              'flex w-48 flex-row items-center justify-between border p-2',
              'cursor-pointer',
            )}
          >
            {variable.label.en}
            {Icon && <Icon size={24} />}
          </div>
        );
      })}

      <Heading variant="h4">Format</Heading>
      {FORMATS.map(({ name, type }) =>
        renderDraggableItem(name, (e) => handleDrag(e, type)),
      )}
    </Card>
  );
}
