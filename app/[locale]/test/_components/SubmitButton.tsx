'use client';

import { Button } from '~/components/ui/Button';
import { useFormStatus } from 'react-dom';

export default function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      Submit
    </Button>
  );
}
