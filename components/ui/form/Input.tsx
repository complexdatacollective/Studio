import * as React from 'react';
import { Label } from './Label';
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

export const inputClasses = cn(
  'flex h-12 w-full rounded border bg-input px-6 text-sm',
  'disabled:cursor-not-allowed disabled:opacity-50',
  'placeholder:text-muted-foreground',
  'file:border-0 file:bg-transparent file:text-sm file:font-medium',
  'focus-visible:ring-ring ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
);

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
      <div className={cn('relative grid items-center gap-2', className)}>
        {label && (
          <Label htmlFor={id} required={props.required}>
            {label}
          </Label>
        )}
        {hint && (
          <span className="text-sm leading-5 text-muted-foreground">
            {hint}
          </span>
        )}
        <div className="relative flex items-center justify-end">
          {leftAdornment && (
            <div className="absolute left-4">{leftAdornment}</div>
          )}
          <input
            id={id}
            type={type}
            className={cn(
              inputClasses,
              !!leftAdornment && 'pl-12',
              !!rightAdornment && 'pr-12',
              !!error && 'border-destructive',
              inputClassName,
            )}
            ref={ref}
            {...props}
          />
          {rightAdornment && (
            <div className="absolute right-4">{rightAdornment}</div>
          )}
        </div>
        {error && (
          <span role="alert" className="text-sm text-destructive">
            {error}
          </span>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
