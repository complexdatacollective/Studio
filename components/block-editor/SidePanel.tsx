/* eslint-disable jsx-a11y/no-static-element-interactions */
import {
  CaseSensitive,
  Hash,
  type LucideIcon,
  SquareStack,
} from 'lucide-react';
import React from 'react';
import Heading from '~/components/typography/Heading';
import { handleDrag } from '~/lib/block-editor/utils';
import devProtocol from '~/lib/db/sample-data/dev-protocol';
import { cn } from '~/lib/utils';
import { Card } from '../Card';

const VARIABLE_ICONS: Record<string, LucideIcon> = {
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
  { name: 'Group', type: 'group' },
];

export default function SidePanel() {
  const { variables } = devProtocol;

  if (!variables) return null;

  const renderDraggableItem = (
    label: string,
    onDragStart: (e: React.DragEvent) => void,
    Icon?: LucideIcon,
  ) => (
    <div
      draggable
      onDragStart={onDragStart}
      className={cn(
        'flex w-48 cursor-pointer flex-row items-center justify-between border p-2',
      )}
      key={label}
    >
      {label}
      {Icon && <Icon size={24} />}
    </div>
  );

  return (
    <Card title="Nodes side panel" className="flex flex-col gap-2">
      <Heading variant="h4">Variables</Heading>
      {Object.entries(variables).map(([key, variable]) => {
        const Icon = VARIABLE_ICONS[variable.type];
        return renderDraggableItem(
          variable.label.en,
          (e) => handleDrag(e, 'variable', variable, key),
          Icon,
        );
      })}

      <Heading variant="h4">Format</Heading>
      {FORMATS.map(({ name, type }) =>
        renderDraggableItem(name, (e) => handleDrag(e, type)),
      )}
    </Card>
  );
}
