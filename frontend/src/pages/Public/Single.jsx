import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { format } from 'date-fns'
import postService from '../../services/postService'
import Loading from '../../components/Loading/Loading'
import CardComment from '../../components/Cards/CardComment'

function SinglePost() {
  let { id } = useParams()

  const [post, setPost] = useState(null)

  /**
   * This only runs once when the component mounts
   * It fetches the post from the server by params id
   * and saves in the post state
   */
  useEffect(() => {
    async function getPost() {
      try {
        // Fetch the post from the server by id
        const post = await postService.getPostById(id)
        // Save the post in the state
        setPost(post)
      } catch (error) {
        // If there's an error, set the error message
        console.log(error)
      }
    }

    getPost()
  }, [])

  // Verify if post is not empty before render
  if (!post) {
    return <Loading />
  }

  console.log(post.comments)
  return (
    <div className='container mx-auto pb-10'>
      {/* <-------- POST HEADER AND THUMBNAIL --------> */}
      <div
        className='mb-4 md:mb-0 w-full max-w-screen-md mx-auto relative'
        style={{ height: '24em' }}
      >
        <div
          className='absolute left-0 bottom-0 w-full h-full z-10'
          style={{
            backgroundImage:
              'linear-gradient(180deg,transparent,rgba(0,0,0,.7))'
          }}
        />
        <img
          src={post.thumbnail}
          className='absolute left-0 top-0 w-full h-full z-0 object-cover'
          alt='Post thumbnail'
        />
        <div className='p-4 absolute bottom-0 left-0 z-20'>
          {post.categories.map((category) => (
            <Link
              key={category.id}
              className='px-4 py-1 mr-2 mb-2 bg-black text-gray-200 inline-flex items-center justify-center rounded-sm transition hover:bg-white hover:text-black'
              to={`/category/${category.id}`}
            >
              {category.name}
            </Link>
          ))}
          <h2 className='text-4xl font-semibold text-gray-100 leading-tight'>
            {post.title}
          </h2>
          <div className='flex mt-3'>
            <img
              src={
                post.user.picture ??
                'https://www.kindpng.com/picc/m/451-4517876_default-profile-hd-png-download.png'
              }
              className='h-10 w-10 rounded-full mr-2 object-cover'
              alt='User'
            />
            <div>
              <Link
                className='font-semibold text-gray-200 text-sm transition hover:text-gray-50'
                to={`/authors/${post.user.id}`}
              >
                {post.user.displayName}
              </Link>
              <p className='font-semibold text-gray-400 text-xs'>
                {format(new Date(post.updatedAt), 'dd MMM yyyy')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <-------- POST CONTENT --------> */}
      <div className='px-4 lg:px-0 my-12 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed'>
        {post.content}
      </div>

      {/* <-------- POST TAGS --------> */}
      <div className='px-4 lg:px-0 my-12 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed'>
        {post.tags.map((tag) => (
          <Link
            to={`/tags/${tag.id}`}
            className='p-2 text-gray-600 text-sm bg-blue-200 mr-2 rounded'
            key={tag.id}
          >
            {tag.name}
          </Link>
        ))}
      </div>

      {/* <-------- POST COMMENTS --------> */}
      <div className='max-w-screen-md mx-auto min-w-screen'>
        <p className='mt-1 text-xl font-bold text-left text-gray-800 sm:text-2xl md:text-3xl  sm:mx-0'>
          All comments on this post
        </p>
        {post.comments.map((comment) => (
          <CardComment comment={comment} key={comment.id} />
        ))}
      </div>
    </div>
  )
}

export default SinglePost
