/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client';

import { useState, useCallback } from 'react';
import Surface from '~/components/layout/Surface';
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
    'flex flex-1 flex-col rounded-small border-b border-b-4 border-panel-1 shadow-xl',
    {
      'border-b-0': noHighlight,
      'border-b-0 opacity-0 mb-0 flex-grow-0': minimize,
    },
  );

  const contentClasses = cn('flex flex-col overflow-hidden items-center', {
    'h-0 flex-grow-0': collapsed,
    'h-auto flex-grow border-t border-background': !collapsed,
  });

  const toggleCollapsed = useCallback(() => {
    if (noCollapse) {
      return;
    }
    setCollapsed((value) => !value);
  }, [noCollapse]);

  return (
    <Surface level={1} spacing="none" className={panelClasses}>
      <div
        className="flex cursor-pointer flex-col items-center p-4 text-center"
        onClick={toggleCollapsed}
      >
        <h3 className="font-medium text-lg">{title}</h3>
      </div>
      <div className={contentClasses}>{children}</div>
    </Surface>
  );
}
