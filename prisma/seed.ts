import { db } from '@/prisma/index';
import { Form, Move, Stat } from '@/types';

async function main() {
  const basicPokemonData = await fetchBasicPokemonData();
  for (const basicData of basicPokemonData) {
    const detailedData = await fetchPokemonDetails(basicData.url);

    await db.pokemon.create({
      data: {
        name: detailedData.name,
        image: detailedData.sprites.front_default,
        height: detailedData.height,
        weight: detailedData.weight,
        forms: {
          create: detailedData.forms.map((form: Form) => ({ name: form.name })),
        },
        moves: {
          create: detailedData.moves.map((move: Move) => ({
            name: move.name,
          })),
        },
        stats: {
          create: detailedData.stats.map((stat: Stat) => ({
            name: stat.stat.name,
            value: stat.base_stat,
          })),
        },
      },
    });
  }
}

async function fetchBasicPokemonData() {
  const url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=100';
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Failed to fetch basic Pokemon data:', error);
    return [];
  }
}

async function fetchPokemonDetails(url: string) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch Pokemon details from ${url}:`, error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
