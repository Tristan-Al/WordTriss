import React from 'react'
import { Link } from 'react-router-dom'

function CardPost({ post }) {
  return (
    <div className='post-card relative rounded-lg flex flex-col md:flex-row items-center md:shadow-xl md:h-80 mx-2 my-6'>
      <div className='z-0 order-1 md:order-2 relative w-full md:w-2/5 h-80 md:h-full overflow-hidden rounded-lg md:rounded-none md:rounded-r-lg'>
        <div
          className='absolute inset-0 w-full h-full object-fill object-center bg-blue-400 bg-opacity-30 bg-cover bg-bottom'
          style={{
            backgroundImage: `url( ${post.thumbnail} )`,
            backgroundBlendMode: 'multiply'
          }}
        />
        <div className='md:hidden absolute inset-0 h-full p-7 flex flex-col-reverse justify-start items-start bg-gradient-to-b from-transparent via-transparent to-gray-900'>
          <h3 className='w-full font-bold text-2xl text-white leading-tight mb-2'>
            {post.title}
          </h3>
          <h4 className='w-full text-xl text-gray-100 leading-tight'>
            Category
          </h4>
        </div>
        <svg
          className='hidden md:block absolute inset-y-0 h-full w-24 fill-current text-white -ml-12'
          viewBox='0 0 100 100'
          preserveAspectRatio='none'
        >
          <polygon points='50,0 100,0 50,100 0,100' />
        </svg>
      </div>
      <div className='z-10 order-2 md:order-1 w-full h-full md:w-3/5 flex items-center -mt-6 md:mt-0'>
        <div className='flex flex-col items-start justify-center p-8 md:pr-18 md:pl-8 md:py-8 mx-2 md:mx-0 h-full w-full bg-white rounded-lg md:rounded-none md:rounded-l-lg shadow-xl md:shadow-none'>
          <div className='mb-4 hidden md:block text-xl text-gray-400'>
            {post.categories.map((category) => (
              <Link
                key={category.id}
                className='mr-2 px-2 py-1 bg-slate-200 rounded-sm text-sm transition hover:bg-slate-300 hover:shadow-md'
                to={`/category/${category.id}`}
              >
                {category.name}
              </Link>
            ))}
          </div>
          <h3 className='hidden md:block font-bold text-2xl text-gray-700'>
            {post.title}
          </h3>
          <p className='text-gray-600 text-justify mb-4'>{post.content}</p>
          <Link
            className='inline items-baseline mt-3 bg-blue-200 p-2 rounded text-blue-600 hover:bg-blue-500 hover:text-white'
            to={`/post/${post.id}`}
          >
            <span>Read more</span>
            <span className='text-xs ml-1'>➜</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CardPost
