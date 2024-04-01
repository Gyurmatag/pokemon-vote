import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import Link from 'next/link';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default async function NavMenu() {
  const session = await getServerSession(authOptions);

  return (
    <header className='container flex items-center justify-between px-6 py-4'>
      <div className='flex items-center space-x-3'>
        <div className='p-2'>
          <Link
            className='text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl'
            href='/'
          >
            <Image
              src='https://pngimg.com/d/pokemon_PNG13.png'
              width={45}
              height={45}
              alt='pokemon-vote-logo'
            ></Image>
          </Link>
        </div>
      </div>
      <nav className='flex items-center justify-center space-x-7'>
        <Link href='/top-10'>Top 10</Link>
        <Avatar>
          <AvatarImage
            src={session!.user!.image || ''}
            alt='User Profile Picture'
          />
          <AvatarFallback>
            <button className='h-9 w-9 rounded-full bg-gradient-to-r from-green-500 to-blue-500'></button>
          </AvatarFallback>
        </Avatar>
      </nav>
    </header>
  );
}
