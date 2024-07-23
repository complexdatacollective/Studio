import { getUserStudies } from '~/server/queries/studies';
import StudySwitcherClient from './StudySwitcherClient';

export default async function StudySwitcher() {
  const studies = await getUserStudies();

  return <StudySwitcherClient studies={studies} />;
}
