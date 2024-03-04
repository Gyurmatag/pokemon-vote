import { getProviders } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { BsGoogle } from 'react-icons/bs';
import { BuiltInProviderType } from 'next-auth/providers/index';
import SignInButton from '@/app/auth/signin/SignInButton';
import { authOptions } from '@/utils/authOptions';

export default async function SignIn() {
  const providers = await getProviders();

  type ProviderIcons = {
    [key in BuiltInProviderType | string]: React.ReactNode;
  };

  const providerIcons: ProviderIcons = {
    google: <BsGoogle size='20' />,
  };

  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/');
  }

  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <div className='flex flex-col items-center justify-center space-y-6 border-b-2 py-6'>
        <div className='flex w-full items-center justify-center space-x-3 border-b-2 py-4'>
          <Link href='/'>
            <Image
              src='https://pngimg.com/d/pokemon_PNG13.png'
              width={50}
              height={50}
              alt='pokemon-vote-logo'
            ></Image>
          </Link>
        </div>
        <div className='text-center'>
          <h1 className='text-xl font-bold text-gray-900 dark:text-gray-100'>
            Sign in to Pokemon Vote
          </h1>
        </div>
        {providers &&
          Object.values(providers).map((provider) => (
            <SignInButton
              key={provider.id}
              providerId={provider.id}
              providerName={provider.name}
              providerIcon={providerIcons[provider.id] as React.ReactNode}
            />
          ))}
      </div>
      <p className='mt-4 text-sm text-gray-800 dark:text-gray-200'>
        By signing up, you agree to the{' '}
        <Link href='#' className='underline'>
          Terms of Service
        </Link>{' '}
        and{' '}
        <a href='#' className='underline'>
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}
