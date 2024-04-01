'use client';

import { useToast } from '@/components/ui/use-toast';
import { AlertDialogAction } from '@/components/ui/alert-dialog';
import { deleteAllUserVotes } from '@/app/actions';

export function ResetVotes() {
  const { toast } = useToast();

  const deleteUserVotes = async () => {
    await deleteAllUserVotes();
    toast({
      description: 'Your votes has been deleted.',
    });
  };

  return (
    <AlertDialogAction onClick={deleteUserVotes}>Continue</AlertDialogAction>
  );
}
