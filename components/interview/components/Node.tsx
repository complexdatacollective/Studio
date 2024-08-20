import cn from 'classnames';

export default function Node({
  label,
  size = 'lg',
}: {
  label: string;
  size?: 'sm' | 'lg';
}) {
  const labelWithEllipsis =
    label.length < 22 ? label : `${label.substring(0, 18)}\u{AD}...`; // Add ellipsis for really long labels

  const labelClasses = cn(
    'whitespace-pre-line overflow-hidden text-center hyphens-auto text-wrap break-all px-6',
    size === 'sm' ? 'text-sm' : 'text-base',
  );

  const nodeSizeClasses = size === 'sm' ? 'h-28 w-28' : 'h-40 w-40';

  return (
    <div className={`relative inline-block ${nodeSizeClasses}`} title={label}>
      <svg
        viewBox="0 0 500 500"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-0 top-0 h-full w-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <circle cx="250" cy="270" r="200" className={`fill-black opacity-25`} />
        <circle cx="250" cy="250" r="250" className="fill-transparent" />
        <circle cx="250" cy="250" r="200" className={`fill-node-1`} />
        <path
          d="m50,250 a1,1 0 0,0 400,0"
          className={`fill-node-1`}
          transform="rotate(-35 250 250)"
        />
        <circle cx="250" cy="250" r="200" className="fill-transparent" />
      </svg>
      <div className="absolute flex h-full w-full items-center justify-center">
        <div className={labelClasses}>{labelWithEllipsis}</div>
      </div>
    </div>
  );
}
