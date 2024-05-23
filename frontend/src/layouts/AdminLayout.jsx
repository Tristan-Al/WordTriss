import React, { useState } from 'react'
import AdminSidebar, { SidebarItem } from '../components/Sidebar/AdminSidebar'
import {
  ComputerDesktopIcon,
  DocumentTextIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline'

const AdminAreaLayout = ({ children }) => {
  const [expanded, setExpanded] = useState(true)

  return (
    <div className='App bg-gray-100 flex'>
      <AdminSidebar
        expanded={expanded}
        onClick={() => setExpanded((curr) => !curr)}
      />
      <main className={`w-full p-1`}>{children}</main>
    </div>
  )
}

export default AdminAreaLayout
