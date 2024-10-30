'use client';

import { type Study } from '@prisma/client';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { route } from 'nextjs-routes';
import { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/select';

export default function StudySwitcherClient({ studies }: { studies: Study[] }) {
  const t = useTranslations('Components.StudySwitcher');
  const params = useParams();

  const router = useRouter();
  const [selectedStudy, setSelectedStudy] = useState<Study['slug']>(
    params?.study as string,
  );

  function handleStudyChange(value: string) {
    router.push(
      route({
        pathname: '/[study]',
        query: { study: value },
      }),
    );
  }

  useEffect(() => {
    setSelectedStudy(params?.study as string);
  }, [params?.study]);

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
