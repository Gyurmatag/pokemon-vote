import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SessionProvider from '@/components/SessionProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import NavMenu from '@/components/NavMenu';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { VoteProvider } from "@/contexts/VoteContext";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pokémon Vote App',
  description: 'Here you can vote for you fav Pokémons!',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang='en'>
      <SessionProvider session={session}>
        <body className={inter.className}>
        <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
        >
          <VoteProvider>
            {session && <NavMenu />}
            {children}
            <Toaster />
          </VoteProvider>
        </ThemeProvider>
        </body>
      </SessionProvider>
    </html>
  );
}
