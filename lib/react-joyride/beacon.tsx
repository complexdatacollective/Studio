import type { BeaconProps } from 'react-joyride';

export default function Beacon({ ...props }: BeaconProps) {
  return (
    <button
      {...props}
      className="h-6 w-6 animate-ping rounded-full bg-accent"
    />
  );
}
