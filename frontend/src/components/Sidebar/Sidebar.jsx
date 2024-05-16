import React, { createContext, useContext, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import useSignOut from 'react-auth-kit/hooks/useSignOut'

const SidebarContext = createContext()

export const Sidebar = ({ children, expanded, setExpanded }) => {
  const signOut = useSignOut()
  const navigate = useNavigate()
  const handleSignOut = () => {
    // Sign out the user
    signOut()
    // Redirect to the home page
    navigate('/')
  }
  return (
    <aside
      className={`bg-gradient-to-br from-gray-800 to-gray-900 fixed inset-0 z-50  my-2 ml-2 rounded-xl transition-transform duration-300 ${
        expanded ? 'w-72' : 'w-12'
      }`}
    >
      <div className='relative border-b border-white/20'>
        <Link to='/' className={`flex items-center gap-4 py-6 px-8 mr-9`}>
          {expanded && (
            <h6 className='block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white'>
              Admin Area
            </h6>
          )}
        </Link>
        <button
          className={`middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-white hover:bg-white/10 active:bg-white/30 absolute grid ${
            expanded
              ? 'top-0 right-0 rounded-br-none rounded-tl-none '
              : 'top-1 left-1 right-1'
          }`}
          type='button'
          onClick={() => setExpanded((curr) => !curr)}
        >
          <span className='absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2'>
            {expanded ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='32'
                height='32'
                viewBox='0 0 32 32'
                fill='none'
                stroke='currentColor'
                strokeWidth='3'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <line x1='22' y1='6' x2='6' y2='22' />
                <line x1='22' y1='22' x2='6' y2='6' />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='32'
                height='32'
                viewBox='0 0 32 32'
                fill='none'
                stroke='currentColor'
                strokeWidth='3'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <line x1='26' y1='22' x2='4' y2='22' />
                <line x1='26' y1='14' x2='4' y2='14' />
                <line x1='26' y1='6' x2='4' y2='6' />
              </svg>
            )}
          </span>
        </button>
      </div>
      <div
        className={`flex flex-col justify-between ${expanded ? 'm-4' : 'm-1'}`}
      >
        <SidebarContext.Provider value={{ expanded }}>
          <ul className='mb-4 flex flex-col gap-1'>{children}</ul>

          <ul className='flex flex-col gap-1'>
            <li className={`mx-3.5 mt-4 mb-2 ${!expanded && 'hidden'}`}>
              <p className='block antialiased font-sans text-sm leading-normal text-white font-black uppercase opacity-75'>
                auth pages
              </p>
            </li>
            <li>
              <button
                className={`${
                  expanded ? 'px-4' : 'flex align-middle justify-center'
                } py-3 mb-1 middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs rounded-lg text-white flex items-center gap-4 capitalize w-full hover:bg-white/10 active:bg-white/30`}
                type='button'
                onClick={() => handleSignOut()}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='currentColor'
                  aria-hidden='true'
                  className='w-5 h-5 text-inherit'
                >
                  <path
                    fillRule='evenodd'
                    d='M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z'
                    clipRule='evenodd'
                  />
                </svg>
                <p
                  className={`antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize ${
                    expanded ? 'block' : 'hidden'
                  }`}
                >
                  Log out
                </p>
              </button>
            </li>
          </ul>
        </SidebarContext.Provider>
      </div>
    </aside>
  )
}

export const SidebarItem = ({ icon, text, link = '/wt-content' }) => {
  const { expanded } = useContext(SidebarContext)

  // Determine if the current link is active
  const location = useLocation()
  const isActive = location.pathname === link
  return (
    <li>
      <NavLink
        to={link}
        aria-current='page'
        className={(isActive) => isActive ?? 'active'}
      >
        <div
          className={`${
            expanded ? 'px-4' : 'flex align-middle justify-center'
          } py-3 mb-1 middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs rounded-lg text-white flex items-center gap-4 capitalize w-full ${
            isActive
              ? 'bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85]'
              : 'hover:bg-white/10 active:bg-white/30'
          }`}
        >
          {icon}
          <p
            className={`antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize ${
              expanded ? 'block' : 'hidden'
            }`}
          >
            {text}
          </p>
        </div>
      </NavLink>
    </li>
  )
}
