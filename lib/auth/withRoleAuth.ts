import { getServerSession } from '~/lib/auth';
import { db } from '~/lib/db';

export function withRoleAuth<T>(
  action: (
    formData: FormData | null,
    studyId: string,
    key: string | null,
  ) => Promise<T>,
) {
  return async (
    formData: FormData | null,
    studyId: string,
    key: string | null,
  ) => {
    const session = await getServerSession();
    if (!session) {
      return {
        error: 'Not authenticated',
      };
    }

    const study = db.study.findFirst({
      where: {
        publicId: studyId,
      },
    });

    // Study doesn't exist
    if (!study) {
      return {
        error: 'Study not found',
      };
    }

    // Check if user is in study

    return action(formData, site, key);
  };
}
