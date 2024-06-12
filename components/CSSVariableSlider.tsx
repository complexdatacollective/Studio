'use client';

import { useState, useEffect, ChangeEventHandler, ChangeEvent } from 'react';
import { Input } from './ui/form/Input';

const CssVariableSlider = ({
  variableName,
  min = 0,
  max = 100,
}: {
  variableName: string;
  min: number;
  max: number;
}) => {
  const getInitialValue = () => {
    const computedStyle = getComputedStyle(document.documentElement);
    const value = computedStyle.getPropertyValue(variableName).trim();
    return value ? parseInt(value, 10) : 50;
  };

  const [value, setValue] = useState(getInitialValue);

  useEffect(() => {
    document.documentElement.style.setProperty(variableName, String(value));
  }, [value, variableName]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(Number(event.target.value));
  };

  return (
    <div>
      <Input
        label={variableName}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
      />
      {value}
    </div>
  );
};

export default CssVariableSlider;
