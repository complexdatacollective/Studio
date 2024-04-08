import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

export function ProjectCard({ projectName }: { projectName: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{projectName}</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
    </Card>
  );
}
