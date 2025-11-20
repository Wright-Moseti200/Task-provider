import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Contextdata } from '../context/context';

const Login = () => {
  const { 
    providerSignup, 
    providerLogin, 
    error, 
    clearError,
    token 
  } = useContext(Contextdata);
  
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  
  const [formData, setFormData] = useState({
    category: '',
    username: '',
    email: '',
    phone_number: '',
    password: '',
    about: '',
    services: '',
    loginEmail: '',
    loginPassword: ''
  });

  // Redirect if already logged in
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) clearError();
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (!selectedImage) {
      alert('Please select a profile image');
      return;
    }

    try {
      const providerData = {
        category: formData.category,
        username: formData.username,
        email: formData.email,
        phone_number: formData.phone_number,
        password: formData.password,
        about: formData.about,
        services: formData.services,
      };

      // Use providerSignup function from context (it handles image upload internally)
      const result = await providerSignup(providerData, selectedImage);
      
      if (result.success) {
        navigate('/');
      }
    } catch (err) {
      console.error('Signup failed:', err);
      // Error is automatically handled by context and displayed in the error state
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await providerLogin(formData.loginEmail, formData.loginPassword);
      
      if (result.success) {
        navigate('/');
      }
    } catch (err) {
      console.error('Login failed:', err);
      // Error is automatically handled by context and displayed in the error state
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    clearError();
    setSelectedImage(null);
    setFormData({
      category: '',
      username: '',
      email: '',
      phone_number: '',
      password: '',
      about: '',
      services: '',
      loginEmail: '',
      loginPassword: ''
    });
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-blue-500 mb-2'>TaskProviders</h1>
          <h2 className='text-2xl font-semibold text-gray-800'>
            {isLogin ? 'Welcome Back' : 'Join as Provider'}
          </h2>
          <p className='text-gray-600 mt-2'>
            {isLogin ? 'Sign in to your provider account' : 'Create your service provider account'}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg'>
            <div className="flex justify-between items-center">
              <span>{error}</span>
              <button 
                onClick={clearError}
                className="text-red-700 hover:text-red-900 ml-2 font-bold"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Login Form */}
        {isLogin && (
          <form onSubmit={handleLogin} className='space-y-4'>
            <div>
              <label className='block text-gray-700 mb-2 font-medium'>Email Address</label>
              <input 
                type='email' 
                name='loginEmail'
                value={formData.loginEmail}
                onChange={handleChange}
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Enter your email'
                required
              />
            </div>

            <div>
              <label className='block text-gray-700 mb-2 font-medium'>Password</label>
              <input 
                type='password' 
                name='loginPassword'
                value={formData.loginPassword}
                onChange={handleChange}
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Enter your password'
                required
              />
            </div>

            <button 
              type='submit'
              className='w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-semibold transition duration-300 mt-4'
            >
              Sign In as Provider
            </button>
          </form>
        )}

        {/* Signup Form */}
        {!isLogin && (
          <form onSubmit={handleSignup} className='space-y-4'>
            <div>
              <label className='block text-gray-700 mb-2 font-medium'>Service Category</label>
              <select
                name='category'
                value={formData.category}
                onChange={handleChange}
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
              >
                <option value=''>Select your category</option>
                <option value='Cleaner'>Cleaner</option>
                <option value='Plumber'>Plumber</option>
                <option value='Mover'>Mover</option>
                <option value='Electrician'>Electrician</option>
                <option value='Handyman'>Handyman</option>
                <option value='Gardener'>Gardener</option>
                <option value='Painter'>Painter</option>
                <option value='Carpenter'>Carpenter</option>
              </select>
            </div>

            <div>
              <label className='block text-gray-700 mb-2 font-medium'>Username</label>
              <input 
                type='text' 
                name='username'
                value={formData.username}
                onChange={handleChange}
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Choose a username'
                required
              />
            </div>

            <div>
              <label className='block text-gray-700 mb-2 font-medium'>Email Address</label>
              <input 
                type='email' 
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Enter your email'
                required
              />
            </div>

            <div>
              <label className='block text-gray-700 mb-2 font-medium'>Phone Number</label>
              <input 
                type='tel' 
                name='phone_number'
                value={formData.phone_number}
                onChange={handleChange}
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='e.g., 254712345678'
                required
              />
            </div>

            <div>
              <label className='block text-gray-700 mb-2 font-medium'>Password</label>
              <input 
                type='password' 
                name='password'
                value={formData.password}
                onChange={handleChange}
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Create a password'
                required
              />
            </div>

            <div>
              <label className='block text-gray-700 mb-2 font-medium'>About Yourself</label>
              <textarea
                name='about'
                value={formData.about}
                onChange={handleChange}
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none'
                placeholder='Describe your experience and services...'
                required
              />
            </div>

            <div>
              <label className='block text-gray-700 mb-2 font-medium'>Services Offered</label>
              <input 
                type='text' 
                name='services'
                value={formData.services}
                onChange={handleChange}
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='e.g., Pipe Repair, Drain Cleaning, Faucet Installation'
                required
              />
              <p className='text-sm text-gray-500 mt-1'>Separate services with commas</p>
            </div>

            <div>
              <label className='block text-gray-700 mb-2 font-medium'>Profile Image</label>
              <input 
                type='file' 
                accept="image/*"
                onChange={handleImageSelect}
                className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                required
              />
              {selectedImage && (
                <div className="mt-2">
                  <p className='text-sm text-green-500'>
                    ✓ {selectedImage.name} selected
                  </p>
                  <div className="flex items-center mt-1">
                    <img 
                      src={URL.createObjectURL(selectedImage)} 
                      alt="Preview" 
                      className="w-12 h-12 rounded object-cover mr-2 border"
                    />
                    <span className="text-xs text-gray-500">
                      Ready for upload
                    </span>
                  </div>
                </div>
              )}
            </div>

            <button 
              type='submit'
              disabled={!selectedImage}
              className={`w-full p-3 rounded-lg font-semibold transition duration-300 mt-4 ${
                !selectedImage
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              Create Provider Account
            </button>
          </form>
        )}

        {/* Switch between Login and Signup */}
        <div className='mt-6 text-center'>
          <p className='text-gray-600'>
            {isLogin ? "Don't have a provider account? " : 'Already have a provider account? '}
            <button 
              onClick={switchMode}
              className='text-blue-500 font-semibold hover:text-blue-600'
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>

        {/* Link to user login */}
        <div className='mt-4 text-center'>
          <p className='text-gray-600 text-sm'>
            Looking for services?{' '}
            <Link to="/login" className='text-blue-500 font-semibold hover:text-blue-600'>
              Sign in as User
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;