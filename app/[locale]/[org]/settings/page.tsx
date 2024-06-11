import { getTranslations } from 'next-intl/server';
import { routes } from '~/lib/routes';

type OrgSettingPageProps = {
  // ✅ Never assume the types of your params before validation
  params?: unknown;
};

export default async function OrgSettingPage({ params }: OrgSettingPageProps) {
  const { org } = routes.orgSettings.$parseParams(params);
  const t = await getTranslations('OrgSettingPage');

  return (
    <div className="flex flex-col p-12">
      <div className="text-4xl">{t('title')}</div>
      <div>
        {t('description')} {org}
      </div>
    </div>
  );
}
