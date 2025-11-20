import React, { useState } from 'react';

const Contact = () => {
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult("Sending...");

    const formData = new FormData(event.target);
    
    // Add your Web3Forms access key
    formData.append("access_key", "47bd7ea9-4143-497b-86c1-a3b133f7f8fc");
    
    // Optional: Add subject if not provided
    if (!formData.get('subject')) {
      formData.append("subject", "New Contact Form Submission from TaskProviders");
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setResult("Message sent successfully! We'll get back to you soon.");
        event.target.reset();
      } else {
        console.log("Error", data);
        setResult(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.log("Error", error);
      setResult("Failed to send message. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            
            <form onSubmit={onSubmit} className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label htmlFor='firstName' className='block text-gray-700 mb-2'>First Name</label>
                  <input 
                    id='firstName'
                    type='text' 
                    name='firstName'
                    className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    placeholder='Enter your first name'
                    required
                  />
                </div>
                <div>
                  <label htmlFor='lastName' className='block text-gray-700 mb-2'>Last Name</label>
                  <input 
                    id='lastName'
                    type='text' 
                    name='lastName'
                    className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    placeholder='Enter your last name'
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor='email' className='block text-gray-700 mb-2'>Email Address</label>
                <input 
                  id='email'
                  type='email' 
                  name='email'
                  className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Enter your email'
                  required
                />
              </div>

              <div>
                <label htmlFor='subject' className='block text-gray-700 mb-2'>Subject</label>
                <input 
                  id='subject'
                  type='text' 
                  name='subject'
                  className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='What is this regarding?'
                  required
                />
              </div>

              <div>
                <label htmlFor='message' className='block text-gray-700 mb-2'>Message</label>
                <textarea 
                  id='message'
                  name='message'
                  rows='4'
                  className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Tell us how we can help you...'
                  required
                ></textarea>
              </div>

              {/* Hidden honeypot for spam protection */}
              <input type="checkbox" name="botcheck" className="hidden" style={{display: 'none'}} />

              <button 
                type='submit'
                disabled={isSubmitting}
                className={`w-full p-3 rounded-lg font-semibold transition duration-300 ${
                  isSubmitting 
                    ? 'bg-blue-300 cursor-not-allowed' 
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>

              {/* Result Message */}
              {result && (
                <div className={`p-3 rounded-lg text-center ${
                  result.includes('successfully') 
                    ? 'bg-green-100 text-green-700 border border-green-200' 
                    : 'bg-red-100 text-red-700 border border-red-200'
                }`}>
                  {result}
                </div>
              )}
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