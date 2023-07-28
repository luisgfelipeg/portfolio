import type { Metadata } from 'next';
import { Roboto_Flex } from 'next/font/google';

import './globals.css';
import { IMenu, Navbar } from '@/shared/components/navbar/index';
import { AppThemeProvider } from '@/shared/context/themeContext';

const roboto = Roboto_Flex({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Luis Felipe | Portfólio',
  description: 'Um pouco sobre mim e sobre meus projetos realizados!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems: IMenu[] = [
    { menuItem: 'Página Inicial', menuLink: '/' },
    { menuItem: 'Projetos', menuLink: '/meus-projetos' },
  ];

  return (
    <html lang='pt-br'>
      <body
        className={`${roboto.className} bg-white dark:bg-black bg-no-repeat overflow-x-hidden`}
      >
        <AppThemeProvider>
          <Navbar menu={navItems} />
          {children}
        </AppThemeProvider>
      </body>
    </html>
  );
}
