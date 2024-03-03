'use client';

import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';

type Provider = {
  providerId: string;
  providerName: string;
  providerIcon: React.ReactNode;
};

export default function SignInButton({
  providerId,
  providerName,
  providerIcon,
}: Provider) {
  return (
    <Button
      onClick={() => signIn(providerId)}
      className='m-4 flex h-12 w-[350px] items-center space-x-3 rounded-md px-6 py-2 text-sm'
    >
      {providerIcon}
      <span>Sign in with {providerName}</span>
    </Button>
  );
}
