import { cn } from '~/lib/utils';

export default function Node({
  label,
  size = 'lg',
}: {
  label: string;
  size?: 'sm' | 'lg';
}) {
  const labelWithEllipsis =
    label.length < 22 ? label : `${label.substring(0, 18)}\u{AD}...`; // Add ellipsis for really long labels

  const labelClasses = cn(
    'whitespace-pre-line overflow-hidden text-center hyphens-auto text-wrap break-all px-6',
    size === 'sm' ? 'text-sm' : 'text-base',
  );

  // TODO: move to variants using TWV
  const nodeSizeClasses = size === 'sm' ? 'h-24 w-24' : 'h-36 w-36';

  return (
    <div
      role="button"
      className={`inline-flex rounded-full ${nodeSizeClasses} text-node-1-foreground items-center justify-center bg-node-1`}
      aria-label={label}
    >
      <span className={labelClasses}>{labelWithEllipsis}</span>
    </div>
  );
}
