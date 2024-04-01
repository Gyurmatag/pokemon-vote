import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/utils/authOptions';
import { Form, Move, Pokemon, Stat } from '@prisma/client';
import { db } from '@/prisma';
import { voteOnPokemon } from '@/app/actions';
import { revalidatePath } from 'next/cache';
import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Heart, Zap, Shield, Eye, Wind, Star } from 'lucide-react';

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

  function IconForStat(name) {
    console.log(name);
    switch (name.name) {
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
    <main className='flex min-h-screen flex-col items-center p-24'>
      <h1 className='text-lg font-semibold'>Which Pokémon Do You Like More?</h1>
      <form action={vote} className='flex w-full justify-center'>
        {pokemons.map(
          (
            pokemon: Pokemon & { forms: Form[]; moves: Move[]; stats: Stat[] }
          ) => (
            <div
              key={pokemon.id}
              className='m-4 flex h-[500px] w-1/3 flex-col rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800'
            >
              <div className='flex flex-col items-center p-4 sm:p-6'>
                <Image
                  width={120}
                  height={120}
                  src={pokemon.image}
                  alt={pokemon.name}
                  className='mb-3 h-28 w-28 rounded-full shadow-lg'
                />
                <h5 className='mb-2 text-xl font-medium text-gray-900 dark:text-white'>
                  {pokemon.name}
                </h5>
                <span className='text-sm text-gray-500 dark:text-gray-400'>
                  Height: {pokemon.height} dm
                </span>
                <span className='text-sm text-gray-500 dark:text-gray-400'>
                  Weight: {pokemon.weight} hg
                </span>
                <Button
                  name='vote'
                  value={pokemon.id}
                  className='mt-4 rounded px-6 py-2'
                >
                  Vote
                </Button>
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
    </main>
  );
}
