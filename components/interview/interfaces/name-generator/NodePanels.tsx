'use client';

import type { Node } from '~/components/interview/NodeList';
import * as Accordion from '@radix-ui/react-accordion';
import { useState } from 'react';
import NodeList from '~/components/interview/NodeList';
import NodePanel from './NodePanel';

// TODO: Remove once connected to state
type Panel = {
  id: string;
  title: string;
  nodes: Node[];
};

type NodePanels = {
  panels: Panel[];
} & React.ComponentProps<'div'>;

export default function NodePanels({ panels, ...rest }: NodePanels) {
  const [values, setValues] = useState<string[]>(
    panels.map((panel) => panel.id),
  );

  return (
    <Accordion.Root
      value={values}
      onValueChange={setValues}
      asChild
      type="multiple"
    >
      <div className="flex flex-col gap-4" {...rest}>
        {panels.map((panel) => (
          <NodePanel
            key={panel.id}
            id={panel.id}
            title={panel.title}
            expanded={values.includes(panel.id)}
          >
            <NodeList items={panel.nodes} nodeSize="sm" />
          </NodePanel>
        ))}
      </div>
    </Accordion.Root>
  );
}
