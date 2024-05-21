import React from 'react'
import Navbar from '../components/Navbar/Navbar'

const DefaultLayout = ({ children }) => {
  return (
    <div className='wrapper dark:bg-gray-900'>
      <Navbar />
      <main>{children}</main>
    </div>
  )
}

export default DefaultLayout
