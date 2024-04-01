import { db } from '@/prisma';
import Image from 'next/image';

export default async function List() {
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
    <div className='grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {topPokemons.map((pokemon) => (
        <div
          key={pokemon.id}
          className='flex flex-col items-center rounded-lg border p-4 shadow-sm'
        >
          <Image
            width={100}
            height={100}
            src={pokemon.image}
            alt={pokemon.name}
            className='mb-2'
          />
          <h2 className='text-lg font-medium'>{pokemon.name}</h2>
          <span className='text-sm text-gray-600'>
            Votes: {pokemon.votes.length}
          </span>
        </div>
      ))}
    </div>
  );
}
