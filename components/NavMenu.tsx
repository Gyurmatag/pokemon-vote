import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import Link from 'next/link';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { ResetVotes } from '@/components/ResetVotes';

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
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger className='cursor-pointer' asChild>
              <Avatar>
                <AvatarImage
                  src={session!.user?.image || ''}
                  alt='User Profile Picture'
                />
                <AvatarFallback>
                  <button className='h-9 w-9 rounded-full bg-gradient-to-r from-green-500 to-blue-500'></button>
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>{session!.user?.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  asChild
                  className='flex w-full cursor-pointer'
                >
                  <div className='flex w-full'>
                    <AlertDialogTrigger>Reset my Votes</AlertDialogTrigger>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently removes your
                Pokemon votes from our database.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <ResetVotes />
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </nav>
    </header>
  );
}
