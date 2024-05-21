import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { format } from 'date-fns'
import postService from '../../services/postService'
import Loading from '../../components/Loading/Loading'
import SingleCommentCard from '../../components/Cards/SingleCommentCard'
import SingleCategoryLink from '../../components/Links/SingleCategoryLink'
import SingleAuthorCard from '../../components/Cards/SingleAuthorCard'
import SingleTagLink from '../../components/Links/SingleTagLink'

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
          {post.categories.map((categoryId) => (
            <SingleCategoryLink categoryId={categoryId} />
          ))}
          <h2 className='text-4xl font-semibold text-gray-100 leading-tight'>
            {post.title}
          </h2>
          <SingleAuthorCard
            authorId={post.userId}
            date={format(new Date(post.updatedAt), 'dd MMM yyyy')}
          />
        </div>
      </div>

      {/* <-------- POST CONTENT --------> */}
      <div className='px-4 lg:px-0 my-12 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed'>
        {post.content}
      </div>

      {/* <-------- POST TAGS --------> */}
      <div className='px-4 lg:px-0 my-12 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed'>
        {post.tags.map((tagId) => (
          <SingleTagLink tagId={tagId} />
        ))}
      </div>

      {/* <-------- POST COMMENTS --------> */}
      <div className='max-w-screen-md mx-auto min-w-screen'>
        <p className='mt-1 text-xl font-bold text-left text-gray-800 sm:text-2xl md:text-3xl  sm:mx-0'>
          All comments on this post
        </p>
        {post.comments.map((commentId) => (
          <SingleCommentCard commentId={commentId} />
        ))}
      </div>
    </div>
  )
}

export default SinglePost
