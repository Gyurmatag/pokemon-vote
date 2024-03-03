import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1>This is the Pokemon Voting App Only for logged in users</h1>
    </main>
  );
}
