import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from '@radix-ui/react-label';
import { useMutation } from 'convex/react';
import { api } from '~/convex/_generated/api';
import { useState } from 'react';

export function CreateProject({ organizationId }: { organizationId: string }) {
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const createProject = useMutation(api.projects.create);

  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant='outline'>+ Create Project</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>Create a new project.</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void createProject({
              organizationId: organizationId,
              name: projectName,
              description: projectDescription,
            });

            setOpen(false);
          }}
        >
          <Label>Project Name</Label>
          <Input
            placeholder='Project Name'
            className='mb-4'
            onChange={(e) => setProjectName(e.target.value)}
          />
          <Label>Project Description</Label>
          <Input
            placeholder='Project Description'
            className='mb-4'
            onChange={(e) => setProjectDescription(e.target.value)}
          />
          <Button type='submit'>Create</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
