'use server';

import { db } from '@/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';

export async function voteOnPokemon(formData: FormData) {
  'use server';

  const session = await getServerSession(authOptions);

  const votedPokemonId = formData.get('vote');
  if (votedPokemonId) {
    await db.vote.create({
      data: {
        userId: session.user.id,
        pokemonId: Number(votedPokemonId),
      },
    });
  }
}

export async function deleteAllUserVotes() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error('User not authenticated');
  }

  await db.vote.deleteMany({
    where: {
      userId: session.user.id,
    },
  });
}
