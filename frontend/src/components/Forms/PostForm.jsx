import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Typography
} from '@material-tailwind/react'
import { Editor } from '@tinymce/tinymce-react'
import EditPostSidebar from '../Sidebars/EditPostSidebar'

export default function PostForm({
  post,
  setPost,
  handleSubmit,
  handleInputChange,
  title = 'Edit Post'
}) {
  const navigate = useNavigate()
  const editorRef = useRef(null)

  return (
    <form
      onSubmit={handleSubmit}
      className='min-h-screen flex flex-col lg:flex-row gap-4 lg:gap-2 mx-auto px-2 lg:px-0 bg-gray-200 dark:bg-gray-900'
    >
      <Card className='w-full h-min ml-2 my-2 dark:bg-blue-gray-900'>
        <CardHeader
          floated={false}
          shadow={false}
          className='m-0 p-3 rounded-b-none bg-gray-300 dark:bg-blue-gray-700 dark:text-gray-100 flex justify-between items-center'
        >
          <div className='flex gap-2'>
            <Typography variant='h3'>{title}</Typography>
            {post.id && (
              <Button
                size='sm'
                variant='text'
                onClick={() => navigate(`/posts/${post.id}`)}
                className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300'
              >
                Preview
              </Button>
            )}
          </div>
          <div className='flex gap-2'>
            <Button
              variant='outlined'
              className='dark:text-gray-200 dark:border-gray-200'
              onClick={() => navigate('/wt-content/posts')}
            >
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Save</Button>
          </div>
        </CardHeader>
        <CardBody className='container mx-auto h-auto flex flex-col gap-5'>
          <Input
            variant='static'
            placeholder='Title'
            className='text-xl dark:text-gray-200'
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
      <EditPostSidebar post={post} setPost={setPost} />
    </form>
  )
}
