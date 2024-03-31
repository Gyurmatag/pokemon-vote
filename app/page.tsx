import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/utils/authOptions';
import { Pokemon } from '@prisma/client';
import { db } from '@/prisma';
import { voteOnPokemon } from '@/app/actions';
import { revalidatePath } from 'next/cache';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  const totalPokemon = await db.pokemon.count();

  const randomOffset = Math.floor(Math.random() * (totalPokemon - 2));

  const pokemons = await db.pokemon.findMany({
    take: 2,
    skip: randomOffset,
  });

  const vote = async (formData: FormData) => {
    'use server';

    const votedPokemonId = formData.get('vote');
    if (votedPokemonId) {
      await voteOnPokemon(formData);
      revalidatePath('/');
      redirect('/');
    }
  };

  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <h1>Which Pokémon Do You Like More?</h1>
      <form action={vote} className='flex'>
        {pokemons.map((pokemon: Pokemon) => (
          <button
            key={pokemon.id}
            name='vote'
            value={pokemon.id}
            className='pokemon'
          >
            <h2>{pokemon.name}</h2>
            <img src={pokemon.image} alt={pokemon.name} />
          </button>
        ))}
      </form>
    </main>
  );
}
