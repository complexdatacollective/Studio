import { cn } from '~/lib/utils';

export type FormProps = {
  children: React.ReactNode;
  className?: string;
} & React.ComponentProps<'form'>;

export default function Form({ children, className, ...props }: FormProps) {
  return (
    <form className={cn('flex w-full flex-col gap-3', className)} {...props}>
      {children}
    </form>
  );
}

export type FormFooterProps = {
  primaryAction?: React.ReactNode;
  secondaryAction?: React.ReactNode;
};

// Place the primary action on the right and the secondary action on the left. If there is only one action, it will be placed on the right.
// If there are multuple orimary or secondary actions, they will be rendered together with a small gap.
function Footer({ primaryAction, secondaryAction }: FormFooterProps) {
  return (
    <div
      className={cn(
        'mt-3 flex flex-col items-center justify-end gap-4 sm:flex-row',
        primaryAction && secondaryAction && 'justify-between',
      )}
    >
      {secondaryAction && (
        <div className="flex w-full justify-center gap-2">
          {secondaryAction}
        </div>
      )}
      {primaryAction && (
        <div className="flex w-full justify-center gap-2">{primaryAction}</div>
      )}
    </div>
  );
}

Form.Footer = Footer;
