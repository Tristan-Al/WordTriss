import React from 'react'
import { Input } from '@material-tailwind/react'

export default function CustomLoginInput({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  className = ''
}) {
  return (
    <div className='relative w-full'>
      <Input
        label={label}
        type={type}
        name={name}
        placeholder={placeholder}
        className={`p-3 placeholder-gray-500 text-gray-600 text-sm shadow shadow-gray-300 focus:shadow-xl w-full ease-linear transition-all duration-150 !border-gray-100 ${className}`}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
