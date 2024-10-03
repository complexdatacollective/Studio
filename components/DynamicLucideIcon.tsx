import type { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { lazy } from 'react';
import type { NodeIcon } from '~/schemas/protocol/codebook/entities';

type IconProps = {
  name: NodeIcon;
} & Omit<LucideProps, 'ref'>;

export default function DynamicLucideIcon({ name, ...rest }: IconProps) {
  const LucideIcon = lazy(dynamicIconImports[name]);
  return <LucideIcon {...rest} />;
}
