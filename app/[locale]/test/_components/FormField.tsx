import type { FormFieldProps } from '~/lib/formTypes';

const FormField = ({
  type,
  placeholder,
  name,
  error,
  defaultValue,
}: FormFieldProps) => (
  <>
    <input
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue}
      name={name}
    />
    {error && <div className="text-red-500">{error.message}</div>}
  </>
);

export default FormField;
