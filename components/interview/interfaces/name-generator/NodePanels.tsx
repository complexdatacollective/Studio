'use client';

import type { Node } from '~/components/interview/NodeList';
import * as Accordion from '@radix-ui/react-accordion';
import NodePanel from './NodePanel';
import { useState, type ForwardedRef } from 'react';
import NodeList from '~/components/interview/NodeList';
import Surface, { MotionSurface } from '~/components/layout/Surface';
import Heading from '~/components/typography/Heading';
import { LayoutGroup, motion } from 'framer-motion';

const MotionTrigger = motion(Accordion.Trigger);

type Panel = {
  id: string;
  title: string;
  nodes: Node[];
};

export default function NodePanels({
  panels,
  ref,
}: {
  panels: Panel[];
  ref: ForwardedRef<HTMLDivElement>;
}) {
  const [values, setValues] = useState<string[]>(
    panels.map((panel) => panel.id),
  );

  return (
    <LayoutGroup>
      <Accordion.Root
        type="multiple"
        id="data-wizard-task-step-2"
        ref={ref}
        className="flex flex-col gap-4"
        value={values}
        onValueChange={setValues}
      >
        {panels.map((panel) => (
          <Accordion.Item key={panel.id} value={panel.id} asChild>
            <MotionSurface
              layout
              level={1}
              spacing="none"
              className="flex flex-1 flex-col rounded-small border-b-4 border-panel-1 shadow-xl"
            >
              <MotionTrigger
                layout
                className="flex cursor-pointer items-center justify-center p-4"
              >
                <Heading variant="h3" className="mb-0">
                  {panel.title}
                </Heading>
              </MotionTrigger>
              <Accordion.Content>
                {values.includes(panel.id) ? (
                  <NodeList items={panel.nodes} nodeSize="sm" />
                ) : null}
              </Accordion.Content>
            </MotionSurface>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </LayoutGroup>
  );
}
