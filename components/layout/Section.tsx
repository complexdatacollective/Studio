import { tv } from 'tailwind-variants';
import Heading from '../typography/Heading';

const sectionVariants = tv({
  slots: {
    base: 'border rounded-lg border bg-white flex flex-col',
    wrapper: 'relative flex flex-col space-y-4 p-5 sm:p-10',
    footer:
      'flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t p-3 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10',
  },
});

const { base, footer, wrapper } = sectionVariants();

export default function Section({
  children,
  title,
  Footer,
}: {
  children: React.ReactNode;
  title?: string;
  Footer?: React.ReactNode;
}) {
  return (
    <section className={base()}>
      <div className={wrapper()}>
        {title && <Heading variant="h2">{title}</Heading>}
        {children}
      </div>
      {Footer && <div className={footer()}>{Footer}</div>}
    </section>
  );
}
