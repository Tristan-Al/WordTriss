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
import useAlertToast from '../../hooks/useToast'
import defaultAvatar from '../../assets/img/default-avatar.jpg'
import { useEffect } from 'react'
import imageService from '../../services/imageService'

export default function ProfilePictureCard({ user, setUser }) {
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const { toast } = useAlertToast()

  useEffect(() => {
    if (user.picture) {
      setPreview(
        `${import.meta.env.VITE_API_BASE_URL}/images/avatars/${user.picture}`
      )
    }
  }, [])

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
      const newFile = renameFile(file, `${user.username}`)

      // Send the file to the server
      const formData = new FormData()
      formData.append('avatar', newFile)
      const response = await imageService.uploadAvatar(formData)

      if (response.ok) {
        setOpen(false)

        // Update the user object
        setUser({ ...user, picture: newFile.name })

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

    // Reconstruct the filename with the extension
    const finalName = `${newName}.${extension}`

    // Create a new file object with the original file's content and the new name
    return new File([originalFile], finalName, {
      type: originalFile.type,
      lastModified: originalFile.lastModified
    })
  }

  return (
    <div className='flex justify-center mb-8'>
      <div className='relative'>
        <img
          className='h-80 w-80 rounded-full object-cover object-center'
          src={preview ? preview : defaultAvatar}
          alt='nature image'
        />
        <IconButton
          variant='text'
          className='!absolute bottom-0 right-0'
          onClick={handleOpen}
        >
          <PencilSquareIcon width={20} />
        </IconButton>
        <Dialog
          open={open}
          handler={handleOpen}
          className='bg-transparent shadow-none'
        >
          <DialogBody className='bg-transparent'>
            <Card className='mx-auto w-full max-w-[24rem]'>
              <CardBody className='flex flex-col items-center gap-4'>
                <Typography variant='h4'>Change Profile Picture</Typography>
                <CustomInput
                  name='picture'
                  type='file'
                  onChange={handleFileChange}
                />
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
      </div>
    </div>
  )
}
