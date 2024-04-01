'use client';

import { Button } from '@/components/ui/button';
import { voteOnPokemon } from '@/app/actions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export default function VoteButton({ pokemonId }: { pokemonId: number }) {
  const vote = async () => {
    await voteOnPokemon(pokemonId);
    revalidatePath('/');
    redirect('/');
  };

  return (
    <Button
      name='vote'
      value={pokemonId}
      className='mt-3 rounded px-4 py-1 sm:mt-4 sm:px-6 sm:py-2'
      onClick={vote}
    >
      Vote
    </Button>
  );
}
