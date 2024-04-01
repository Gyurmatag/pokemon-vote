import { db } from '@/prisma';

export default async function Top10() {
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
    <main className='flex min-h-screen flex-col items-center p-24'>
      <h1>The Top 10 Pokémon</h1>
      <ul>
        {topPokemons.map((pokemon) => (
          <li key={pokemon.id}>
            <img src={pokemon.image} alt={pokemon.name} />
            <h2>{pokemon.name}</h2>
          </li>
        ))}
      </ul>
    </main>
  );
}
