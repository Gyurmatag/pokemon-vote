import { Pokemon } from '@prisma/client';

export default async function Top10() {
  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <h1>The Top 10 Pokémon</h1>
    </main>
  );
}
