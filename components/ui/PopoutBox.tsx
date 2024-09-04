import Heading from '~/components/typography/Heading';
import { type ReactNode } from 'react';
import { cn } from '~/lib/utils';
import Surface from '../layout/Surface';

export type PopoutBoxProps = {
  title?: string;
  children: ReactNode;
  icon?: ReactNode;
  iconClassName?: string;
  className?: string;
};

const PopoutBox = ({
  title,
  children,
  icon,
  className,
  iconClassName,
}: PopoutBoxProps) => {
  return (
    <Surface
      as="aside"
      level={0}
      className={cn(
        'rounded-lg relative mx-0 my-5 max-w-full px-8 py-6 text-base-sm',
        '@2xl/article:mx-8 @2xl/article:mt-10', // additional margin when icon is shown
        '@2xl/article:px-8 @2xl/article:py-6',
        className,
      )}
    >
      {icon && (
        <div
          className={cn(
            'hidden @2xl/article:flex', // use container query to show/hide
            'h-12 w-12 shrink-0 items-center justify-center rounded-full bg-foreground shadow-md',
            'absolute -left-6 -top-4',
            iconClassName,
          )}
        >
          {icon}
        </div>
      )}

      {title && (
        <Heading variant="h4" className="!mt-0">
          {title}
        </Heading>
      )}
      {children}
    </Surface>
  );
};

export default PopoutBox;
