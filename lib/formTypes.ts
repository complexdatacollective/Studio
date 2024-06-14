import { type FieldError } from 'react-hook-form';

export type FormFieldProps = {
  type: string;
  placeholder: string;
  name: string;
  defaultValue?: string;
  error: FieldError | undefined;
};
