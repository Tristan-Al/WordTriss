import React, { useEffect, useState } from 'react'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  IconButton,
  Input,
  Spinner,
  Textarea,
  Typography
} from '@material-tailwind/react'
import ProfilePictureCard from '../../../components/Cards/ProfilePictureCard'
import userService from '../../../services/userService'
import useAuth from '../../../hooks/useAuth'
import useAlertToast from '../../../hooks/useToast'
import {
  EyeIcon,
  EyeSlashIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline'

export default function Profile() {
  const { toast } = useAlertToast()
  const [loading, setLoading] = useState(true)
  const [pVisible, setPVisible] = useState(false)
  const [user, setUser] = useState({
    id: 0,
    displayName: '',
    email: '',
    username: '',
    password: '',
    biography: '',
    picture: ''
  })
  const { userId, roleName } = useAuth()

  useEffect(() => {
    async function getUser() {
      try {
        const user = await userService.getUserById(userId)
        setUser(user)
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoading(false)
        toast.showError('Error getting user')
      }
    }

    setTimeout(getUser, 1000)
  }, [])

  /**
   * Handle the input change event and update the state
   * @param {Event} e The event object
   */
  const handleInputChange = (e) => {
    // Deconstruct the name and value from the target
    const { name, value } = e.target

    // Update the state
    setUser({ ...user, [name]: value })
  }

  const handleSubmit = async (e) => {
    // Prevent the default form submission behavior
    e.preventDefault()

    // Check if the inputs are empty
    if (user.username.trim() === '' || user.email.trim() === '') {
      toast.showError('All fields are required')
      return
    }

    try {
      const updatedUser = await userService.updateUser(user, userId, roleName)

      if (!updatedUser.ok) {
        toast.showError(updatedUser.message || 'Error in request')
        return
      }

      console.log('User updated successfully:', updatedUser)
      toast.showSuccess(updatedUser.message)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Card>
        <CardHeader
          floated={false}
          shadow={false}
          className='m-0 p-3 rounded-b-none bg-gray-300 flex justify-between items-center'
        >
          <Typography variant='h3'>My account</Typography>
          <Button onClick={handleSubmit}>Save</Button>
        </CardHeader>
        <CardBody className='flex justify-center items-center container mx-auto flex-auto bg-white'>
          {loading ? (
            <Spinner />
          ) : (
            <form>
              <ProfilePictureCard />
              <div>
                <Typography
                  variant='h6'
                  className='uppercase font-bold text-sm mb-2'
                >
                  User Information
                </Typography>
                <div className='flex flex-wrap'>
                  <div className='w-full lg:w-1/2 px-4 mb-6'>
                    <CustomInput
                      label={'Username'}
                      placeholder={'Username'}
                      name={'username'}
                      value={user.username}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='w-full lg:w-1/2 px-4 mb-6'>
                    <CustomInput
                      label={'Email'}
                      placeholder={'Email'}
                      name={'email'}
                      value={user.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='w-full lg:w-6/12 px-4 mb-6 lg:mb-0'>
                    <CustomInput
                      label={'Display Name'}
                      placeholder={'Display Name'}
                      name={'displayName'}
                      value={user.displayName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className='relative flex justify-between w-full lg:w-6/12 px-4'>
                    <CustomInput
                      label={'Password'}
                      type={pVisible ? 'text' : 'password'}
                      placeholder={'Your password'}
                      name={'password'}
                      value={user.password}
                      onChange={handleInputChange}
                    />
                    <IconButton
                      variant='text'
                      onClick={() => setPVisible(!pVisible)}
                      color={user.password ? 'gray' : 'blue-gray'}
                      className='!absolute right-5 bottom-0'
                    >
                      {pVisible ? (
                        <EyeIcon width={20} />
                      ) : (
                        <EyeSlashIcon width={20} />
                      )}
                    </IconButton>
                  </div>
                </div>
              </div>

              <hr className='my-8 border-b-1 border-gray-300' />

              <div>
                <Typography
                  variant='h6'
                  className='uppercase font-bold text-sm mb-2'
                >
                  Contact Information
                </Typography>

                <div className='flex flex-wrap'>
                  <div className='w-full lg:w-12/12 px-4 mb-6'>
                    <CustomInput
                      label={'Address'}
                      name={'address'}
                      placeholder={'Address'}
                    />
                  </div>
                  <div className='w-full lg:w-4/12 px-4 mb-6 lg:mb-0'>
                    <CustomInput
                      label={'City'}
                      name={'city'}
                      placeholder={'City'}
                    />
                  </div>
                  <div className='w-full lg:w-4/12 px-4 mb-6 lg:mb-0'>
                    <CustomInput
                      label={'Country'}
                      name={'country'}
                      placeholder={'Country'}
                    />
                  </div>
                  <div className='w-full lg:w-4/12 px-4'>
                    <CustomInput
                      label={'Postal code'}
                      name={'postcode'}
                      placeholder={'Postal Code'}
                    />
                  </div>
                </div>
              </div>

              <hr className='my-8 border-b-1 border-blueGray-300' />

              <div>
                <Typography
                  variant='h6'
                  className='uppercase font-bold text-sm mb-2'
                >
                  About Me
                </Typography>
                <div className='flex flex-wrap'>
                  <div className='w-full lg:w-12/12 px-4'>
                    <div className='relative w-full mb-3'>
                      <Textarea
                        className='!border-0 placeholder-gray-500 text-gray-600 text-sm shadow-md shadow-gray-300 focus:shadow-xl'
                        labelProps={{
                          className: 'before:content-none after:content-none'
                        }}
                        placeholder='Your description'
                        name='biography'
                        value={user.biography}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </CardBody>
      </Card>
    </>
  )
}

function CustomInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text'
}) {
  return (
    <div className='relative w-full'>
      <label className='block uppercase text-xs font-bold mb-2' htmlFor={name}>
        {label}
      </label>
      <Input
        type={type}
        name={name}
        placeholder={placeholder}
        className='!border-0 p-3 placeholder-gray-500 text-gray-600 text-sm shadow-md shadow-gray-300 focus:shadow-xl w-full ease-linear transition-all duration-150'
        labelProps={{
          className: 'before:content-none after:content-none'
        }}
        defaultValue={value}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
