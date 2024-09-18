'use client';

import { type Study } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

export default function StudySwitcherClient({ studies }: { studies: Study[] }) {
  const t = useTranslations('Components.StudySwitcher');
  const router = useRouter();
  const { study: currentStudy } = useParams();
  const [selectedStudy, setSelectedStudy] = useState<Study['slug']>(
    currentStudy as Study['slug'],
  );

  function handleStudyChange(value: Study['slug']) {
    router.push(value);
  }

  useEffect(() => {
    setSelectedStudy(currentStudy as Study['slug']);
  }, [currentStudy]);

  return (
    <Select onValueChange={handleStudyChange} value={selectedStudy}>
      <SelectTrigger>
        <SelectValue
          placeholder={t('Placeholder')}
          defaultValue={selectedStudy}
        />
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
