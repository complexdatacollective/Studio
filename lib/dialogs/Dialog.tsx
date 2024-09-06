import Surface from '~/components/layout/Surface';
import { cn } from '../utils';
import Paragraph from '~/components/typography/Paragraph';
import CloseButton from '~/components/ui/CloseButton';
import Heading from '~/components/typography/Heading';
import React from 'react';

export type RenderDialogContent<T> = (
  returnValue: (value: T) => void,
) => React.ReactNode;

export type DialogProps = {
  id: string;
  title: string;
  description?: string;
  ref?: React.RefObject<HTMLDialogElement>;
  closeDialog: (value: unknown) => void;
  renderContent?: RenderDialogContent<unknown>;
} & React.DialogHTMLAttributes<HTMLDialogElement>;

/**
 * Native HTML Dialog
 *
 * Implementation Notes:
 *
 * - The reason this component has an inner Surface component is that the native
 *   dialog uses margin for centering, so we cannot add margin for small screens
 * - `allow-discrete` is implemented in the tailwind config, and is required for
 *   the dialog to be able to be animated correctly.
 * - There's no way I can think of to use framer-motion for animation here, as
 *   the animation state is linked to the `open` attribute of the dialog, which
 *   can't be read from the dialog itself (although _can_ be read by mutation
 *   observer... but that's a bit much)
 */
export const Dialog = ({
  id,
  renderContent,
  title,
  description,
  ref,
  closeDialog,
  ...rest
}: DialogProps) => {
  return (
    <dialog
      ref={ref}
      aria-labelledby={`${id}-title`}
      aria-describedby={description ? `${id}-description` : undefined}
      onClose={() => closeDialog(null)} // Needed so that closing via keyboard still returns a value
      className={cn(
        'bg-transparent',
        'allow-discrete -translate-y-6 opacity-0 transition-all duration-300 ease-out',
        'open:from:-translate-y-6 open:from:backdrop:bg-overlay/0 open:translate-y-0 open:opacity-100 open:backdrop:bg-overlay/70',
        'backdrop:bg-overlay/0 backdrop:backdrop-blur-xs backdrop:transition-all backdrop:delay-100 backdrop:duration-300 backdrop:ease-out open:backdrop:delay-0',
      )}
      {...rest}
    >
      <Surface
        level={0}
        className={cn(
          'bg-surface-0 text-surface-0-foreground max-w-4xl rounded p-6',
          // Accent
          // 'border-b-4 border-accent [--primary:var(--accent)]',
        )}
      >
        <Heading variant="h2" id={`${id}-title`}>
          {title}
        </Heading>
        {description && (
          <Paragraph id={`${id}-description`}>{description}</Paragraph>
        )}
        {renderContent && renderContent(closeDialog)}
        <CloseButton onClick={() => closeDialog(null)} />
      </Surface>
    </dialog>
  );
};
