import React, { useState } from 'react'
import AdminSidebar from '../components/Sidebars/AdminSidebar'

const AdminAreaLayout = ({ children }) => {
  const [expanded, setExpanded] = useState(true)

  return (
    <div className='App bg-gray-100 flex'>
      <AdminSidebar
        expanded={expanded}
        onClick={() => setExpanded((curr) => !curr)}
      />
      <main className={`w-full py-2 pr-2`}>{children}</main>
    </div>
  )
}

export default AdminAreaLayout
