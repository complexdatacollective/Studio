'use client';

import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { Button } from '~/components/ui/Button';

export function SubmitButton({ children }: React.PropsWithChildren) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 animate-spin" />}
      {children}
    </Button>
  );
}
