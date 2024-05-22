import React, { createContext, useContext, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import useSignOut from 'react-auth-kit/hooks/useSignOut'
import {
  ArrowLeftStartOnRectangleIcon,
  ChevronRightIcon,
  GlobeAltIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

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
      className={`bg-white dark:bg-gray-800 fixed inset-0 z-50 my-1 ml-1 rounded-lg transition-transform duration-300 ${
        expanded ? 'w-60' : 'w-14'
      }`}
    >
      <div
        className={`flex ${!expanded ? `justify-center` : `justify-between`}`}
      >
        <GlobeAltIcon
          width={30}
          className={`mt-3 ml-4 text-gray-900 dark:text-white ${!expanded && 'hidden'}`}
        />
        <button
          className={`p-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 ${
            expanded && 'rounded-br-none rounded-tl-none'
          }`}
          type='button'
          onClick={() => setExpanded((curr) => !curr)}
        >
          {expanded ? (
            <XMarkIcon width={28} />
          ) : (
            <ChevronRightIcon width={28} />
          )}
        </button>
      </div>
      <div
        className={`flex flex-col justify-between ${expanded ? 'm-4' : 'm-1'}`}
      >
        <SidebarContext.Provider value={{ expanded }}>
          <ul className='mb-4 flex flex-col gap-1'>{children}</ul>

          <ul className='flex flex-col gap-1'>
            <li className={`mx-3.5 mt-4 mb-2 ${!expanded && 'hidden'}`}>
              <p className='block font-sans text-sm text-white font-bold uppercase opacity-75'>
                Auth pages
              </p>
            </li>
            <li>
              <button
                className={`${
                  expanded ? 'px-3' : 'flex align-middle justify-center'
                } py-3 rounded-lg text-white flex items-center gap-4 capitalize w-full hover:bg-white/10`}
                type='button'
                onClick={() => handleSignOut()}
              >
                <ArrowLeftStartOnRectangleIcon width={28} />
                <p
                  className={`font-sans text-base leading-relaxed text-inherit font-medium capitalize ${
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
          } py-3  rounded-lg text-white flex items-center gap-4 capitalize w-full ${
            isActive
              ? 'bg-gradient-to-tr from-blue-600 to-blue-400 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/40'
              : 'hover:bg-white/10'
          }`}
        >
          {icon}
          <p
            className={`leading-relaxed text-inherit capitalize ${
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
