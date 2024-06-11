'use client';

import { Switch as SwitchUI } from '~/components/ui/switch';
import { useOptimistic, useTransition } from 'react';
import { type UseMutateFunction } from '@tanstack/react-query';

const SwitchWithOptimisticUpdate = ({
  initialValue,
  name,
  mutation,
}: {
  initialValue: boolean;
  name: string;
  mutation: UseMutateFunction<boolean, Error, boolean, unknown>;
}) => {
  const [isTransitioning, startTransition] = useTransition();
  const [optimisticIsActive, setOptimisticIsActive] = useOptimistic(
    initialValue,
    (_, newValue: boolean) => newValue,
  );

  const updateIsActive = (newValue: boolean) => {
    setOptimisticIsActive(newValue);
    mutation(newValue);
  };

  return (
    <SwitchUI
      name={name}
      checked={optimisticIsActive}
      onCheckedChange={(checked) =>
        startTransition(() => updateIsActive(checked))
      }
      disabled={isTransitioning}
    />
  );
};

export default SwitchWithOptimisticUpdate;
