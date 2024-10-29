import * as Accordion from '@radix-ui/react-accordion';
import { motion } from 'framer-motion';
import { MotionSurface } from '~/components/layout/Surface';
import Heading from '~/components/typography/Heading';
import { cn } from '~/lib/utils';

const MotionTrigger = motion.create(Accordion.Trigger);

export default function Panel({
  id,
  title,
  expanded,
  children,
  noHighlight,
}: {
  id: string;
  title: string;
  expanded: boolean;
  children: React.ReactNode;
  noHighlight?: boolean;
}) {
  const panelClasses = cn(
    'flex flex-1 flex-col rounded-small border-b border-b-4 border-panel-1 shadow-xl',
    {
      'border-b-0': noHighlight,
    },
  );

  const contentClasses = cn(
    'h-auto flex-grow border-t border-background flex flex-col overflow-hidden items-center',
  );

  return (
    <Accordion.Item value={id} asChild>
      <MotionSurface layout level={1} spacing="none" className={panelClasses}>
        <MotionTrigger
          layout
          className="flex cursor-pointer items-center justify-center p-4"
        >
          <Heading variant="h3" className="mb-0">
            {title}
          </Heading>
        </MotionTrigger>
        <Accordion.Content className={contentClasses}>
          {expanded ? children : null}
        </Accordion.Content>
      </MotionSurface>
    </Accordion.Item>
  );
}
