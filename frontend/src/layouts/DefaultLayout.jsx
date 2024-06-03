import React from 'react'
import DefaultNavbar from '../components/Navbar/DefaultNavbar'
import DefaultSidebar from '../components/Sidebars/DefaultSidebar'

export default function DefaultLayout({ children }) {
  return (
    <div className='flex flex-col bg-gray-200 dark:bg-gray-900'>
      <DefaultNavbar />
      <main className='flex container mx-auto p-2 '>
        <div className='w-full mr-2'>{children}</div>
        <DefaultSidebar />
      </main>
    </div>
  )
}
