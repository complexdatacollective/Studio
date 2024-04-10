import { Doc } from '~/convex/_generated/dataModel';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export function ProjectCard({ project }: { project: Doc<'projects'> }) {
  const params = useParams();

  const organizationSlug = params.organization;

  return (
    <Link href={`/${organizationSlug}/${project.slug}`}>
      <Card className='hover:bg-secondary'>
        <CardHeader>
          <CardTitle>{project.name}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
