import { tv } from 'tailwind-variants';
import Heading from '../typography/Heading';
import { cn } from '~/lib/utils';

const sectionVariants = tv({
  slots: {
    base: 'border rounded border-card-border flex flex-col bg-card text-card-foreground',
    wrapper: 'relative flex flex-col space-y-4 py-4 px-6 sm:py-6 sm:px-8',
    footer:
      'flex flex-col items-center justify-center space-y-2 rounded-b border-t border-card-border p-3 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10',
  },
});

const { base, footer, wrapper } = sectionVariants();

export default function Section({
  children,
  title,
  Footer,
  className,
}: {
  children: React.ReactNode;
  title?: string;
  Footer?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={base()}>
      <div className={cn(wrapper(), className)}>
        {title && (
          <Heading variant="h2" className="m-0">
            {title}
          </Heading>
        )}
        {children}
      </div>
      {Footer && <div className={footer()}>{Footer}</div>}
    </section>
  );
}
