import React, { useState } from 'react'

export default function EditPost() {
  const [expanded, setExpanded] = useState(true)

  return (
    <div className='min-h-screen bg-gray-100 overflow-hidden flex'>
      <main
        className={`p-4 transition-all transform duration-600 pr-5 flex-1 ${
          expanded ? 'mrr-80' : 'mrr-20'
        }`}
      >
        <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
          <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg'>
            <div className='p-6 bg-white border-b border-gray-200'>
              <form method='POST' action='action.php'>
                <div className='mb-4'>
                  <label className='text-xl text-gray-600'>
                    Title <span className='text-red-500'>*</span>
                  </label>
                  <br />
                  <input
                    type='text'
                    className='border-2 border-gray-300 p-2 w-full'
                    name='title'
                    id='title'
                    defaultValue=''
                    required=''
                  />
                </div>
                <div className='mb-4'>
                  <label className='text-xl text-gray-600'>Description</label>
                  <br />
                  <input
                    type='text'
                    className='border-2 border-gray-300 p-2 w-full'
                    name='description'
                    id='description'
                    placeholder='(Optional)'
                  />
                </div>
                <div className='mb-8'>
                  <label className='text-xl text-gray-600'>
                    Content <span className='text-red-500'>*</span>
                  </label>
                  <br />
                  <textarea
                    name='content'
                    className='border-2 border-gray-500'
                    defaultValue={
                      '                                \n                            '
                    }
                  />
                </div>
                <div className='flex p-1'>
                  <select
                    className='border-2 border-gray-300 border-r p-2'
                    name='action'
                  >
                    <option>Save and Publish</option>
                    <option>Save Draft</option>
                  </select>
                  <button
                    role='submit'
                    className='p-3 bg-blue-500 text-white hover:bg-blue-400'
                    required=''
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <aside
        className={`flex-2 relative bg-gradient-to-br from-gray-800 to-gray-900 z-50  my-2 mr-2 rounded-xl transition-transform duration-300  ${
          expanded ? 'w-72' : 'w-12'
        }`}
      >
        <button
          className={`middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-white hover:bg-white/10 active:bg-white/30 absolute grid  ${
            expanded
              ? 'top-0 right-0 rounded-br-none rounded-tl-none'
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
        <div className='relative border-b border-white/20'></div>
      </aside>
      <script src='https://cdn.ckeditor.com/4.16.0/standard/ckeditor.js'></script>

      <script>{CKEDITOR.replace('content')}</script>
    </div>
  )
}
