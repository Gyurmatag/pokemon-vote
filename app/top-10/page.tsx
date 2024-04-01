import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import { redirect } from 'next/navigation';
import List from '@/app/top-10/List';
import { Suspense } from 'react';
import { Top10PokemonSkeletonLoader } from '@/components/skeleton-loaders/Top10PokemonSkeletonLoader';

export default async function Top10() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <main className='flex min-h-screen flex-col items-center px-4 py-10 md:px-24'>
      <h1 className='mb-6 text-2xl font-semibold md:text-3xl'>
        The Top 10 Pokémon
      </h1>
      <Suspense fallback={<Top10PokemonSkeletonLoader />}>
        <List />
      </Suspense>
    </main>
  );
}
