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
  const { options, placeholder, ...rest } = props;
  return (
    <Select {...rest}>
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
