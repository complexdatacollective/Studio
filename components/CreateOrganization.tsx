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
import { api } from '~/convex/_generated/api';
import { useState } from 'react';
import { useMutation } from 'convex/react';

export function CreateOrganization() {
  const createOrg = useMutation(api.organizations.create);
  const [orgName, setOrgName] = useState('');
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant='ghost'>
          <Plus className='w-4' /> Create New Organization
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Organization</DialogTitle>
          <DialogDescription>
            Create a new organization to manage your projects and teams.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void createOrg({
              name: orgName,
            });

            setOpen(false);
          }}
        >
          <Label>Organization Name</Label>
          <Input
            placeholder='Organization Name'
            className='mb-4'
            onChange={(e) => setOrgName(e.target.value)}
          />
          <Button type='submit'>Create</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
