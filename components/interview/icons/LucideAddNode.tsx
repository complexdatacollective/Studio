import { cn } from '~/lib/utils';
import React from 'react';
import dynamic from 'next/dynamic';
import { type LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

type IconProps = {
  name: keyof typeof dynamicIconImports;
} & LucideProps;

const Icon = ({ name, ...props }: IconProps) => {
  const LucideIcon = dynamic(dynamicIconImports[name]);

  return <LucideIcon {...props} />;
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
