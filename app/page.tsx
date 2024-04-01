import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';
import { authOptions } from '@/utils/authOptions';
import PokemonVoteForm from '@/components/PokemonVoteForm';
import { PokemonVoteFormSkeletonLoader } from '@/components/skeleton-loaders/PokemonVoteFormSkeletonLoader';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <main className='flex min-h-screen flex-col items-center px-4 py-10 md:px-24'>
      <h1 className='text-center text-lg font-semibold md:text-3xl'>
        Which Pokémon Do You Like More?
      </h1>
      <Suspense fallback={<PokemonVoteFormSkeletonLoader />}>
        <PokemonVoteForm />
      </Suspense>
    </main>
  );
}
