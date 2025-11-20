import React from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Two-column layout */}
      <div className='flex'>
        {/* Sidebar Navigation */}
        <div className='w-64 bg-white shadow-lg min-h-screen'>
          <div className='p-6'>
            {/* Logo/Brand */}
            <h1 className='text-2xl font-bold text-blue-500 mb-8'>TaskProviders</h1>
            
            {/* Navigation Links */}
            <nav className='space-y-2'>
              <NavLink 
                to="/" 
                end
                className={({ isActive }) => 
                  `flex items-center p-3 rounded-lg transition duration-300 ${
                    isActive 
                      ? 'bg-blue-500 text-white' 
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-500'
                  }`
                }
              >
                Dashboard
              </NavLink>

              <NavLink 
                to="/bookings" 
                className={({ isActive }) => 
                  `flex items-center p-3 rounded-lg transition duration-300 ${
                    isActive 
                      ? 'bg-blue-500 text-white' 
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-500'
                  }`
                }
              >
                Bookings
              </NavLink>

              <NavLink 
                to="/payments" 
                className={({ isActive }) => 
                  `flex items-center p-3 rounded-lg transition duration-300 ${
                    isActive 
                      ? 'bg-blue-500 text-white' 
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-500'
                  }`
                }
              >
                Payments
              </NavLink>
            </nav>

            {/* Logout Button */}
            <div className='mt-8 pt-8 border-t border-gray-200'>
              <button 
                onClick={handleLogout}
                className='flex items-center w-full p-3 text-red-600 rounded-lg hover:bg-red-50 transition duration-300'
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className='flex-1 p-6'>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default Navbar