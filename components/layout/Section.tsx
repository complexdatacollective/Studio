import { tv } from 'tailwind-variants';
import Heading from '../typography/Heading';
import { cn } from '~/lib/utils';

const sectionVariants = tv({
  slots: {
    base: cn(
      'rounded my-10 py-10 px-12 bg-surface-1 text-surface-1-foreground',
      '[&>section]:bg-surface-2 [&>section]:my-6 [&>section]:py-6 [&>section]:px-8 [&>section]:text-surface-2-foreground',
      '[&>section>section]:bg-surface-3 [&>section>section]:text-surface-3',
      '[&>section>section>section]:bg-surface-4 [&>section>section>section]:text-surface-4',
    ),
    footerSlot: 'mt-4',
  },
});

export default function Section({
  children,
  title,
  footer,
  className,
  level = 1,
}: {
  children: React.ReactNode;
  title?: string;
  footer?: React.ReactNode;
  className?: string;
  level?: 1 | 2 | 3 | 4;
}) {
  const { base, footerSlot } = sectionVariants();

  const getHeadingLevel = () => {
    switch (level) {
      case 1:
        return 'h2';
      case 2:
        return 'h3';
      case 3:
        return 'h4';
      case 4:
        return 'h4';
    }
  };

  return (
    <section className={cn(base(), className)}>
      {title && <Heading variant={getHeadingLevel()}>{title}</Heading>}
      {children}
      {footer && <footer className={footerSlot()}>{footer}</footer>}
    </section>
  );
}
