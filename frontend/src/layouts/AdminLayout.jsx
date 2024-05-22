import React, { useState } from 'react'
import { Sidebar, SidebarItem } from '../components/Sidebar/Sidebar'
import {
  ComputerDesktopIcon,
  DocumentTextIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline'

const AdminAreaLayout = ({ children }) => {
  const [expanded, setExpanded] = useState(true)

  return (
    <div className='min-h-screen bg-gray-200 overflow-hidden'>
      <Sidebar expanded={expanded} setExpanded={setExpanded}>
        <SidebarItem
          icon={<ComputerDesktopIcon width={24} />}
          text={'Dashboard'}
          link={'/wt-content/dashboard'}
        />
        <SidebarItem
          icon={<UserCircleIcon width={24} />}
          text={'Profile'}
          link={'/wt-content/profile'}
        />
        <SidebarItem
          icon={<DocumentTextIcon width={24} />}
          text={'Posts'}
          link={'/wt-content/posts'}
        />
      </Sidebar>
      <main
        className={`p-1 pl-0 transition-all transform duration-600 ${
          expanded ? 'ml-64' : 'ml-20'
        }`}
      >
        {children}
      </main>
    </div>
  )
}

export default AdminAreaLayout
