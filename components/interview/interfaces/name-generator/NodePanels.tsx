'use client';

import * as Accordion from '@radix-ui/react-accordion';
import { useState } from 'react';
import NodeList from '~/components/interview/NodeList';
import NodePanel from './NodePanel';
import { type Panel } from '~/schemas/protocol/interfaces/name-generator';
import { useLocale } from 'next-intl';
import { type Locale } from '~/schemas/protocol/i18n';
import { type TNode } from '~/schemas/network/network';

type NodePanels = {
  panels: Panel[];
} & React.ComponentProps<'div'>;

export default function NodePanels({ panels, ...rest }: NodePanels) {
  const locale = useLocale() as Locale;
  const [values, setValues] = useState<string[]>(
    panels.map((panel) => panel.id),
  );

  // TODO: fetch nodes based on panel.source
  const [nodes] = useState<TNode[]>([]);

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
            title={panel.title[locale]!}
            expanded={values.includes(panel.id)}
          >
            <NodeList items={nodes} nodeSize="sm" />
          </NodePanel>
        ))}
      </div>
    </Accordion.Root>
  );
}
