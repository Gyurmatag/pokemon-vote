import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/utils/authOptions';
import { Pokemon } from '@prisma/client';
import { db } from '@/prisma';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  const pokemons = await db.pokemon.findMany({
    take: 2,
    orderBy: {
      id: 'asc',
    },
  });

  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <h1>Which Pokémon Do You Like More?</h1>
      <div className='flex'>
        {pokemons.map((pokemon: Pokemon) => (
          <div key={pokemon.id} className='pokemon'>
            <h2>{pokemon.name}</h2>
            <img src={pokemon.image} alt={pokemon.name} />
          </div>
        ))}
      </div>
    </main>
  );
}
