import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DefaultNavbar from '../../components/Navbar/DefaultNavbar'
import CustomLoginInput from '../../components/Inputs/CustomLoginInput.jsx'
import { ArrowLongRightIcon } from '@heroicons/react/24/outline'
import { Button } from '@material-tailwind/react'
import CustomPasswordInput from '../../components/Inputs/CustomPasswordInput.jsx'
import useAlertToast from '../../hooks/useToast.jsx'
import userService from '../../services/userService.js'
import useSignIn from 'react-auth-kit/hooks/useSignIn'
import authService from '../../services/authService.js'

function Register() {
  const { toast } = useAlertToast()
  const navigate = useNavigate()
  const signIn = useSignIn()
  const [inputs, setInputs] = useState({
    displayName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  /**
   * Handle the input change event and update the state
   * @param {Event} e The event object
   */
  const handleInputChange = (e) => {
    // Deconstruct the name and value from the target
    const { name, value } = e.target

    // Update the state
    setInputs({ ...inputs, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Check if the inputs are empty
    if (
      inputs.displayName.trim() === '' ||
      inputs.username.trim() === '' ||
      inputs.email.trim() === '' ||
      inputs.password.trim() === '' ||
      inputs.confirmPassword.trim() === ''
    ) {
      toast.showError('All fields are required')
      return
    }

    // Check if email is valid

    // Check if passwords match
    if (inputs.password.trim() !== inputs.confirmPassword.trim()) {
      toast.showError('Passwords do not match')
      return
    }

    try {
      // Send request to api
      const response = await authService.register(inputs)

      // If the response isn't ok, throw an error
      if (!response.ok) {
        toast.showError(response.message || 'Error in request')
        return
      }

      // Call the signIn function with the token and user state, then save it in cookies
      signIn({
        auth: {
          token: response.token,
          type: 'Bearer'
        },
        userState: {
          username: inputs.username
        }
      })

      // Alert the user that the login was successful
      toast.showSuccess(response.message || 'Register successfully')

      // Redirect to admin area
      navigate('/wt-content')
    } catch (error) {
      toast.showError(error.message)
    }
  }

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12'>
      <DefaultNavbar />
      <div className='p-10 xs:p-0 mx-auto md:w-full md:max-w-md'>
        <h1 className='font-bold text-center text-2xl mb-5'>Logo</h1>
        <form className='bg-white shadow w-full rounded-lg'>
          <div className='p-5 flex flex-col gap-5'>
            <CustomLoginInput
              label='Display Name'
              name='displayName'
              value={inputs.displayName}
              onChange={handleInputChange}
            />
            <CustomLoginInput
              label='Email'
              name='email'
              value={inputs.email}
              onChange={handleInputChange}
            />
            <CustomLoginInput
              label='Username'
              name='username'
              value={inputs.username}
              onChange={handleInputChange}
            />
            <CustomPasswordInput
              label={'Password'}
              name={'password'}
              value={inputs.password}
              onChange={handleInputChange}
            />
            <CustomPasswordInput
              label={'Confirm Password'}
              name={'confirmPassword'}
              value={inputs.confirmPassword}
              onChange={handleInputChange}
            />

            <Button className='flex justify-center' onClick={handleSubmit}>
              <span className='inline-block mr-2'>Register</span>
              <ArrowLongRightIcon width={18} />
            </Button>
          </div>

          <div className='flex items-center px-5 py-2'>
            <hr className='h-0 border-b border-solid border-grey-500 grow' />
            <p className='mx-4 text-gray-400'>or</p>
            <hr className='h-0 border-b border-solid border-grey-500 grow' />
          </div>

          <div className='p-5 flex flex-col gap-5'>
            <Button variant='outlined' className='flex gap-2 justify-center'>
              <img
                className='h-5 mr-2'
                src='https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png'
                alt=''
              />
              Sign in with Google
            </Button>
          </div>

          <div className='py-5'>
            <div className='grid grid-cols-1 gap-1'>
              <div className='text-center sm:text-right  whitespace-nowrap'>
                <button className='transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-200 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    className='w-4 h-4 inline-block align-text-bottom	'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z'
                    />
                  </svg>
                  <span className='inline-block ml-1'>Help</span>
                </button>
              </div>
            </div>
          </div>
        </form>
        <div className='py-5'>
          <div className='grid grid-cols-2 gap-1'>
            <div className='text-center sm:text-left whitespace-nowrap font-normal text-sm text-gray-500 mx-5'>
              <span className='inline-block'>Do you have an account?</span>
              <Link to='/login' className='font-bold ml-2 hover:text-gray-600'>
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
