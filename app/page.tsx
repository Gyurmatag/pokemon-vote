import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/utils/authOptions';

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
