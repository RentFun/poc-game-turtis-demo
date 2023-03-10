import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { init, isAuth } from "@/lib/Web3Client";

const Navbar = () => {
  const [auth, setAuth] = useState('');
  const router = useRouter();
  const [navbarOpen, setNavbarOpen] = useState(false);

  useEffect(() => {
      const getAuth = async () => {
          await init();
          setAuth(await isAuth());
      }

      getAuth();

      //@ts-ignore
      window.ethereum.on("accountsChanged", function (accounts) {
          getAuth();
      });
  }, [auth]);

  return (
      <nav className='lg:max-h-16 flex flex-wrap items-center justify-between px-2 pt-20 mt-0 bg-white font-primary '>
        <div className='container mt-0 px-4 mx-auto flex flex-wrap items-center justify-between '>
          <div className='w-full mt-0 relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start'>
              <img className='absolute -mt-10 cursor-pointer'
                   src='https://rentfun.infura-ipfs.io/ipfs/QmddbEoiSBZ1auMLMwqpm83tvuWE9PKhpGuwrFWpNVq2Na'
                   alt="Logo" style={{ height: '150', width: '150'}}
                   onClick={() => {
                       router.push('/');
                   }}
              />

            <button
              className='text-black cursor-pointer text-xl leading-none px-3 pt-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none'
              type='button'
              onClick={() => setNavbarOpen(!navbarOpen)}>
              <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
            </button>
          </div>
          <div
            className={
              'lg:flex flex-grow items-center align-middle text-center' +
              (navbarOpen ? ' flex' : ' hidden')
            }
            id='example-navbar-danger'>
            <ul className='lg:flex flex-col lg:flex-row list-none lg:ml-auto -pt-8 -mt-24 items-center'>
              {/*<li className='nav-item px-3'>*/}
                <button
                  className='rounded-full hover:brightness-105 text-right text-blue font-bold bg-purple text-white p-2 '
                  onClick={init}>
                    {auth ? `${auth.slice(0, 2)}...${auth.slice(
                        auth.length - 4,
                        auth.length
                    )}` : 'Connect Wallet'}
                </button>
              {/*</li>*/}
            </ul>
          </div>
        </div>
      </nav>
  );
};

export default Navbar;
