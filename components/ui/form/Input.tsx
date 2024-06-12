import * as React from 'react';
import { Label } from '~/components/ui/form/Label';
import { cn } from '~/lib/utils';

type InputProps = {
  inputClassName?: string;
  label?: string;
  hint?: React.ReactNode;
  id?: string;
  error?: string;
  leftAdornment?: React.ReactNode;
  rightAdornment?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      inputClassName,
      type,
      label,
      hint,
      rightAdornment,
      leftAdornment,
      error,
      ...props
    },
    ref,
  ) => {
    const id = props.id ?? props.name;
    return (
      <div className={cn('relative mt-4 grid items-center gap-2', className)}>
        {label && (
          <Label htmlFor={id} required={props.required}>
            {label}
          </Label>
        )}
        {hint && (
          <span className="text-muted-foreground text-sm leading-5">
            {hint}
          </span>
        )}
        <div className="relative flex items-center justify-end">
          {leftAdornment && (
            <div className="absolute left-2">{leftAdornment}</div>
          )}
          <input
            id={id}
            type={type}
            className={cn(
              'focus-visible:ring-ring border-border bg-input text-input-foreground ring-offset-background placeholder:text-muted-foreground flex h-10 w-full rounded-xl border py-2 px-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
              !!leftAdornment && 'pl-10',
              !!rightAdornment && 'pr-10',
              !!error && 'border-destructive',
              inputClassName,
            )}
            ref={ref}
            {...props}
          />
          {rightAdornment && (
            <div className="absolute right-2">{rightAdornment}</div>
          )}
        </div>
        {error && (
          <span role="alert" className="text-destructive text-sm">
            {error}
          </span>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
