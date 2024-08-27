import { useState } from 'react';

export default function useToggleState(
  initialValue = false,
): [boolean, () => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = () => {
    setValue(!value);
  };

  return [value, toggle];
}
