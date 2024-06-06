import React from 'react'
import DefaultNavbar from '../components/Navbar/DefaultNavbar'
import DefaultSidebar from '../components/Sidebars/DefaultSidebar'
import { Typography } from '@material-tailwind/react'

export default function DefaultLayout({ children, title }) {
  return (
    <div className='flex flex-col bg-gray-200 dark:bg-gray-900'>
      <DefaultNavbar />
      <main>
        <div className='w-full h-96 relative'>
          <img
            src='https://source.unsplash.com/1600x900/?nature,water'
            alt='TemporalTrek'
            className='absolute inset-0 w-full h-full object-cover'
          />
          <div className='absolute inset-0 h-full w-full bg-black/50 z-0'></div>
          <div className='relative w-full h-full z-10 flex justify-center items-center'>
            <Typography variant='h1' color='white' className='uppercase'>
              {title || 'TemporalTrek'}
            </Typography>
          </div>
        </div>
        <div className='flex container mx-auto p-2 -mt-16'>
          <div className='w-full mr-2 z-40'>{children}</div>
          <DefaultSidebar />
        </div>
      </main>
    </div>
  )
}
