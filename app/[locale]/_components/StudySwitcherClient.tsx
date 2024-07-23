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

export default function StudySwitcherClient({ studies }: { studies: Study[] }) {
  const router = useRouter();
  const { study } = useParams();

  function handleStudyChange(value: Study['slug']) {
    router.push(pathname, { study: value });
  }

  console.log('current study', study);

  return (
    <Select onValueChange={handleStudyChange}>
      <SelectTrigger
        className={`hover:bg-stone-100 w-[200px] space-x-1 bg-white text-xs sm:text-sm`}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="dark:bg-slate-700 bg-white">
        {studies.map((study) => (
          <SelectItem key={study.id} value={study.slug}>
            {study.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
