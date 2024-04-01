import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/utils/authOptions';
import { Form, Move, Pokemon, Stat } from '@prisma/client';
import { db } from '@/prisma';
import { voteOnPokemon } from '@/app/actions';
import { revalidatePath } from 'next/cache';
import Image from 'next/image';

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
    include: {
      forms: true,
      moves: true,
      stats: true,
    },
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
        {pokemons.map(
          (
            pokemon: Pokemon & { forms: Form[]; moves: Move[]; stats: Stat[] }
          ) => (
            <div key={pokemon.id} className='pokemon'>
              <button name='vote' value={pokemon.id} className='pokemon-btn'>
                <h2>{pokemon.name}</h2>
                <Image
                  width={100}
                  height={100}
                  src={pokemon.image}
                  alt={pokemon.name}
                />
                <p>Height: {pokemon.height}</p>
                <p>Weight: {pokemon.weight}</p>
              </button>
              <div>
                <h3>Forms</h3>
                <ul>
                  {pokemon.forms.map((form) => (
                    <li key={form.id}>{form.name}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Moves</h3>
                <ul>
                  {pokemon.moves.map((move) => (
                    <li key={move.id}>{move.name}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Stats</h3>
                <ul>
                  {pokemon.stats.map((stat) => (
                    <li key={stat.id}>
                      {stat.name}: {stat.value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        )}
      </form>
    </main>
  );
}
