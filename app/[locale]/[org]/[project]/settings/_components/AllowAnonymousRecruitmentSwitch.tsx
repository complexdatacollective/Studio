import { getAnonymousRecruitmentStatus } from '~/server/actions/projects';
import SwitchWithOptimisticUpdate from '~/components/SwitchWithOptimisticUpdate';
import { setAnonymousRecruitment } from '~/server/actions/projects';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const AnonymousRecruitmentSwitch = ({
  projectSlug,
}: {
  projectSlug: string;
}) => {
  const { data: allowAnonymousRecruitment } = useQuery({
    queryKey: ['allowAnonymousRecruitment', projectSlug],
    queryFn: () => getAnonymousRecruitmentStatus(projectSlug),
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: setAnonymousRecruitment.bind(null, projectSlug),
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: ['allowAnonymousRecruitment', projectSlug],
      }),
    mutationKey: ['setAnonymousRecruitment'],
  });

  if (allowAnonymousRecruitment === undefined) {
    return null;
  }

  return (
    <SwitchWithOptimisticUpdate
      initialValue={allowAnonymousRecruitment}
      name="allowAnonymousRecruitment"
      mutation={mutate}
    />
  );
};

export default AnonymousRecruitmentSwitch;
