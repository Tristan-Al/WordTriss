import React, { useEffect, useRef, useState } from 'react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

import Loading from '../../../components/Loading/Loading'
import { useParams } from 'react-router-dom'
import postService from '../../../services/postService'
import categoryService from '../../../services/categoryService'
import useAlertToast from '../../../hooks/useToast'

export default function EditPost() {
  let { id } = useParams()
  const [expanded, setExpanded] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const editorRef = useRef(null)
  const { toast } = useAlertToast()

  const [post, setPost] = useState({
    title: '',
    content: '',
    thumbnail: '',
    status: 'published',
    userId: '',
    categories: [],
    tags: []
  })
  const [categories, setCategories] = useState([])
  const [categoriesSelected, setCategoriesSelected] = useState([])

  useEffect(() => {
    async function instanceClassicEditor() {
      // Create a new instance of CKEditor
      ClassicEditor.create(editorRef.current)
        .then((editor) => {})
        .catch((error) => {
          toast.showError('Error initializing CKEditor:', error)
        })
    }

    async function getPost() {
      try {
        const post = await postService.getPostById(id)
        setCategoriesSelected(post.categories)
        setPost(post)
      } catch (error) {
        toast.showError('Error getting post:', error)
      }
    }

    async function getCategories() {
      try {
        const categories = await categoryService.getAllCategories()
        setCategories(categories)
      } catch (error) {
        toast.showError('Error getting categories:', error)
      }
    }

    async function loadPage() {
      // await instanceClassicEditor()
      await getPost()
      await getCategories()
      setIsLoading(false)
    }

    loadPage()
  }, [])

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('Post:', post)
  }

  /**
   * Handle the input change event and update the state
   * @param {Event} e The event object
   */
  const handleInputChange = (e) => {
    // Deconstruct the name and value from the target
    const { name, value } = e.target

    // Update the state
    setPost({ ...post, [name]: value })
  }

  return (
    <main className='min-h-screen bg-gray-200 overflow-hidden flex'>
      <form
        onSubmit={handleSubmit}
        className={`p-4 transition-all transform duration-600 pr-5 flex-1 ${
          expanded ? 'mrr-80' : 'mrr-20'
        }`}
      >
        <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
          <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg'>
            <div className='p-6 bg-white border-b border-gray-200'>
              <div className='mb-4'>
                <input
                  type='text'
                  className=' text-2xl text-gray-800 font-bold py-2 w-full rounded'
                  name='title'
                  id='title'
                  value={post.title}
                  onChange={handleInputChange}
                  required=''
                />
              </div>
              <div className='mb-4'>
                <label className='text-xl text-gray-600'>Description</label>
                <br />
                <input
                  type='text'
                  className='text-gray-600 border-2 border-gray-300 p-2 w-full rounded'
                  name='description'
                  id='description'
                  placeholder='(Optional)'
                />
              </div>
              <div className='mb-8'>
                <label className='text-xl text-gray-600'>Content</label>
                <br />
                {isLoading && <Loading />}
                <textarea
                  id='content'
                  name='content'
                  rows='10'
                  cols='80'
                  ref={editorRef}
                  className='rounded'
                  onChange={handleInputChange}
                  value={post.content}
                ></textarea>
              </div>
              <div className='flex p-1'>
                <select
                  id='countries'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 mr-4'
                >
                  <option value='published' defaultValue={true}>
                    Published
                  </option>
                  <option value='draft'>Draft</option>
                </select>
                <button
                  role='submit'
                  type='submit'
                  className='p-3 bg-blue-600 text-white hover:bg-blue-500 rounded shadow'
                  required=''
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <aside
        className={`flex-2 relative bg-gradient-to-br from-gray-800 to-gray-900 z-50  my-2 mr-2 p-2 rounded-xl transition-transform duration-300  ${
          expanded ? 'w-72' : 'w-12'
        }`}
      >
        <button
          className={`z-50 middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-10 max-w-[40px] h-10 max-h-[40px] rounded-lg text-xs text-white hover:bg-white/10 active:bg-white/30 absolute grid  ${
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
        <div className='relative border-b border-white/20 mb-3'>
          <h2 className='text-3xl text-white'>Edit posts </h2>
        </div>
        <div className=''>
          <h3 className='text-xl text-white mb-3'>Categories</h3>
          <ul className='flex flex-col justify-start align-top items-start gap-2 bg-gray-700 p-2 rounded '>
            {categories.map((category) => {
              return (
                <li className='flex' key={category.id}>
                  <input
                    type='checkbox'
                    id={`category-${category.id}`}
                    name={category.id}
                    value={category.id}
                    className='peer hidden'
                    checked={post.categories.includes(category.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setPost({
                          ...post,
                          categories: [...post.categories, category.id]
                        })
                      } else {
                        setPost({
                          ...post,
                          categories: post.categories.filter(
                            (cat) => cat !== category.id
                          )
                        })
                      }
                    }}
                  />
                  <label
                    htmlFor={`category-${category.id}`}
                    className='select-none cursor-pointer rounded border border-gray-200
   py-2 px-3 text-sm font-semibold text-gray-200 transition-colors duration-200 ease-in-out peer-checked:bg-gray-200 peer-checked:text-gray-900 peer-checked:border-gray-200 '
                  >
                    {category.name}
                  </label>
                </li>
              )
            })}
          </ul>
        </div>
      </aside>
    </main>
  )
}
