import type { ComponentProps, ReactNode } from 'react';
import { cn } from '~/lib/utils';

export type FormProps = {
  children: ReactNode;
  className?: string;
} & ComponentProps<'form'>;

export default function Form({ children, className, ...props }: FormProps) {
  return (
    <form className={cn('flex w-full flex-col gap-3', className)} {...props}>
      {children}
    </form>
  );
}

export type FormFooterProps = {
  primaryAction?: ReactNode;
  metaArea?: ReactNode;
  secondaryAction?: ReactNode;
};

/**
 * Aim is to automatically position primary action on the "right" (LTR dependant), and secondary action on the "left".
 * Each group of actions
 * @returns
 */
function Footer({ primaryAction, secondaryAction, metaArea }: FormFooterProps) {
  const childClasses = (hasSingleChild: boolean) =>
    cn(
      'flex justify-center gap-2 items-center flex-col sm:flex-row',
      hasSingleChild && 'w-full sm:w-auto',
    );

  return (
    <div
      className={cn(
        'mt-3 flex flex-col items-center justify-end gap-3 sm:flex-row sm:gap-10',
        primaryAction && secondaryAction && 'justify-between',
      )}
    >
      {secondaryAction && (
        <div className={childClasses(!Array.isArray(secondaryAction))}>
          {secondaryAction}
        </div>
      )}
      {metaArea && <div className="flex-1">{metaArea}</div>}
      {primaryAction && (
        <div className={childClasses(!Array.isArray(primaryAction))}>
          {primaryAction}
        </div>
      )}
    </div>
  );
}

Form.Footer = Footer;
