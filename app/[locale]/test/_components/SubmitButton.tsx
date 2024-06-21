'use client';

import { Button } from '~/components/ui/Button';
import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';

export default function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit">
      {pending && <Loader2 className="animate-spin" />}
      Submit
    </Button>
  );
}
