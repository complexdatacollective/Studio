import type { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import dynamic from 'next/dynamic';
import type { NodeIcon } from '~/schemas/protocol/codebook/entities';

export default function DynamicLucideIcon({
  name,
  ...rest
}: { name: NodeIcon } & LucideProps) {
  const LucideIcon = dynamic(dynamicIconImports[name]);
  return <LucideIcon {...rest} />;
}
