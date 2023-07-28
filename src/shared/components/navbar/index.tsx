'use client';
import { useState, useEffect, useContext } from 'react';
import {
  X,
  List,
  ChatText,
  Gear,
  Sun,
  Moon,
  Desktop,
} from '@phosphor-icons/react';
import Image from 'next/image';
import Logo from '../../images/logo.png';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ThemeContext } from '@/shared/context/themeContext';

export interface IMenu {
  menuItem: string;
  menuLink: string;
}
interface INavbarProps {
  menu: IMenu[];
}

export const Navbar = ({ menu }: INavbarProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const [active, setActive] = useState<String>('');
  const [openMenu, setOpenMenu] = useState<Boolean>(false);
  const [toggleSettings, setToggleSettings] = useState<Boolean>(false);

  const { theme, toggleTheme } = useContext(ThemeContext);

  const element = document.documentElement;

  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  function themeOnWindowMatch() {
    if (darkQuery.matches) {
      element.classList.add('dark');
    } else {
      element.classList.remove('dark');
    }
  }

  useEffect(() => {
    if (pathname.startsWith('/')) {
      setActive(menu[0].menuItem);
    } else if (pathname.startsWith('/contato')) {
      setActive('contato');
    } else {
      setActive(menu[1].menuItem);
    }
    switch (theme) {
      case 'dark':
        element.classList.add('dark');
        break;
      case 'light':
        element.classList.remove('dark');
        break;
      case 'system':
        themeOnWindowMatch();
        break;
      default:
        break;
    }
  }, [theme]);

  return (
    <div className='w-full'>
      <nav className={`w-full sticky top-0 left-0 shadow-md bg-sky-300 z-40`}>
        <div className='lg:flex lg:px-10 items-center justify-between py-4 px-7 lg:h-24'>
          <div
            id='logo'
            className='font-bold text-2xl flex items-center text-gray-800'
          >
            <Link
              href='/'
              className='text-3xl text-black cursor-pointer flex items-center gap-3'
              onClick={() => {
                if (openMenu) {
                  setOpenMenu(!openMenu);
                }
                setActive('Página Inicial');
                window.scrollTo(0, 0);
              }}
            >
              <Image src={Logo} alt='logo' width={50} />
              <p className='text-2xl'>
                Luis<span className='lg:block'> Felipe</span>
              </p>
            </Link>
          </div>
          <div
            id='mobile button close and open menu'
            onClick={() => setOpenMenu(!openMenu)}
            className='lg:hidden text-3xl absolute right-9 top-7 cursor-pointer'
          >
            {openMenu ? <X /> : <List />}
          </div>
          <ul
            id='menu links'
            className={`md:pb-8 flex items-center lg:pb-0 lg:static lg:z-auto lg:w-auto lg:pl-0 pl-7 z-[-1] left-0 pb-12 absolute bg-sky-300 
             w-full duration-500 ease-in max-lg:justify-between ${
               openMenu ? 'top-20' : 'top-[-490px]'
             }`}
          >
            <div className='lg:flex lg:items-center'>
              {menu.map((item) => {
                if (item)
                  return (
                    <li
                      className={`${
                        active === item.menuItem ? 'text-white' : 'text-black'
                      } text-xl font-bold whitespace-nowrap lg:ml-8 lg:my-0 my-7`}
                      key={item.menuItem}
                      onClick={() => {
                        if (openMenu) {
                          setOpenMenu(!openMenu);
                        }
                        setActive(item.menuItem);
                        window.scrollTo(0, 0);
                      }}
                    >
                      <Link
                        href={item.menuLink}
                        className='duration-500 py-2 px-4'
                      >
                        {item.menuItem}
                      </Link>
                    </li>
                  );
                return null;
              })}
              <button
                className={`flex items-center font-bold font-[Poppins] py-2 px-6 lg:ml-8 rounded-lg hover:bg-white hover:text-slate-900 duration-300 ${
                  active === 'contato'
                    ? 'bg-white text-slate-900'
                    : 'bg-slate-900 text-white'
                }`}
                onClick={() => {
                  router.push('/contato');
                  if (openMenu) {
                    setOpenMenu(!openMenu);
                  }
                  setActive('contato');
                  window.scrollTo(0, 0);
                }}
              >
                CONTATO |
                <ChatText size={18} className='ml-2' />
              </button>
            </div>
            <button
              className={`flex lg:ml-8 items-center px-1 py-1 rounded-lg hover:bg-slate-700 hover:outline hover:outline-sky-400 bg-slate-900 max-lg:mr-8 max-lg:mb-28`}
              onClick={() => {
                setToggleSettings(true);
              }}
            >
              <Gear size={32} weight='thin' color='#38bdf8' />
            </button>
          </ul>
        </div>
      </nav>
      <div
        className={`w-96 h-full z-50 dark:bg-gray-950 bg-white outline outline-sky-200 absolute top-0 duration-500 transition-all rounded-l-xl flex flex-col ${
          toggleSettings ? 'right-0' : 'right-[-387px] top-[-1000px]'
        }`}
      >
        <div className='flex justify-between mx-1 mr-4 mt-4'>
          <span className='text-xl font-bold text-black dark:text-white'>
            Configurações
          </span>

          <button
            className='hover:bg-sky-200 hover:rounded-full duration-500'
            onClick={() => setToggleSettings(false)}
          >
            <X
              size={28}
              weight='regular'
              className='text-black dark:text-white'
            />
          </button>
        </div>
        <hr className='border border-sky-200 mt-3' />
        <span className='mt-4 mx-1 text-black dark:text-gray-50 mb-1'>
          Modo
        </span>
        <div className='flex justify-evenly mx-2 rounded-full'>
          <button
            className={`border-y-[1px] border-l-[1px] border-black dark:border-gray-50 flex-1 flex justify-center rounded-l-full py-1 ${
              theme === 'light'
                ? 'border-r-[1px] bg-sky-200 border-sky-400 hover:bg-sky-300 hover:border-sky-500 duration-300 '
                : 'border-black dark:border-gray-50 hover:bg-slate-700 duration-300'
            }`}
            onClick={() => toggleTheme('light')}
          >
            <Sun
              size={32}
              weight='thin'
              className='text-black dark:text-white'
            />
          </button>
          <button
            className={`border flex-1 flex justify-center py-1 ${
              theme === 'system'
                ? 'border bg-sky-200 border-sky-400 hover:bg-sky-300 hover:border-sky-500 duration-300'
                : `border-black dark:border-gray-50 hover:bg-slate-700 duration-300 ${
                    theme === 'light' ? 'border-l-0' : 'border-r-0'
                  }`
            }`}
            onClick={() => toggleTheme('system')}
          >
            <Desktop
              size={32}
              weight='thin'
              className='text-black dark:text-white'
            />
          </button>
          <button
            className={`border-y-[1px] border-r-[1px] flex-1 flex justify-center rounded-r-full py-1 border-black ${
              theme === 'dark'
                ? 'border-l-[1px] bg-sky-200 border-sky-400 hover:bg-sky-300 hover:border-sky-500 duration-300'
                : 'border-black dark:border-gray-50 hover:bg-slate-700 duration-300'
            }`}
            onClick={() => toggleTheme('dark')}
          >
            <Moon
              size={32}
              weight='thin'
              className='text-black dark:text-white'
            />
          </button>
        </div>
      </div>
    </div>
  );
};
