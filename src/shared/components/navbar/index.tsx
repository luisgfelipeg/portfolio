'use client';
import { useState, useEffect } from 'react';
import { X, List, ChatText, Gear } from '@phosphor-icons/react';
import Image from 'next/image';
import Logo from '../../images/logo.png';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

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

  useEffect(() => {
    if (pathname.startsWith('/')) {
      setActive(menu[0].menuItem);
    } else if (pathname.startsWith('/contato')) {
      setActive('contato');
    } else {
      setActive(menu[1].menuItem);
    }
  }, []);

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
        className={`w-96 h-full z-50 bg-sky-300 outline outline-sky-200 absolute top-0 duration-500 transition-all rounded-l-xl flex flex-col ${
          toggleSettings ? 'right-0' : 'right-[-387px] top-[-1000px]'
        }`}
      >
        <div className='flex justify-between mx-1 mr-4 mt-4'>
          <span className='text-xl font-bold'>Configurações</span>
          <button
            className='hover:bg-sky-200 hover:rounded-full duration-500'
            onClick={() => setToggleSettings(false)}
          >
            <X size={28} weight='regular' color='black' />
          </button>
        </div>
      </div>
    </div>
  );
};
