import React from 'react';

const About = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center pt-16 pb-16'>
      <div className='flex flex-col items-center w-3/4 max-w-6xl'>
        {/* Header Section */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-blue-500 mb-4'>About TaskLink</h1>
          <p className='text-xl text-gray-600 max-w-3xl'>
            Connecting Kenyan households with trusted local service professionals through innovative technology
          </p>
        </div>

        {/* Mission & Vision */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 mb-16'>
          <div className='bg-white p-8 rounded-lg shadow-lg'>
            <h2 className='text-2xl font-bold text-blue-500 mb-4'>Our Mission</h2>
            <p className='text-gray-700 leading-8'>
              To bridge the service gap in Kenya's informal labor market by providing a reliable, 
              accessible platform that connects users with verified local service providers for 
              on-demand home services.
            </p>
          </div>
          
          <div className='bg-white p-8 rounded-lg shadow-lg'>
            <h2 className='text-2xl font-bold text-blue-500 mb-4'>Our Vision</h2>
            <p className='text-gray-700 leading-8'>
              To become Kenya's leading digital marketplace for home services, promoting 
              transparency, safety, and economic empowerment for service professionals 
              while ensuring quality and reliability for customers.
            </p>
          </div>
        </div>

        {/* The Problem We Solve */}
        <div className='w-full mb-16'>
          <h2 className='text-3xl font-bold text-center mb-8'>The Challenge We Address</h2>
          <div className='bg-gray-50 p-8 rounded-lg'>
            <p className='text-gray-700 leading-8 text-center'>
              Kenyan consumers frequently lack a safe and dependable method of contacting reputable 
              service providers for routine home maintenance. Informal agreements often lead to 
              poor workmanship, safety hazards, and financial disputes, while skilled providers 
              struggle with underemployment due to lack of exposure and scheduling tools.
            </p>
          </div>
        </div>

        {/* Our Solution */}
        <div className='w-full mb-16'>
          <h2 className='text-3xl font-bold text-center mb-8'>Our Innovative Solution</h2>
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            <div className='text-center p-6'>
              <div className='bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-blue-500 text-2xl font-bold'>✓</span>
              </div>
              <h3 className='text-xl font-semibold mb-3'>Verified Providers</h3>
              <p className='text-gray-600'>
                Localized provider verification including business permits and national 
                identification checks to ensure trust and safety.
              </p>
            </div>
            
            <div className='text-center p-6'>
              <div className='bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-blue-500 text-2xl font-bold'>📱</span>
              </div>
              <h3 className='text-xl font-semibold mb-3'>Mobile-First Design</h3>
              <p className='text-gray-600'>
                Optimized for low-bandwidth settings with offline functionality and 
                SMS integration for areas with unreliable connectivity.
              </p>
            </div>
            
            <div className='text-center p-6'>
              <div className='bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
                <span className='text-blue-500 text-2xl font-bold'>⭐</span>
              </div>
              <h3 className='text-xl font-semibold mb-3'>Rating System</h3>
              <p className='text-gray-600'>
                Transparent customer-generated ratings and reviews to maintain service 
                quality and build community trust.
              </p>
            </div>
          </div>
        </div>

        {/* Services We Offer */}
        <div className='w-full mb-16'>
          <h2 className='text-3xl font-bold text-center mb-8'>Services We Offer</h2>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6 text-center'>
            <div className='bg-white p-4 rounded-lg shadow-md'>
              <h3 className='font-semibold text-lg mb-2'>House Cleaning</h3>
              <p className='text-gray-600 text-sm'>Professional cleaning services</p>
            </div>
            <div className='bg-white p-4 rounded-lg shadow-md'>
              <h3 className='font-semibold text-lg mb-2'>Plumbing</h3>
              <p className='text-gray-600 text-sm'>Expert plumbing solutions</p>
            </div>
            <div className='bg-white p-4 rounded-lg shadow-md'>
              <h3 className='font-semibold text-lg mb-2'>Moving Assistance</h3>
              <p className='text-gray-600 text-sm'>Reliable moving help</p>
            </div>
            <div className='bg-white p-4 rounded-lg shadow-md'>
              <h3 className='font-semibold text-lg mb-2'>Handyman Services</h3>
              <p className='text-gray-600 text-sm'>General repair and maintenance</p>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className='w-full text-center'>
          <h2 className='text-3xl font-bold mb-8'>Built With Modern Technology</h2>
          <div className='bg-gray-50 p-8 rounded-lg'>
            <p className='text-gray-700 leading-8 mb-6'>
              TaskLink leverages cutting-edge technologies including React.js, Node.js, Firebase, 
              and Flutter to deliver a scalable, efficient platform that works seamlessly across 
              all devices, even in low-connectivity environments.
            </p>
            <div className='flex justify-center space-x-6 text-sm text-gray-600'>
              <span className='bg-white px-3 py-1 rounded'>React.js</span>
              <span className='bg-white px-3 py-1 rounded'>Node.js</span>
              <span className='bg-white px-3 py-1 rounded'>Firebase</span>
              <span className='bg-white px-3 py-1 rounded'>Flutter</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;