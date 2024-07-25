import { getUserStudies } from '~/server/queries/studies';
import StudySwitcherClient from './StudySwitcherClient';

export default async function StudySwitcher() {
  const studies = await getUserStudies();

  console.log('studies', studies);

  return <StudySwitcherClient studies={studies} />;
}
