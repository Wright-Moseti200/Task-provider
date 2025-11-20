import React, { useState, useContext } from 'react';
import { Contextdata } from '../context/ContextProvider';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const context = useContext(Contextdata);
  const navigate = useNavigate();
  
  const [isLogin, setIsLogin] = useState(true); // true for login, false for signup
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone_number: ''
  });
  const [formErrors, setFormErrors] = useState({});

  // Check if context exists
  if (!context) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Context Not Available</h1>
          <p>Please check your Context Provider setup</p>
        </div>
      </div>
    );
  }

  const { 
    userSignup, 
    userLogin, 
    loading, 
    error, 
    clearError,
    isAuthenticated 
  } = context;

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated()) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Format phone number as user types
    let formattedValue = value;
    if (name === 'phone_number') {
      // Remove all non-digit characters
      const digits = value.replace(/\D/g, '');
      // Format as (XXX) XXX-XXXX
      if (digits.length <= 3) {
        formattedValue = digits;
      } else if (digits.length <= 6) {
        formattedValue = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
      } else {
        formattedValue = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
    // Clear error when user starts typing
    if (error) clearError();
    // Clear specific field error
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Form validation
  const validateForm = () => {
    const errors = {};

    if (!isLogin) {
      // Username validation
      if (!formData.username.trim()) {
        errors.username = 'Username is required';
      } else if (formData.username.length < 3) {
        errors.username = 'Username must be at least 3 characters';
      } else if (formData.username.length > 30) {
        errors.username = 'Username must be less than 30 characters';
      }

      // Phone number validation
      if (!formData.phone_number.trim()) {
        errors.phone_number = 'Phone number is required';
      } else {
        const digitsOnly = formData.phone_number.replace(/\D/g, '');
        if (digitsOnly.length !== 10) {
          errors.phone_number = 'Phone number must be 10 digits';
        }
      }
    }

    // Email validation (both login and signup)
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }

    // Password validation (both login and signup)
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Prepare data for API call
  const prepareSubmitData = () => {
    if (isLogin) {
      return {
        email: formData.email,
        password: formData.password
      };
    } else {
      return {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        phone_number: formData.phone_number.replace(/\D/g, '') // Send only digits
      };
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const submitData = prepareSubmitData();
      let result;
      
      if (isLogin) {
        // Login
        result = await userLogin(submitData.email, submitData.password);
      } else {
        // Signup
        result = await userSignup(submitData);
      }

      if (result && result.success) {
        // Redirect to home page on successful authentication
        navigate('/');
      }
    } catch (err) {
      // Error is already handled in the context
      console.error('Authentication error:', err);
    }
  };

  // Handle form switch (login/signup)
  const handleFormSwitch = () => {
    setIsLogin(!isLogin);
    setFormData({
      username: '',
      email: '',
      password: '',
      phone_number: ''
    });
    setFormErrors({});
    clearError();
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
        {/* Header */}
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-blue-500 mb-2'>TaskLink</h1>
          <h2 className='text-2xl font-semibold text-gray-800'>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className='text-gray-600 mt-2'>
            {isLogin ? 'Sign in to your account' : 'Join TaskLink today'}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4'>
            <p className='font-semibold'>Authentication Error</p>
            <p className='mt-1 text-sm'>{error}</p>
            <button 
              onClick={clearError}
              className='mt-2 text-red-600 hover:text-red-800 text-sm font-medium'
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Login Form */}
        {isLogin && (
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label className='block text-gray-700 mb-2 font-medium'>Email Address</label>
              <input 
                type='email' 
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  formErrors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder='Enter your email'
              />
              {formErrors.email && (
                <p className='text-red-500 text-sm mt-1'>{formErrors.email}</p>
              )}
            </div>

            <div>
              <label className='block text-gray-700 mb-2 font-medium'>Password</label>
              <input 
                type='password' 
                name='password'
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  formErrors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder='Enter your password'
              />
              {formErrors.password && (
                <p className='text-red-500 text-sm mt-1'>{formErrors.password}</p>
              )}
            </div>

            <button 
              type='submit'
              disabled={loading}
              className={`w-full p-3 rounded-lg font-semibold transition duration-300 mt-4 ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {loading ? (
                <div className='flex items-center justify-center'>
                  <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2'></div>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        )}

        {/* Signup Form */}
        {!isLogin && (
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label className='block text-gray-700 mb-2 font-medium'>Username</label>
              <input 
                type='text' 
                name='username'
                value={formData.username}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  formErrors.username ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder='Enter your username'
              />
              {formErrors.username && (
                <p className='text-red-500 text-sm mt-1'>{formErrors.username}</p>
              )}
            </div>

            <div>
              <label className='block text-gray-700 mb-2 font-medium'>Email Address</label>
              <input 
                type='email' 
                name='email'
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  formErrors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder='Enter your email'
              />
              {formErrors.email && (
                <p className='text-red-500 text-sm mt-1'>{formErrors.email}</p>
              )}
            </div>

            <div>
              <label className='block text-gray-700 mb-2 font-medium'>Phone Number</label>
              <input 
                type='tel' 
                name='phone_number'
                value={formData.phone_number}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  formErrors.phone_number ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder='(123) 456-7890'
                maxLength="14"
              />
              {formErrors.phone_number && (
                <p className='text-red-500 text-sm mt-1'>{formErrors.phone_number}</p>
              )}
              <p className='text-gray-500 text-xs mt-1'>
                We'll use this to contact you about your bookings
              </p>
            </div>

            <div>
              <label className='block text-gray-700 mb-2 font-medium'>Password</label>
              <input 
                type='password' 
                name='password'
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  formErrors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder='Create a password (min. 6 characters)'
              />
              {formErrors.password && (
                <p className='text-red-500 text-sm mt-1'>{formErrors.password}</p>
              )}
            </div>

            <button 
              type='submit'
              disabled={loading}
              className={`w-full p-3 rounded-lg font-semibold transition duration-300 mt-4 ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {loading ? (
                <div className='flex items-center justify-center'>
                  <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2'></div>
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </form>
        )}

        {/* Switch between Login and Signup */}
        <div className='mt-6 text-center'>
          <p className='text-gray-600'>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button 
              onClick={handleFormSwitch}
              disabled={loading}
              className='text-blue-500 font-semibold hover:text-blue-600 disabled:text-gray-400'
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>

        {/* Additional Info for Signup */}
        {!isLogin && (
          <div className='mt-4 p-3 bg-blue-50 rounded-lg'>
            <p className='text-blue-700 text-sm text-center'>
              By creating an account, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;