'use client';

import { useState, useCallback } from 'react';
import { cn } from '~/lib/utils';

export default function Panel({
  title,
  children,
  noCollapse,
  minimize,
  noHighlight,
}: {
  title: string;
  children: React.ReactNode;
  noCollapse?: boolean;
  minimize?: boolean;
  noHighlight?: boolean;
}) {
  const [collapsed, setCollapsed] = useState(false);

  const panelClasses = cn(
    'mb-4 flex flex-1 flex-col rounded-lg bg-cyber-grape border-b border-b-sea-green border-b-4',
    {
      'border-b-0': noHighlight,
      'border-b-0 opacity-0 mb-0 flex-grow-0': minimize,
    },
  );

  const contentClasses = cn('flex flex-col overflow-hidden items-center', {
    'h-0 flex-grow-0': collapsed,
    'h-auto flex-grow': !collapsed,
  });

  const toggleCollapsed = useCallback(() => {
    if (noCollapse) {
      return;
    }
    setCollapsed((value) => !value);
  }, [noCollapse]);

  return (
    <div className={panelClasses}>
      <div
        className="flex cursor-pointer flex-col items-center border-b border-cyber-grape-dark p-4 text-center"
        onClick={toggleCollapsed}
      >
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
      <div className={contentClasses}>{children}</div>
    </div>
  );
}
