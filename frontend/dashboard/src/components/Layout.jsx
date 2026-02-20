import React from 'react'
import { Link,Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='flex h-screen bg-gray-100'>
      {/* sidebar */}
      <div className="w-64 bg-white shadow-md">
        <h2 className="text-xl font-bold p-4 border-b">
          Teacher Panel
        </h2>

        <nav className="flex flex-col p-2 gap-2">
          <Link
            to="/"
            className="p-2 rounded hover:bg-gray-200"
          >
            Dashboard
          </Link>
           <Link
            to="/students"
            className="p-2 rounded hover:bg-gray-200"
          >
            Students
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout