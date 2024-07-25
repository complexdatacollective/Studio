'use client';

import { type Study } from '@prisma/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { useParams } from 'next/navigation';
import { useRouter } from '~/lib/localisation/navigation';
import { useTranslations } from 'next-intl';

export default function StudySwitcherClient({ studies }: { studies: Study[] }) {
  const t = useTranslations('StudySwitcher');
  const router = useRouter();
  const { study } = useParams();

  function handleStudyChange(value: Study['slug']) {
    router.push(pathname, { study: value });
  }

  console.log('current study', study);

  return (
    <Select onValueChange={handleStudyChange}>
      <SelectTrigger>
        <SelectValue placeholder={t('placeholder')} />
      </SelectTrigger>
      <SelectContent>
        {studies.map((study) => (
          <SelectItem key={study.id} value={study.slug}>
            {study.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
