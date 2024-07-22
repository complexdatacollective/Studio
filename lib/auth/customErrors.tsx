export const createError = (code: string, message: string) => ({
  code,
  message,
});

export const NoSessionError = createError('NO_SESSION', 'No session found');
export const UserNotFoundError = createError(
  'USER_NOT_FOUND',
  'User not found in study',
);
export const UserRoleError = createError(
  'USER_ROLE_ERROR',
  'User does not have the required role',
);
export const PublicStudyIdRequiredError = createError(
  'PUBLIC_STUDY_ID_REQUIRED',
  'publicStudyId is required when requireRoles is set',
);
