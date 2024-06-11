'use server';
import { getAnonymousRecruitmentStatus } from '~/server/queries/projects';
import SwitchWithOptimisticUpdate from '~/components/SwitchWithOptimisticUpdate';
import { setAnonymousRecruitment } from '~/server/actions/projects';

const AnonymousRecruitmentSwitch = async ({
  projectSlug,
}: {
  projectSlug: string;
}) => {
  const allowAnonymousRecruitment =
    await getAnonymousRecruitmentStatus(projectSlug);

  return (
    <SwitchWithOptimisticUpdate
      initialValue={allowAnonymousRecruitment}
      name="allowAnonymousRecruitment"
      action={setAnonymousRecruitment.bind(null, projectSlug)}
    />
  );
};

export default AnonymousRecruitmentSwitch;
