import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from '@radix-ui/react-label';
import { useMutation } from 'convex/react';
import { api } from '~/convex/_generated/api';
import { useState } from 'react';
import { useQueryWithAuth } from '@convex-dev/convex-lucia-auth/react';
import { useParams } from 'next/navigation';

export function CreateProject() {
  const createProject = useMutation(api.projects.create);
  const [projectName, setProjectName] = useState('');
  const user = useQueryWithAuth(api.users.get, {});
  const [open, setOpen] = useState(false);

  if (!user) {
    return null;
  }

  const organization = {
    id: 'organizationId',
    name: 'organizationName',
  };

  const params = useParams();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant='ghost'>
          <Plus className='w-4' /> Create New Project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Create a new project in {organization.name}.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void createProject({
              name: projectName,
              organization: params.organization,
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
          <Button type='submit'>Create</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
