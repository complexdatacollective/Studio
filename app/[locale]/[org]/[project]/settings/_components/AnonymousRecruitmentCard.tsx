'use client';
import { Card, CardTitle, CardDescription } from '~/components/ui/Card';
import AllowAnonymousRecruitmentSwitch from './AllowAnonymousRecruitmentSwitch';
import { useTranslations } from 'next-intl';
import { getAnonymousRecruitmentStatus } from '~/server/actions/projects';
import { useMutationState, useQuery } from '@tanstack/react-query';

export default function AnonymousRecruitmentCard({
  projectSlug,
}: {
  projectSlug: string;
}) {
  const t = useTranslations('ProjectSettingsPage');

  const { data: allowAnonymousRecruitment } = useQuery({
    queryKey: ['allowAnonymousRecruitment', projectSlug],
    queryFn: () => getAnonymousRecruitmentStatus(projectSlug),
  });

  /*
  variables will be an Array, because there might be multiple mutations 
  running at the same time. 
  If we need a unique key for the items, we can also select 
  mutation.state.submittedAt.
  */

  const variables = useMutationState<unknown>({
    filters: { mutationKey: ['setAnonymousRecruitment'], status: 'pending' },
    select: (mutation) => mutation.state.variables,
  });

  const optimisticAllowAnonymousRecruitment =
    variables?.[0] ?? allowAnonymousRecruitment;

  return (
    <Card className="flex flex-row items-center justify-between p-6">
      <div className="flex flex-col">
        <CardTitle>{t('anonymousRecruitmentLabel')}</CardTitle>
        <CardDescription>
          {optimisticAllowAnonymousRecruitment
            ? t('anonymousRecruitmentEnabled')
            : t('anonymousRecruitmentDisabled')}
        </CardDescription>
      </div>
      <AllowAnonymousRecruitmentSwitch projectSlug={projectSlug} />
    </Card>
  );
}
