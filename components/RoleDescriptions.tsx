import { SettingsSection } from './SettingsSection';
import { Typography } from './Typography';

// temporary components to demonstrate the roles
export function OrgRoles() {
  return (
    <SettingsSection title='Organization Member Role Descriptions'>
      <Typography variant='body'>
        Administrator: R/W projects, R/W org settings.
      </Typography>
      <Typography variant='body'>
        Member: R projects, R org settings.
      </Typography>
    </SettingsSection>
  );
}

export function ProjectRoles() {
  return (
    <SettingsSection title='Project Member Role Descriptions'>
      <Typography variant='h2'>Project Member Role Descriptions</Typography>
      <Typography variant='body'>
        Administrator: R/W project data, R/W project settings.
      </Typography>
      <Typography variant='body'>
        Member: R project data, R project settings.
      </Typography>
    </SettingsSection>
  );
}
