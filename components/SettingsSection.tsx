import { Typography } from './Typography';

export function SettingsSection({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className='w-2/3 border bg-secondary p-6'>
      <Typography variant='h2'>{title}</Typography>
      {children}
    </div>
  );
}
