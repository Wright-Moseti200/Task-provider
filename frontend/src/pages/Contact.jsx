import React from 'react';

const Contact = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center pt-16 pb-16'>
      <div className='flex flex-col items-center w-3/4 max-w-6xl'>
        {/* Header Section */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-blue-500 mb-4'>Contact Us</h1>
          <p className='text-xl text-gray-600 max-w-3xl'>
            Get in touch with the TaskProviders team. We're here to help you connect with trusted service providers.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 w-full'>
          {/* Contact Information */}
          <div className='bg-white p-8 rounded-lg shadow-lg'>
            <h2 className='text-2xl font-bold text-blue-500 mb-6'>Get In Touch</h2>
            
            <div className='space-y-6'>
              <div className='flex items-start'>
                <div className='bg-blue-100 p-3 rounded-full mr-4'>
                  <span className='text-blue-500'>📧</span>
                </div>
                <div>
                  <h3 className='font-semibold text-lg'>Email Us</h3>
                  <p className='text-gray-600'>support@tasklink.com</p>
                  <p className='text-gray-600'>info@tasklink.com</p>
                </div>
              </div>

              <div className='flex items-start'>
                <div className='bg-blue-100 p-3 rounded-full mr-4'>
                  <span className='text-blue-500'>📞</span>
                </div>
                <div>
                  <h3 className='font-semibold text-lg'>Call Us</h3>
                  <p className='text-gray-600'>+254 714 471 627</p>
                  <p className='text-gray-600'>+254 700 000 000</p>
                </div>
              </div>

              <div className='flex items-start'>
                <div className='bg-blue-100 p-3 rounded-full mr-4'>
                  <span className='text-blue-500'>📍</span>
                </div>
                <div>
                  <h3 className='font-semibold text-lg'>Visit Us</h3>
                  <p className='text-gray-600'>Kabarak University</p>
                  <p className='text-gray-600'>Nakuru, Kenya</p>
                </div>
              </div>

              <div className='flex items-start'>
                <div className='bg-blue-100 p-3 rounded-full mr-4'>
                  <span className='text-blue-500'>🕒</span>
                </div>
                <div>
                  <h3 className='font-semibold text-lg'>Business Hours</h3>
                  <p className='text-gray-600'>Monday - Friday: 8:00 AM - 6:00 PM</p>
                  <p className='text-gray-600'>Saturday: 9:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className='bg-white p-8 rounded-lg shadow-lg'>
            <h2 className='text-2xl font-bold text-blue-500 mb-6'>Send us a Message</h2>
            
            <form className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-gray-700 mb-2'>First Name</label>
                  <input 
                    type='text' 
                    className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    placeholder='Enter your first name'
                  />
                </div>
                <div>
                  <label className='block text-gray-700 mb-2'>Last Name</label>
                  <input 
                    type='text' 
                    className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    placeholder='Enter your last name'
                  />
                </div>
              </div>

              <div>
                <label className='block text-gray-700 mb-2'>Email Address</label>
                <input 
                  type='email' 
                  className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Enter your email'
                />
              </div>

              <div>
                <label className='block text-gray-700 mb-2'>Subject</label>
                <input 
                  type='text' 
                  className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='What is this regarding?'
                />
              </div>

              <div>
                <label className='block text-gray-700 mb-2'>Message</label>
                <textarea 
                  rows='4'
                  className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Tell us how we can help you...'
                ></textarea>
              </div>

              <button 
                type='submit'
                className='w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300'
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Additional Info */}
        <div className='mt-12 text-center'>
          <h3 className='text-xl font-semibold mb-4'>Looking for immediate assistance?</h3>
          <p className='text-gray-600'>
            For urgent matters related to ongoing services or provider issues, please call our support line directly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;