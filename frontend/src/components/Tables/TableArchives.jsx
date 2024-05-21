import React from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import BlogAuthorCard from '../Cards/BlogAuthorCard'

export default function TableArchives({ posts }) {
  return (
    <div className=''>
      <div className='flex flex-col'>
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
            <div className='overflow-hidden border border-gray-200 '>
              <table className='min-w-full divide-y divide-gray-200 '>
                <thead className='bg-gray-50 '>
                  <tr>
                    <th
                      scope='col'
                      className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      Thumbnail
                    </th>
                    <th
                      scope='col'
                      className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      Title
                    </th>
                    <th
                      scope='col'
                      className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      Author
                    </th>
                    <th
                      scope='col'
                      className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      Date
                    </th>
                    <th scope='col' className='relative py-3.5 px-4'>
                      <span className='sr-only'>Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200 '>
                  {posts.map((post) => (
                    <tr key={post.id}>
                      <td className='px-4 py-4 text-sm text-gray-500 whitespace-nowrap'>
                        <img
                          className='object-cover w-14 h-14 rounded'
                          src={
                            post.thumbnail ??
                            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80'
                          }
                          alt=''
                        />
                      </td>
                      <td className='px-4 py-4 text-sm font-medium text-gray-600 whitespace-nowrap overflow-ellipsis'>
                        {post.title}
                      </td>
                      <td className='px-4 py-4 text-sm text-gray-500 whitespace-nowrap flex items-center'>
                        <BlogAuthorCard authorId={post.userId} />
                      </td>
                      <td className='px-4 py-4 text-sm text-gray-500 whitespace-nowrap'>
                        {format(new Date(post.updatedAt), 'MMM dd, yyyy')}
                      </td>
                      <td className='px-4 py-4 text-sm text-gray-500 whitespace-nowrap'>
                        <Link
                          to={`/post/${post.id}`}
                          className='bg-gradient-to-r from-orange-300 to-amber-400 hover:scale-100 drop-shadow-md shadow-cla-violate px-4 py-2 rounded-lg text-gray-800'
                        >
                          Learn more
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className='flex items-center justify-between mt-6'>
        <a
          href='#'
          className='flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-5 h-5 rtl:-scale-x-100'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
            />
          </svg>
          <span>previous</span>
        </a>
        <div className='items-center hidden md:flex gap-x-3'>
          <a href='#' className='px-2 py-1 text-sm text-blue-500 rounded-md'>
            1
          </a>
          <a
            href='#'
            className='px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-gray-100'
          >
            2
          </a>
          <a
            href='#'
            className='px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-gray-100'
          >
            3
          </a>
          <a
            href='#'
            className='px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-gray-100'
          >
            ...
          </a>
          <a
            href='#'
            className='px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-gray-100'
          >
            12
          </a>
          <a
            href='#'
            className='px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-gray-100'
          >
            13
          </a>
          <a
            href='#'
            className='px-2 py-1 text-sm text-gray-500 rounded-md hover:bg-gray-100'
          >
            14
          </a>
        </div>
        <a
          href='#'
          className='flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100'
        >
          <span>Next</span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='1.5'
            stroke='currentColor'
            className='w-5 h-5 rtl:-scale-x-100'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
            />
          </svg>
        </a>
      </div>
    </div>
  )
}
