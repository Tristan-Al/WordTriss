import React, { createContext, useContext } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Cog6ToothIcon,
  ComputerDesktopIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline'
import AdminAuthorSidebarCard from '../Cards/AdminAuthorSidebarCard'

const SidebarContext = createContext(null)

export default function AdminSidebar({ expanded, onClick }) {
  return (
    <aside className='h-screen p-2 sticky top-0 z-50'>
      <nav className='h-full flex flex-col bg-white border-r shadow-sm rounded-lg'>
        <div className='p-4 pb-2 flex justify-between items-center'>
          <Link
            to={'/'}
            className={`flex items-center gap-2 hover:bg-gray-200 rounded-lg transition-all overflow-hidden ${
              expanded ? 'p-1.5' : 'p-0 w-0'
            }`}
          >
            <GlobeAltIcon width={28} />
            Home
          </Link>
          <button
            onClick={onClick}
            className='p-1.5 rounded-lg bg-gray-50 hover:bg-gray-200'
          >
            {expanded ? (
              <ChevronLeftIcon width={28} />
            ) : (
              <ChevronRightIcon width={28} />
            )}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded: expanded }}>
          <ul className='flex-1 px-3'>
            <SidebarItem
              icon={<ComputerDesktopIcon width={24} />}
              text={'Dashboard'}
              link={'/wt-content/dashboard'}
            />
            <SidebarItem
              icon={<UserCircleIcon width={24} />}
              text={'Profile'}
              link={'/wt-content/profile'}
            />
            <SidebarItem
              icon={<DocumentTextIcon width={24} />}
              text={'Posts'}
              link={'/wt-content/posts'}
              alert={true}
            />
            <hr className='my-3' />
            <SidebarItem
              icon={<Cog6ToothIcon width={24} />}
              text={'Settings'}
              link={'/wt-content/settings'}
            />
          </ul>
        </SidebarContext.Provider>

        <AdminAuthorSidebarCard expanded={expanded} />
      </nav>
    </aside>
  )
}

export function SidebarItem({ icon, text, alert, link = '/wt-content' }) {
  const { expanded } = useContext(SidebarContext)

  // Determine if the current link is active
  const location = useLocation()
  const isActive = location.pathname === link

  return (
    <NavLink
      to={link}
      aria-current='page'
      className={(isActive) => isActive ?? 'active'}
    >
      <li
        className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          isActive
            ? 'bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800'
            : 'hover:bg-indigo-50 text-gray-600'
        }
    `}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? 'w-52 ml-3' : 'w-0'
          }`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
              expanded ? '' : 'top-2'
            }`}
          />
        )}

        {!expanded && (
          <div
            className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
          >
            {text}
          </div>
        )}
      </li>
    </NavLink>
  )
}
