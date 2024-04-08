import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '~/components/ui/select';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

export function OrganizationSwitcher() {
  return (
    <Select>
      <SelectTrigger className='w-64'>
        <SelectValue placeholder='Organization' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='light'>Light</SelectItem>
        <SelectItem value='dark'>Dark</SelectItem>
        <Button variant='ghost'>
          <Plus className='w-4' /> Create New Organization
        </Button>
      </SelectContent>
    </Select>
  );
}
