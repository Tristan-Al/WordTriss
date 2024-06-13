import React from 'react'
import { Button } from '@material-tailwind/react'
import { ArrowLongRightIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
export default function Dashboard() {
  return (
    <>
      <div className='container'>
        <div className='relative isolate px-6 pt-14 lg:px-8'>
          <div
            className='absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
            aria-hidden='true'
          >
            <div
              className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
              }}
            />
          </div>
          <div className='mx-auto max-w-2xl py-32 sm:py-48 lg:py-56'>
            <div className='hidden sm:mb-8 sm:flex sm:justify-center'></div>
            <div className='text-center'>
              <h1 className='text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-200 sm:text-6xl'>
                Admin Dashboard
              </h1>
              <p className='mt-6 text-lg leading-8 text-gray-600'>
                Manage your application efficiently from this centralized hub.
                Access user data, oversee system operations, and customize
                settings to ensure optimal performance. Thank you for keeping
                everything running smoothly!
              </p>
              <div className='mt-10 flex items-center justify-center gap-x-6'>
                <a
                  href='#'
                  className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                >
                  Get started
                </a>
                <Button
                  variant='text'
                  size='large'
                  className='dark:text-gray-200 dark:hover:bg-gray-800 flex items-center'
                >
                  Learn more
                  <ArrowLongRightIcon className='w-5 h-5 ml-2' />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
