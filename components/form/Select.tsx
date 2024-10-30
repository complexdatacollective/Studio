import type * as SelectPrimitive from '@radix-ui/react-select';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/select';

type SimpleSelectProps = {
  options: { label: string; value: string }[];
  placeholder?: string;
} & SelectPrimitive.SelectProps &
  React.SelectHTMLAttributes<HTMLSelectElement>;

export default function SimpleSelect(props: SimpleSelectProps) {
  const { options, placeholder, value, ...rest } = props;
  return (
    <Select {...rest} defaultValue={value}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map(({ label, value }) => (
          <SelectItem key={value} value={value}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
