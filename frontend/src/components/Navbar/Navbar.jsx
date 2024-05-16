import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import ColorModeSwitcher from '../Buttons/ColorModeSwitcher'

const Navbar = ({ theme }) => {
  const [open, setOpen] = useState(false)

  const linkClass = (isActive) => {
    return isActive
      ? 'px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0 md:ml-4 text-gray-900 bg-gray-200'
      : 'px-4 py-2 mt-2 text-sm font-semibold bg-transparent rounded-lg dark:bg-transparent dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:text-white dark:hover:text-white dark:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline'
  }

  return (
    <div className='antialiased bg-gray-100 dark:bg-gray-900'>
      <div className='w-full text-gray-700 bg-white dark:text-gray-200 dark:bg-gray-800 sticky shadow-sm z-50'>
        <div className='flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8'>
          <div className='flex flex-row items-center justify-between p-4'>
            <NavLink
              to='/'
              className='text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark:text-white focus:outline-none focus:shadow-outline'
            >
              TemporalTrek
            </NavLink>
            <button
              className='rounded-lg md:hidden focus:outline-none focus:shadow-outline'
              onClick={() => setOpen(!open)}
            >
              <svg fill='currentColor' viewBox='0 0 20 20' className='w-6 h-6'>
                {open ? (
                  <path
                    fillRule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                ) : (
                  <path
                    fillRule='evenodd'
                    d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z'
                    clipRule='evenodd'
                  />
                )}
              </svg>
            </button>
          </div>
          <nav
            className={`gap-3 flex-col flex-grow ${
              open ? 'flex' : 'hidden'
            } pb-4 md:pb-0 md:flex md:justify-end md:flex-row`}
          >
            <NavLink
              to='/'
              className={(isActive) => linkClass(isActive.isActive)}
              onClick={() => setOpen(!open)}
            >
              Home
            </NavLink>
            <NavLink
              to='/blog'
              className={(isActive) => linkClass(isActive.isActive)}
              onClick={() => setOpen(!open)}
            >
              Blog
            </NavLink>
            <NavLink
              to='/about'
              className={(isActive) => linkClass(isActive.isActive)}
              onClick={() => setOpen(!open)}
            >
              About
            </NavLink>
            <NavLink
              to='/contact'
              className={(isActive) => linkClass(isActive.isActive)}
              onClick={() => setOpen(!open)}
            >
              Contact
            </NavLink>
            <NavLink
              to='/wt-content'
              className={(isActive) => linkClass(isActive.isActive)}
              onClick={() => setOpen(!open)}
            >
              Admin
            </NavLink>
            <ColorModeSwitcher />
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Navbar
