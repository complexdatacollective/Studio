import { cn } from '~/lib/utils';

export default function UnorderedList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <ul className={cn('my-3 ml-8 list-disc [&>li]:mt-1', className)}>
      {children}
    </ul>
  );
}
