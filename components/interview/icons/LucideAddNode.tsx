import { cn } from '~/lib/utils';

import React, { lazy, Suspense } from 'react';
import type { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { Circle } from 'lucide-react';

const fallback = <Circle size={60} />;

type IconProps = {
  name: keyof typeof dynamicIconImports;
} & Omit<LucideProps, 'ref'>;

const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = lazy(dynamicIconImports[name]);

  return (
    <Suspense fallback={fallback}>
      <LucideIcon {...props} />
    </Suspense>
  );
};

export default function LucideAddNode({
  iconName,
}: {
  iconName: keyof typeof dynamicIconImports;
}) {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center rounded-full bg-node-1 text-node-1-foreground',
        'bg-[repeating-linear-gradient(145deg,transparent,transparent_50%,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0.1)_100%)]',
        'h-36 w-36',
      )}
      aria-label="Add Node"
    >
      <Icon name={iconName} size={60} />
    </div>
  );
}
