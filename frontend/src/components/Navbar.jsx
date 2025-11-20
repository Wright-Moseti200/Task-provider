import React, { useState, useContext, useRef, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { Contextdata } from '../context/ContextProvider'

const Navbar = () => {
  const context = useContext(Contextdata)
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Check if user is authenticated
  const isAuthenticated = context?.isAuthenticated?.() || false
  const userToken = context?.userToken
  const userLogout = context?.userLogout

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    if (userLogout) {
      userLogout()
    }
    setIsDropdownOpen(false)
    navigate('/')
  }

  return (
    <div className='h-16 flex justify-center items-center w-full bg-white shadow-sm'>
      <div className='flex w-full justify-around items-center'>
        <h1 className='text-2xl font-bold text-blue-500 cursor-pointer'>
          <Link to="/">TaskProviders</Link>
        </h1>
        
        <div className='flex w-1/3 justify-around items-center'>
          <p className='cursor-pointer hover:text-blue-500 transition duration-200'>
            <Link to="/">Home</Link>
          </p>
          <p className='cursor-pointer hover:text-blue-500 transition duration-200'>
            <Link to="/list">All Providers</Link>
          </p>
          <p className='cursor-pointer hover:text-blue-500 transition duration-200'>
            <Link to="/about">About</Link>
          </p>
          <p className='cursor-pointer hover:text-blue-500 transition duration-200'>
            <Link to="/contact">Contact</Link>
          </p>
        </div>

        {isAuthenticated ? (
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 bg-blue-500 p-3 pl-5 pr-5 rounded-full text-white hover:bg-blue-600 transition duration-200"
            >
              <span>Account</span>
              <svg 
                className={`w-4 h-4 transform transition duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 transform transition-all duration-200 ease-out opacity-0 animate-fade-in">
                <Link 
                  to="/booking" 
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition duration-150"
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span>My Bookings</span>
                  </div>
                </Link>
                
                <Link 
                  to="/payment" 
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition duration-150"
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    <span>Payment</span>
                  </div>
                </Link>
                
                <div className="border-t border-gray-100 my-1"></div>
                
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 transition duration-150"
                >
                  <div className="flex items-center space-x-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Logout</span>
                  </div>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button className='bg-blue-500 p-3 pl-5 pr-5 rounded-full text-white hover:bg-blue-600 transition duration-200'>
            <Link to="/login">Create account</Link>
          </button>
        )}
      </div>

      {/* Add custom animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default Navbar