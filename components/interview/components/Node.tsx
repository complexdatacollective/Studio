export default function Node({ type, label }: { type: string; label: string }) {
  // eventually get this color using type
  const color = 'mustard';
  const nodeFlashColor = `${color}-dark`;

  const labelWithEllipsis =
    label.length < 22 ? label : `${label.substring(0, 18)}\u{AD}...`; // Add ellipsis for really long labels

  const labelClasses = () => {
    const labelLength = label.length;
    return `len-${labelLength} whitespace-pre-line overflow-hidden text-center hyphens-auto text-lg text-wrap break-all px-6`;
  };

  return (
    <div className="relative inline-block h-28 w-28">
      <svg
        viewBox="0 0 500 500"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-0 top-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <circle cx="250" cy="270" r="200" className={`fill-black opacity-25`} />
        <circle cx="250" cy="250" r="250" className="fill-transparent" />
        <circle cx="250" cy="250" r="200" className={`fill-${color}`} />
        <path
          d="m50,250 a1,1 0 0,0 400,0"
          className={`fill-${nodeFlashColor}`}
          transform="rotate(-35 250 250)"
        />
        <circle cx="250" cy="250" r="200" className="fill-transparent" />
      </svg>
      <div className="absolute flex h-full w-full items-center justify-center">
        <div className={labelClasses()}>{labelWithEllipsis}</div>
      </div>
    </div>
  );
}