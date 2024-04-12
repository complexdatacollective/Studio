import { SettingsSection } from './SettingsSection';
import { Typography } from './Typography';

// temporary components to demonstrate the roles
export function OrgRoles() {
  return (
    <SettingsSection title='Organization Member Role Descriptions'>
      <Typography variant='body'>
        admin: R/W projects, R/W org settings.
      </Typography>
      <Typography variant='body'>Member: R projects.</Typography>
    </SettingsSection>
  );
}

export function ProjectRoles() {
  return (
    <SettingsSection title='Project Member Role Descriptions'>
      <Typography variant='h2'>Project Member Role Descriptions</Typography>
      <Typography variant='body'>
        admin: R/W project data, R/W project settings.
      </Typography>
      <Typography variant='body'>
        member: R project data, R project settings.
      </Typography>
    </SettingsSection>
  );
}
