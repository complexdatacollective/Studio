import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';
import { useRouter, useParams } from 'next/navigation';

import { Doc } from '../convex/_generated/dataModel';

export function ProjectCard({ project }: { project: Doc<'projects'> }) {
  const router = useRouter();

  const params = useParams();

  const organizationSlug = params.organization;

  const handleClick = () => {
    router.push(`/${organizationSlug}/${project.slug}`);
  };
  return (
    <Card onClick={handleClick}>
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
    </Card>
  );
}
