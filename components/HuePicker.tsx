// Component for selecting a hue using a range slider (0-360)
export default function HuePicker({
  step = 10,
  value,
  onChange,
}: {
  step: number
  value: number;
  onChange: (hue: number) => void;
}) {
  return (
    <div className="flex items-center">
      <label htmlFor="hue-slider" className="mr-2">
        Hue
      </label>
      <input
        id="hue-slider"
        type="range"
        min={0}
        max={360}
        step={step}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        className="w-48"
      />
      <span className="ml-2">{value}</span>
    </div>
  );
}