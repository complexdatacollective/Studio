import { cn } from '~/lib/utils';

export const unorderedListClasses = 'my-3 ml-8 list-disc [&>li]:mt-1';

export default function UnorderedList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <ul className={cn(unorderedListClasses, className)}>{children}</ul>;
}
