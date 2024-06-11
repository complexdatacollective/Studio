import { cn } from '~/lib/utils';
import { cardClasses } from '../ui/Card';

const Section = ({
  children,
  classNames,
}: {
  children: React.ReactNode;
  classNames?: string;
}) => (
  <section className={cn(cardClasses, 'p-6', classNames)}>{children}</section>
);

export default Section;
