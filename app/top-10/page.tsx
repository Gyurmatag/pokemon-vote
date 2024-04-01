import { db } from '@/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import { redirect } from 'next/navigation';
import Image from 'next/image';

export default async function Top10() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  const topPokemons = await db.pokemon.findMany({
    take: 10,
    where: {
      votes: {
        some: {},
      },
    },
    orderBy: {
      votes: {
        _count: 'desc',
      },
    },
    include: {
      votes: {
        select: { id: true },
      },
    },
  });

  return (
    <main className='flex min-h-screen flex-col items-center px-24 py-10'>
      <h1>The Top 10 Pokémon</h1>
      <ul>
        {topPokemons.map((pokemon) => (
          <li key={pokemon.id}>
            <Image
              width={50}
              height={50}
              src={pokemon.image}
              alt={pokemon.name}
            />
            <h2>{pokemon.name}</h2>
          </li>
        ))}
      </ul>
    </main>
  );
}
