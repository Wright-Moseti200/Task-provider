import React from 'react'

const Home = () => {
  return (
    <>
      {/* Banner Section */}
      <div className='min-h-[60vh] flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 mt-5'>
        <div className='text-center text-white px-4'>
          <h1 className='text-5xl font-bold mb-6'>
            Connecting You with Trusted Local Service Providers
          </h1>
          <p className='text-xl mb-8 max-w-2xl mx-auto'>
            Find reliable cleaners, plumbers, movers, and electricians in your area with TaskLink - your trusted home services marketplace.
          </p>
          <button className='bg-white text-blue-500 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300'>
            Find Services Now
          </button>
        </div>
      </div>

      {/* Services Section */}
      <div className='flex flex-col items-center justify-center w-full mt-16 px-4'>
        <h1 className='text-3xl font-bold text-gray-800 mb-4'>Find by Specialty</h1>
        <p className='text-gray-600 text-center max-w-2xl mb-8 text-lg'>
          Simply browse through our extensive list of trusted service providers and schedule your appointment hassle-free
        </p>
        <div className='flex flex-wrap justify-center gap-8 max-w-6xl'>
          <div className='flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 w-48'>
            <div className='w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4'>
              <span className='text-2xl'>🧹</span>
            </div>
            <p className='font-semibold text-gray-800 text-center'>Cleaners</p>
          </div>
          <div className='flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 w-48'>
            <div className='w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4'>
              <span className='text-2xl'>🔧</span>
            </div>
            <p className='font-semibold text-gray-800 text-center'>Plumbers</p>
          </div>
          <div className='flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 w-48'>
            <div className='w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4'>
              <span className='text-2xl'>📦</span>
            </div>
            <p className='font-semibold text-gray-800 text-center'>Movers</p>
          </div>
          <div className='flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 w-48'>
            <div className='w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4'>
              <span className='text-2xl'>👨‍🔧</span>
            </div>
            <p className='font-semibold text-gray-800 text-center'>Handyman</p>
          </div>
          <div className='flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300 w-48'>
            <div className='w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4'>
              <span className='text-2xl'>⚡</span>
            </div>
            <p className='font-semibold text-gray-800 text-center'>Electricians</p>
          </div>
        </div>
      </div>

      {/* Service Providers Section */}
      <div className='flex flex-col items-center mt-16 px-4 mb-16'>
        <h1 className='text-3xl font-bold text-gray-800 mb-4'>Service Providers to Book</h1>
        <p className='text-gray-600 text-center max-w-2xl mb-8 text-lg'>
          Simply browse through our extensive list of trusted service providers
        </p>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full'>
          {/* Provider Card 1 */}
          <div className='bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 w-full overflow-hidden'>
            <div className='w-full h-56 bg-blue-400 flex items-center justify-center text-white text-4xl font-bold'>
              BM
            </div>
            <div className='p-6'>
              <div className='flex flex-col'>
                <p className='font-bold text-gray-800 text-xl'>Bright Moseti</p>
                <p className='text-blue-500 font-medium mb-2'>Mover</p>
                <p className='text-gray-600 text-sm'>24 reviews</p>
              </div>
            </div>
          </div>

          {/* Provider Card 2 */}
          <div className='bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 w-full overflow-hidden'>
            <div className='w-full h-56 bg-green-400 flex items-center justify-center text-white text-4xl font-bold'>
              SM
            </div>
            <div className='p-6'>
              <div className='flex flex-col'>
                <p className='font-bold text-gray-800 text-xl'>Sarah Mwangi</p>
                <p className='text-blue-500 font-medium mb-2'>Cleaner</p>
                <p className='text-gray-600 text-sm'>36 reviews</p>
              </div>
            </div>
          </div>

          {/* Provider Card 3 */}
          <div className='bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 w-full overflow-hidden'>
            <div className='w-full h-56 bg-purple-400 flex items-center justify-center text-white text-4xl font-bold'>
              JO
            </div>
            <div className='p-6'>
              <div className='flex flex-col'>
                <p className='font-bold text-gray-800 text-xl'>James Omondi</p>
                <p className='text-blue-500 font-medium mb-2'>Plumber</p>
                <p className='text-gray-600 text-sm'>18 reviews</p>
              </div>
            </div>
          </div>

          {/* Provider Card 4 */}
          <div className='bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 w-full overflow-hidden'>
            <div className='w-full h-56 bg-orange-400 flex items-center justify-center text-white text-4xl font-bold'>
              PK
            </div>
            <div className='p-6'>
              <div className='flex flex-col'>
                <p className='font-bold text-gray-800 text-xl'>Peter Kamau</p>
                <p className='text-blue-500 font-medium mb-2'>Electrician</p>
                <p className='text-gray-600 text-sm'>42 reviews</p>
              </div>
            </div>
          </div>

          {/* Provider Card 5 */}
          <div className='bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 w-full overflow-hidden'>
            <div className='w-full h-56 bg-red-400 flex items-center justify-center text-white text-4xl font-bold'>
              MK
            </div>
            <div className='p-6'>
              <div className='flex flex-col'>
                <p className='font-bold text-gray-800 text-xl'>Mary Kinyua</p>
                <p className='text-blue-500 font-medium mb-2'>Handyman</p>
                <p className='text-gray-600 text-sm'>29 reviews</p>
              </div>
            </div>
          </div>

          {/* Provider Card 6 */}
          <div className='bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 w-full overflow-hidden'>
            <div className='w-full h-56 bg-teal-400 flex items-center justify-center text-white text-4xl font-bold'>
              DN
            </div>
            <div className='p-6'>
              <div className='flex flex-col'>
                <p className='font-bold text-gray-800 text-xl'>David Njoroge</p>
                <p className='text-blue-500 font-medium mb-2'>Cleaner</p>
                <p className='text-gray-600 text-sm'>31 reviews</p>
              </div>
            </div>
          </div>

          {/* Provider Card 7 */}
          <div className='bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 w-full overflow-hidden'>
            <div className='w-full h-56 bg-indigo-400 flex items-center justify-center text-white text-4xl font-bold'>
              LN
            </div>
            <div className='p-6'>
              <div className='flex flex-col'>
                <p className='font-bold text-gray-800 text-xl'>Lucy Nyong'o</p>
                <p className='text-blue-500 font-medium mb-2'>Plumber</p>
                <p className='text-gray-600 text-sm'>27 reviews</p>
              </div>
            </div>
          </div>

          {/* Provider Card 8 */}
          <div className='bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 w-full overflow-hidden'>
            <div className='w-full h-56 bg-amber-400 flex items-center justify-center text-white text-4xl font-bold'>
              JK
            </div>
            <div className='p-6'>
              <div className='flex flex-col'>
                <p className='font-bold text-gray-800 text-xl'>John Kariuki</p>
                <p className='text-blue-500 font-medium mb-2'>Electrician</p>
                <p className='text-gray-600 text-sm'>38 reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Banner */}
      <div className='min-h-[40vh] flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 mt-16'>
        <div className='text-center text-white px-4'>
          <h1 className='text-4xl font-bold mb-6'>
            Ready to Get Your Tasks Done?
          </h1>
          <p className='text-xl mb-8 max-w-2xl mx-auto'>
            Book trusted service providers today and experience quality service with TaskLink
          </p>
          <button className='bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300'>
            Book Now
          </button>
        </div>
      </div>
    </>
  )
}

export default Home