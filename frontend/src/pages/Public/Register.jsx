import React from 'react'
import { Link } from 'react-router-dom'

function Register() {
  return (
    <div className='min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12'>
      <div className='p-10 xs:p-0 mx-auto md:w-full md:max-w-md'>
        <h1 className='font-bold text-center text-2xl mb-5'>Logo</h1>
        <form className='bg-white shadow w-full rounded-lg'>
          <div className='px-5 py-7'>
            <label className='text-sm text-gray-800 pb-1 block'>Username</label>
            <input
              type='text'
              className='text-gray-600 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full outline-none bg-gray-100 drop-shadow focus:shadow focus:bg-gray-200'
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className='text-sm text-gray-800 pb-1 block'>Password</label>
            <input
              type='password'
              className='text-gray-600 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full outline-none bg-gray-100 drop-shadow focus:shadow focus:bg-gray-200'
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label className='text-sm text-gray-800 pb-1 block'>
              Confirm password
            </label>
            <input
              type='password'
              className='text-gray-600 rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full outline-none bg-gray-100 drop-shadow focus:shadow focus:bg-gray-200'
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type='submit'
              className='transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full p-4 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block'
            >
              <span className='inline-block mr-2'>Register</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                className='w-4 h-4 inline-block'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M17 8l4 4m0 0l-4 4m4-4H3'
                />
              </svg>
            </button>
          </div>

          <div className='flex items-center px-5 py-2'>
            <hr className='h-0 border-b border-solid border-grey-500 grow' />
            <p className='mx-4 text-gray-400'>or</p>
            <hr className='h-0 border-b border-solid border-grey-500 grow' />
          </div>

          <Link
            to={''}
            className='flex items-center justify-center mx-5 my-2 p-4 text-sm font-medium transition duration-300 rounded-lg text-gray-900 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:ring-gray-300'
          >
            <img
              className='h-5 mr-2'
              src='https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png'
              alt=''
            />
            Sign in with Google
          </Link>

          <div className='py-5'>
            <div className='grid grid-cols-1 gap-1'>
              <div className='text-center sm:text-right  whitespace-nowrap'>
                <button className='transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    className='w-4 h-4 inline-block align-text-bottom	'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z'
                    />
                  </svg>
                  <span className='inline-block ml-1'>Help</span>
                </button>
              </div>
            </div>
          </div>
        </form>
        <div className='py-5'>
          <div className='grid grid-cols-2 gap-1'>
            <div className='text-center sm:text-left whitespace-nowrap font-normal text-sm text-gray-500 mx-5'>
              <span className='inline-block'>Do you have an account?</span>
              <Link to='/login' className='font-bold ml-2 hover:text-gray-600'>
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register