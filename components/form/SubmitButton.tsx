'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '~/components/ui/Button';

export default function SubmitButton({
  disabled,
  children,
}: {
  disabled: boolean;
  children?: React.ReactNode;
}) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending || disabled}>
      {children}
    </Button>
  );
}
