import React, { useState } from 'react';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-blue-500 mb-2'>TaskProviders</h1>
          <h2 className='text-2xl font-semibold text-gray-800'>
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className='text-gray-600 mt-2'>
            {isSignUp ? 'Join TaskLink today' : 'Sign in to your account'}
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className='flex mb-6 bg-gray-100 rounded-lg p-1'>
          <button
            onClick={() => setIsSignUp(false)}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition duration-300 ${
              !isSignUp
                ? 'bg-blue-500 text-white shadow'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsSignUp(true)}
            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition duration-300 ${
              isSignUp
                ? 'bg-blue-500 text-white shadow'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Sign Up Form */}
        {isSignUp && (
          <form className='space-y-4'>
            <div>
              <label className='block text-gray-700 mb-2 font-medium'>Username</label>
              <input 
                type='text' 
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Enter your username'
              />
            </div>

            <div>
              <label className='block text-gray-700 mb-2 font-medium'>Email Address</label>
              <input 
                type='email' 
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Enter your email'
              />
            </div>

            <div>
              <label className='block text-gray-700 mb-2 font-medium'>Password</label>
              <input 
                type='password' 
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Create a password'
              />
            </div>

            <button 
              type='submit'
              className='w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 mt-4'
            >
              Create Account
            </button>
          </form>
        )}

        {/* Sign In Form */}
        {!isSignUp && (
          <form className='space-y-4'>
            <div>
              <label className='block text-gray-700 mb-2 font-medium'>Email Address</label>
              <input 
                type='email' 
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Enter your email'
              />
            </div>

            <div>
              <label className='block text-gray-700 mb-2 font-medium'>Password</label>
              <input 
                type='password' 
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Enter your password'
              />
            </div>

            <button 
              type='submit'
              className='w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 mt-4'
            >
              Sign In
            </button>
          </form>
        )}

        {/* Footer Text */}
        <div className='mt-6 text-center'>
          <p className='text-gray-600'>
            {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className='text-blue-500 font-semibold hover:text-blue-600'
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;