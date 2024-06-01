import React, { useEffect, useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'

import { useNavigate, useParams } from 'react-router-dom'
import postService from '../../../services/postService'
import categoryService from '../../../services/categoryService'
import tagService from '../../../services/tagService'
import imageService from '../../../services/imageService'
import useAlertToast from '../../../hooks/useToast'
import useAuth from '../../../hooks/useAuth'

import defaultImage from '../../../assets/img/default-image.png'

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Dialog,
  DialogBody,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemSuffix,
  Option,
  Select,
  Typography
} from '@material-tailwind/react'
import userService from '../../../services/userService'
import {
  PencilSquareIcon,
  PlusIcon,
  TrashIcon
} from '@heroicons/react/24/outline'

function EditPostThumbnail({ post, setPost }) {
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const { toast } = useAlertToast()

  useEffect(() => {
    if (post.thumbnail) {
      if (post.thumbnail.startsWith('http')) {
        setPreview(post.thumbnail)
      } else {
        setPreview(
          `${import.meta.env.VITE_API_BASE_URL}/images/post-thumbnails/${
            post.thumbnail
          }`
        )
      }
    } else {
      setPreview(defaultImage)
    }
  }, [post.thumbnail])

  const handleOpen = () => {
    setOpen((cur) => !cur)
  }

  const handleFileChange = (e) => {
    try {
      const uploadedFile = e.target.files[0]
      if (!uploadedFile) {
        console.log('No file selected')
        return
      }

      // Update the state
      setFile(uploadedFile)
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      console.log('No file selected')
      return
    }

    try {
      // Rename the file
      const newFile = renameFile(file, `post-${post.id}-thumbnail`)
      // Send the file to the server
      const formData = new FormData()
      formData.append('thumbnail', newFile)

      const response = await imageService.uploadThumbnail(formData)

      if (response.ok) {
        setOpen(false)

        // Update the post object
        setPost({ ...post, thumbnail: newFile.name })

        // Update the preview

        setPreview(URL.createObjectURL(newFile))

        // Show a success message
        toast.showSuccess('File uploaded successfully')
      } else {
        setOpen(false)
        toast.showError('Error uploading file')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const renameFile = (originalFile, newName) => {
    // Extract the file extension
    const extension = originalFile.name.split('.').pop()

    // Create a new file object
    const newFile = new File([originalFile], `${newName}.${extension}`, {
      type: originalFile.type
    })

    return newFile
  }

  return (
    <Card className='w-full p-2 drop-shadow-sm'>
      <div className='flex justify-between items-center pb-2 mb-2 border-b border-gray-300 '>
        <Typography variant='h5' color='blue-gray' className=''>
          Thumbnail
        </Typography>
        <IconButton variant='text' onClick={handleOpen}>
          <PencilSquareIcon width={20} />
        </IconButton>
      </div>
      <div className='mb-2 flex gap-1'>
        <img
          className='h-auto max-h-32 w-full rounded-lg object-cover object-center'
          src={preview}
          alt='nature image'
        />
      </div>
      <Dialog
        open={open}
        handler={handleOpen}
        className='bg-transparent shadow-none'
      >
        <DialogBody className='bg-transparent'>
          <Card className='mx-auto w-full max-w-[24rem]'>
            <CardBody className='flex flex-col items-center gap-4'>
              <Typography variant='h4'>Change Thumbnail</Typography>
              <input name='picture' type='file' onChange={handleFileChange} />
              <div className='flex gap-4'>
                <Button variant='outlined' onClick={handleOpen}>
                  Cancel
                </Button>
                <Button onClick={handleUpload}>Upload</Button>
              </div>
            </CardBody>
          </Card>
        </DialogBody>
      </Dialog>
    </Card>
  )
}

function Sidebar({ post, setPost }) {
  const { toast } = useAlertToast()
  const { roleName } = useAuth()
  const [category, setCategory] = useState('')
  const [tag, setTag] = useState('')
  const [authors, setAuthors] = useState([])

  useEffect(() => {
    async function getAuthors() {
      try {
        const response = await userService.getAllUsers({ limit: 100 })

        if (!response.ok) {
          console.log('Failed to get authors')
          return
        }

        const authors = await response.body.users

        setAuthors(authors)
      } catch (error) {
        toast.showError('Error getting authors:', error)
      }
    }

    getAuthors()
  }, [])

  const handleNewCategory = (evt) => {
    // Check if the category is empty
    if (!category) {
      toast.showError('Category name cannot be empty')
      return
    }

    // Check if the category already exists
    const exists = post.categories.find(
      (cat) => cat.name.toLowerCase() === category.toLowerCase()
    )

    if (exists) {
      toast.showError('Category already exists')
      return
    }

    // Add the category to the post
    setPost({
      ...post,
      categories: [...post.categories, { name: category }]
    })
  }

  const handleDeleteCategory = (category) => {
    setPost({
      ...post,
      categories: post.categories.filter((cat) => cat.name !== category.name)
    })
  }

  const handleNewTag = (evt) => {
    // Check if the tag is empty
    if (!tag) {
      toast.showError('Tag name cannot be empty')
      return
    }

    // Check if the tag already exists
    const exists = post.tags.find(
      (ta) => ta.name.toLowerCase() === tag.toLowerCase()
    )

    if (exists) {
      toast.showError('Tag already exists')
      return
    }

    // Add the tag to the post
    setPost({
      ...post,
      tags: [...post.tags, { name: tag }]
    })
  }

  const handleDeleteTag = (tag) => {
    setPost({
      ...post,
      tags: post.tags.filter((ta) => ta.name !== tag.name)
    })
  }

  return (
    <aside className='min-h-screen min-w-72 m-2 p-2 sticky top-0 z-50 overflow-hidden flex flex-col gap-2 bg-gray-50 border-r shadow rounded-lg'>
      <Typography
        variant='h5'
        color='gray'
        className='w-full p-2 bg-gray-300 shadow rounded-lg uppercase'
      >
        Sidebar
      </Typography>

      <ul className='flex flex-col gap-2'>
        <li className='my-1'>
          <Card className='w-full p-2 drop-shadow-sm'>
            <Typography
              variant='h5'
              color='blue-gray'
              className='border-b border-gray-300 pb-2 mb-2'
            >
              Categories
            </Typography>
            <div className='mb-2 flex gap-1'>
              <Input
                type='text'
                placeholder='Category Name'
                className='!p-2 !border !border-gray-300 bg-white text-gray-900 shadow-none focus:shadow-md shadow-gray-900/5 placeholder:text-gray-500 placeholder:opacity-100'
                labelProps={{
                  className: 'hidden'
                }}
                containerProps={{ className: 'min-w-[100px]' }}
                onChange={(e) => setCategory(e.target.value)}
              />
              <IconButton
                variant='text'
                color='blue-gray'
                onClick={() => handleNewCategory(category)}
              >
                <PlusIcon width={20} />
              </IconButton>
            </div>
            <List className='min-w-full p-0'>
              {post.categories.map((category) => (
                <ListItem key={category.name} className='p-1'>
                  {category.name}
                  <ListItemSuffix>
                    <IconButton
                      variant='text'
                      color='blue-gray'
                      onClick={() => handleDeleteCategory(category)}
                    >
                      <TrashIcon width={20} />
                    </IconButton>
                  </ListItemSuffix>
                </ListItem>
              ))}
            </List>
          </Card>
        </li>

        <li className='my-1'>
          <Card className='w-full p-2 drop-shadow-sm'>
            <Typography
              variant='h5'
              color='blue-gray'
              className='border-b border-gray-300 pb-2 mb-2'
            >
              Tags
            </Typography>
            <div className='mb-2 flex gap-1'>
              <Input
                type='text'
                placeholder='Tag Name'
                className='!p-2 !border !border-gray-300 bg-white text-gray-900 shadow-none focus:shadow-md shadow-gray-900/5 placeholder:text-gray-500 placeholder:opacity-100'
                labelProps={{
                  className: 'hidden'
                }}
                containerProps={{ className: 'min-w-[100px]' }}
                onChange={(e) => setTag(e.target.value)}
              />
              <IconButton
                variant='text'
                color='blue-gray'
                onClick={() => handleNewTag(tag)}
              >
                <PlusIcon width={20} />
              </IconButton>
            </div>
            <List className='min-w-full p-0'>
              {post.tags.map((tag) => (
                <ListItem key={tag.name} className='p-1'>
                  {tag.name}
                  <ListItemSuffix>
                    <IconButton
                      variant='text'
                      color='blue-gray'
                      onClick={() => handleDeleteTag(tag)}
                    >
                      <TrashIcon width={20} />
                    </IconButton>
                  </ListItemSuffix>
                </ListItem>
              ))}
            </List>
          </Card>
        </li>

        <li className='my-1'>
          <Card className='w-full p-2 drop-shadow-sm z-10'>
            <Typography
              variant='h5'
              color='blue-gray'
              className='border-b border-gray-300 pb-2 mb-2'
            >
              Author
            </Typography>
            <div className='mb-2 flex gap-1'>
              <Select
                placeholder='Select author'
                className='!border !border-gray-300 text-gray-900 focus:shadow-md shadow-gray-900/5 placeholder:text-gray-500 placeholder:opacity-100'
                value={post.userId.toString()}
                labelProps={{
                  className: 'hidden'
                }}
                onChange={(value) => {
                  console.log('Value:', value)
                  setPost({ ...post, userId: parseInt(value) })
                }}
                disabled={
                  (roleName === 'CONTRIBUTOR' && true) ||
                  (roleName === 'AUTHOR' && true) ||
                  false
                }
              >
                {authors.map((author) => (
                  <Option key={author.id} value={author.id.toString()}>
                    {author.id} {author.displayName}
                  </Option>
                ))}
              </Select>
            </div>
          </Card>
        </li>

        <li className='my-1'>
          <EditPostThumbnail post={post} setPost={setPost} />
        </li>
      </ul>

      {/* <AdminAuthorSidebarCard expanded={expanded} /> */}
    </aside>
  )
}

function PostForm({ post, setPost, handleSubmit, handleInputChange }) {
  const navigate = useNavigate()
  const editorRef = useRef(null)

  return (
    <form onSubmit={handleSubmit} className='flex items-start bg-gray-200'>
      <Card className='w-full ml-2 my-2'>
        <CardHeader
          floated={false}
          shadow={false}
          className='m-0 p-3 rounded-b-none bg-gray-300 flex justify-between items-center'
        >
          <Typography variant='h3'>Edit post</Typography>
          <div className='flex gap-2'>
            <Button
              variant='outlined'
              onClick={() => navigate('/wt-content/posts')}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Save</Button>
          </div>
        </CardHeader>
        <CardBody className='container mx-auto h-auto bg-white flex flex-col gap-5'>
          <Input
            variant='static'
            placeholder='Title'
            className='text-xl'
            name='title'
            labelProps={{
              className: 'before:content-none after:content-none'
            }}
            value={post.title}
            onChange={handleInputChange}
          />
          <Editor
            apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}
            onInit={(evt, editor) => (editorRef.current = editor)}
            name='content'
            value={post.content}
            init={{
              height: 500,
              menubar: true,
              theme: 'silver',
              plugins: [
                'image',
                'code',
                'table',
                'link',
                'media',
                'codesample'
              ],
              // plugins: [
              //   'advlist autolink lists link image charmap print preview anchor',
              //   'visualblocks code fullscreen',
              //   'searchreplace insertdatetime media table paste code help wordcount'
              // ],
              toolbar:
                'undo redo | formatselect | styles |' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help'
            }}
            onEditorChange={(content) =>
              handleInputChange({
                target: {
                  name: 'content',
                  value: content
                }
              })
            }
          />
        </CardBody>
      </Card>
      <Sidebar post={post} setPost={setPost} />
    </form>
  )
}

export default function EditPost() {
  let { id } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useAlertToast()
  const { userId, roleName } = useAuth()

  const [post, setPost] = useState({
    id: '',
    title: '',
    content: '',
    thumbnail: '',
    status: 'published',
    userId: '',
    categories: [],
    tags: []
  })

  useEffect(() => {
    async function getPost() {
      try {
        const response = await postService.getPostById(id)

        if (!response.ok) {
          console.log('Failed to get posts')
          return
        }

        const post = await response.body

        // Get categories
        const categories = await getCategoriesOfPost(post)
        post.categories = categories

        // Get tags
        const tags = await getTagsOfPost(post)
        post.tags = tags

        setPost(post)
      } catch (error) {
        toast.showError('Error getting post:', error)
      }
    }

    async function getCategoriesOfPost(post) {
      try {
        const categoryPromises = post.categories.map(async (category) => {
          const response = await categoryService.getCategoryById(category)
          if (!response.ok) {
            console.log('Failed to get category')
            return null // Return null
          }
          return response.body
        })

        const categories = await Promise.all(categoryPromises)

        return categories
      } catch (error) {
        toast.showError('Error getting categories:', error)
      }
    }

    async function getTagsOfPost(post) {
      try {
        const tagsPromises = post.tags.map(async (tag) => {
          const response = await tagService.getTagById(tag)
          if (!response.ok) {
            console.log('Failed to get tag')
            return null // Return null
          }
          return response.body
        })

        const tags = await Promise.all(tagsPromises)

        return tags
      } catch (error) {
        toast.showError('Error getting tags:', error)
      }
    }

    async function loadPage() {
      await getPost()

      setIsLoading(false)
    }

    loadPage()
  }, [])

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault()

    // Check if main fields are empty
    if (!post.title || !post.content) {
      toast.showError('Title and content are required')
      return
    }

    switch (roleName) {
      case 'CONTRIBUTOR':
        // Check if user is editing their own post
        if (post.userId !== parseInt(userId)) {
          toast.showError('You are not allowed to edit posts by other authors')
          return
        }

        // Check if the post is published
        if (post.status === 'published') {
          toast.showError('You are not allowed to publish posts')
          return
        }

        break
      case 'AUTHOR':
        // Check if user is editing their own post
        if (post.userId !== parseInt(userId)) {
          toast.showError('You are not allowed to edit posts by other authors')
          return
        }

        break
      default:
        break
    }

    // Call the update post service
    const response = await postService.updatePost(post)

    if (!response.ok) {
      console.error('Error updating post:', response)
      toast.showError(`Error updating post ${response.message}`)
      return
    }

    // Show a success message
    toast.showSuccess('Post updated successfully')

    setPost(response.body)

    console.log('Post:', post)

    // Force a reload of the page
    window.location.reload()
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
    <PostForm
      post={post}
      setPost={setPost}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  )
}
