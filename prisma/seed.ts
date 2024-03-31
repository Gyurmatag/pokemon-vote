import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const basicPokemonData = await fetchBasicPokemonData();
    for (const basicData of basicPokemonData) {
        const detailedData = await fetchPokemonDetails(basicData.url);
        await prisma.pokemon.create({
            data: {
                name: detailedData.name,
                image: detailedData.sprites.front_default
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
        await prisma.$disconnect();
    });
