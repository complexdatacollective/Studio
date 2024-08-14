import {
  Select,
  SelectContent,
  SelectValue,
  SelectTrigger,
  SelectItem,
  type SelectProps,
} from '~/components/ui/select';

type SimpleSelectProps = {
  options: { label: string; value: string }[];
  placeholder?: string;
} & SelectProps;

export default function SimpleSelect(props: SimpleSelectProps) {
  const { options, placeholder, value, ...rest } = props;
  return (
    <Select {...rest}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} defaultValue={value} />
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
