import { X } from 'lucide-react';
import { cn } from '~/lib/utils';
import { Button } from './Button';
import { useTranslations } from 'next-intl';

type CloseButtonProps = {
  className?: string;
} & React.ComponentProps<typeof Button>;

export default function CloseButton(props: CloseButtonProps) {
  const { className, ...rest } = props;
  const t = useTranslations('Generic');
  return (
    <Button
      {...rest}
      title={t('close')}
      variant="link"
      size="xs"
      className={cn(
        'absolute top-2 items-center justify-center rounded-full ltr:right-2 rtl:left-2',
        className,
      )}
    >
      <X />
    </Button>
  );
}
