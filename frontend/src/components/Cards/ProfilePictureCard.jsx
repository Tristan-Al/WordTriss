import React, { useState } from 'react'
import {
  Button,
  Card,
  CardBody,
  Dialog,
  DialogBody,
  IconButton,
  Typography
} from '@material-tailwind/react'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import CustomInput from '../Inputs/CustomInput'

export default function ProfilePictureCard({ user, setUser }) {
  const [open, setOpen] = useState(false)
  // const [file, setFile] = useState(null)

  const handleOpen = () => {
    setOpen((cur) => !cur)
  }

  // const handleFileChange = (e) => {
  //   console.log('File changed:', e)
  //   try {
  //     const d = e.target.files[0]
  //     if (!d) {
  //       console.log('No file selected')
  //       return
  //     }

  //     console.log('File:', d)

  //     // Update the state
  //     setFile(d)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  // const handleUpload = async () => {
  //   if (!file) {
  //     console.log('No file selected')
  //     return
  //   }

  //   console.log('Uploading file:', file)
  //   try {
  //     console.log('Changing file name')
  //     // Rename the file
  //     const newFile = renameFile(file, `${user.username}`)

  //     console.log('File renamed:', newFile)

  //     // Set the file path
  //     const path = `/src/img/avatars/${user.username}`

  //     // Save the file locally
  //     // saveFileLocally(newFile, path)

  //     console.log('File saved locally:', path)

  //     // Update the user object
  //     setUser({ ...user, picture: path })

  //     console.log('User updated:', user)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  // const saveFileLocally = async (file, path) => {
  //   console.log('Saving file locally:', file, path)
  //   try {
  //     // Write the file to the local file system
  //     // await outputFile(path, file)
  //     console.log('File saved successfully:', path)
  //   } catch (error) {
  //     console.error('Failed to save file:', error)
  //     throw error // Rethrow the error to handle it upstream
  //   }
  // }

  // const renameFile = (originalFile, newName) => {
  //   // Extract the file extension
  //   const extension = originalFile.name.split('.').pop()

  //   // Reconstruct the filename with the extension
  //   const finalName = `${newName}.${extension}`

  //   // Create a new file object with the original file's content and the new name
  //   return new File([originalFile], finalName, {
  //     type: originalFile.type,
  //     lastModified: originalFile.lastModified
  //   })
  // }

  return (
    <div className='flex justify-center items-center mb-8'>
      <div className='relative'>
        <img
          className='h-80 w-80 rounded-full object-cover object-center'
          src='https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80'
          alt='nature image'
        />
        <IconButton
          variant='text'
          className='absolute bottom-0 right-0'
          onClick={handleOpen}
        >
          <PencilSquareIcon width={20} />
        </IconButton>
        <Dialog
          open={open}
          handler={handleOpen}
          className='bg-transparent shadow-none'
        >
          <DialogBody className='bg-white'>
            <Card className='mx-auto w-full max-w-[24rem]'>
              <CardBody className='flex flex-col items-center gap-4'>
                <Typography variant='h4' color='blueGray'>
                  Change Profile Picture
                </Typography>
                <CustomInput
                  name='picture'
                  type='file'
                  // onChange={handleFileChange}
                />
                <Button
                  color='blueGray'
                  //  onClick={handleUpload}
                >
                  Upload
                </Button>
              </CardBody>
            </Card>
          </DialogBody>
        </Dialog>
      </div>
    </div>
  )
}
