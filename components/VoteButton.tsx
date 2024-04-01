'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { voteOnPokemon } from '@/app/actions';
import { useRouter } from 'next/navigation';

const successMessages = [
  'Great choice!',
  'Nice one!',
  'Good pick!',
  "You've got good taste!",
  'Pokémon Master!',
];

export default function VoteButton({ pokemonId }: { pokemonId: number }) {
  const router = useRouter();

  const [buttonState, setButtonState] = useState({
    text: 'Vote',
    disabled: false,
    style: '',
  });

  const vote = async () => {
    try {
      setButtonState({
        text: successMessages[
          Math.floor(Math.random() * successMessages.length)
        ],
        disabled: true,
        style: 'bg-green-500 hover:bg-green-700',
      });

      await voteOnPokemon(pokemonId);
      router.refresh();
    } catch (error) {
      setButtonState({
        text: 'Oops, something went wrong!',
        disabled: true,
        style: 'bg-red-500 hover:bg-red-700',
      });

      console.error(error);

      setTimeout(() => {
        setButtonState({
          text: 'Vote',
          disabled: false,
          style: '',
        });
      }, 3000);
    }
  };

  return (
    <Button
      name='vote'
      value={pokemonId}
      className={`mt-3 rounded px-4 py-1 sm:mt-4 sm:px-6 sm:py-2 ${buttonState.style}`}
      onClick={vote}
      disabled={buttonState.disabled}
    >
      {buttonState.text}
    </Button>
  );
}
