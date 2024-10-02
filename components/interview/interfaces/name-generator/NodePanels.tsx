import type { Node } from '~/components/interview/NodeList';
import NodePanel from './NodePanel';
import { forwardRef, type ForwardedRef } from 'react';
import { useTranslations } from 'next-intl';

type Panel = {
  id: string;
  title: string;
  nodes: Node[];
};

export default forwardRef(function NodePanels(
  { panels }: { panels: Panel[] },
  ref: ForwardedRef<HTMLDivElement>,
) {
  const t = useTranslations(`Protocol.Panels`);

  return (
    <div id="data-wizard-task-step-2" ref={ref} className="flex flex-col gap-4">
      {panels.map((panel) => {
        return (
          <NodePanel key={panel.id} {...panel} title={t(`${panel.id}.Title`)} />
        );
      })}
    </div>
  );
});
