import { Form, Move, Pokemon, Stat } from '@prisma/client';
import { db } from '@/prisma';
import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Heart, Zap, Shield, Eye, Wind, Star } from 'lucide-react';
import VoteButton from '@/components/VoteButton';

export default async function PokemonVoteForm() {
  async function pickRandomPokemons(count: number) {
    const itemCount = await db.pokemon.count();
    const maxSkip = Math.max(0, itemCount - count);
    const skip = Math.floor(Math.random() * maxSkip);

    const orderByFields = ['id', 'name', 'height', 'weight'];
    const orderBy =
      orderByFields[Math.floor(Math.random() * orderByFields.length)];
    const orderDir = Math.random() < 0.5 ? 'asc' : 'desc'; // Randomly choose sort order

    return db.pokemon.findMany({
      take: count,
      skip,
      orderBy: { [orderBy]: orderDir },
      include: {
        forms: true,
        moves: true,
        stats: true,
      },
    });
  }
  const pokemons = await pickRandomPokemons(2);

  function IconForStat({ name }: { name: string }) {
    switch (name) {
      case 'hp':
        return <Heart className='h-5 w-5 text-red-500' />;
      case 'attack':
        return <Zap className='h-5 w-5 text-yellow-500' />;
      case 'defense':
        return <Shield className='h-5 w-5 text-green-500' />;
      case 'special-attack':
        return <Eye className='h-5 w-5 text-blue-500' />;
      case 'special-defense':
        return <Star className='h-5 w-5 text-purple-500' />;
      case 'speed':
        return <Wind className='h-5 w-5 text-orange-500' />;
      default:
        return <Shield className='h-5 w-5 text-gray-500' />;
    }
  }

  return (
    <form className='flex w-full flex-wrap justify-center'>
      {pokemons.map(
        (
          pokemon: Pokemon & { forms: Form[]; moves: Move[]; stats: Stat[] }
        ) => (
          <div
            key={pokemon.id}
            className='m-4 flex h-full w-full flex-col rounded-lg border border-gray-200 shadow-md dark:border-gray-700 dark:bg-gray-800 md:w-1/3'
          >
            <div className='flex flex-col items-center p-3 sm:p-4 md:p-6'>
              <Image
                width={100}
                height={100}
                src={pokemon.image}
                alt={pokemon.name}
                className='mb-2 h-24 w-24 rounded-full shadow-lg sm:h-28 sm:w-28 md:mb-3 md:h-28 md:w-28'
              />
              <h5 className='mb-1 text-lg font-medium text-gray-900 dark:text-white sm:text-xl md:mb-2'>
                {pokemon.name}
              </h5>
              <span className='text-xs text-gray-500 dark:text-gray-400 sm:text-sm'>
                Height: {pokemon.height} cm
              </span>
              <span className='text-xs text-gray-500 dark:text-gray-400 sm:text-sm'>
                Weight: {pokemon.weight} kg
              </span>
              <VoteButton pokemonId={pokemon.id} />
            </div>
            <div className='border-t border-gray-200 dark:border-gray-700'>
              <h3 className='px-5 pb-2 pt-4 text-lg font-semibold text-gray-900 dark:text-white'>
                Stats
              </h3>
              <ul className='grid grid-cols-2 gap-2 px-5 pb-4'>
                {pokemon.stats.map((stat) => (
                  <li
                    key={stat.id}
                    className='flex items-center text-sm text-gray-700 dark:text-gray-400'
                  >
                    <IconForStat name={stat.name} />
                    <span className='ml-2'>
                      {stat.name}: {stat.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <Accordion type='single' collapsible className='w-full'>
              <AccordionItem value='moves'>
                <AccordionTrigger className='bg-gray-100 px-5 py-4 text-left text-lg font-semibold text-gray-900 dark:bg-gray-700 dark:text-white'>
                  Moves
                </AccordionTrigger>
                <AccordionContent className='px-5 py-4'>
                  <ul>
                    {pokemon.moves.map((move) => (
                      <li
                        key={move.id}
                        className='text-sm text-gray-700 dark:text-gray-400'
                      >
                        {move.name}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )
      )}
    </form>
  );
}
