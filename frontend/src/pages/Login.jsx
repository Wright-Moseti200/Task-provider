import React, { useState } from 'react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // true for login, false for signup

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-blue-500 mb-2'>TaskProviders</h1>
          <h2 className='text-2xl font-semibold text-gray-800'>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className='text-gray-600 mt-2'>
            {isLogin ? 'Sign in to your account' : 'Join TaskLink today'}
          </p>
        </div>

        {/* Login Form */}
        {isLogin && (
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

        {/* Signup Form */}
        {!isLogin && (
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

        {/* Switch between Login and Signup */}
        <div className='mt-6 text-center'>
          <p className='text-gray-600'>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className='text-blue-500 font-semibold hover:text-blue-600'
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;