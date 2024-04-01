## Pokémon Vote

To run the application in your local machine please install the dependencies:
```bash
npm run install
```
If you want to use your database and env variables, add the appropriate env variables from `.env.example` in an `.env` file in the root level!
If not, just use the .env file that I provided with my secrets!

then please run the dev server:

```bash
npm run dev
```

If you are using your own database please make sure to run the appropriate prisma commands and seeding:

```bash
npm run prisma-generate
npm run prisma-migrate-dev
npm run seed
```
