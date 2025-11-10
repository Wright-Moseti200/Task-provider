import React from 'react';
import { Link } from 'react-router-dom';

const List = () => {
  return (
    <>
      <div className='flex flex-col items-center w-full mt-8 px-4'>
        <h1 className='text-3xl font-bold text-gray-800 mb-4'>Browse Service Providers</h1>
        <p className='text-gray-600 text-center max-w-2xl mb-8 text-lg'>
          Find and filter through our trusted service providers
        </p>
        
        <div className='flex gap-8 w-full max-w-7xl'>
          {/* Filter Sidebar */}
          <div className='w-1/4 bg-white rounded-xl shadow-lg p-6 h-fit'>
            <h2 className='text-xl font-bold text-gray-800 mb-6'>Filter by Service</h2>
            <div className='flex flex-col space-y-4'>
              <button className='flex items-center p-3 rounded-lg hover:bg-blue-50 transition duration-300 text-left'>
                <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3'>
                  <span className='text-lg'>🧹</span>
                </div>
                <span className='font-medium text-gray-800'>Cleaners</span>
              </button>
              <button className='flex items-center p-3 rounded-lg hover:bg-blue-50 transition duration-300 text-left'>
                <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3'>
                  <span className='text-lg'>🔧</span>
                </div>
                <span className='font-medium text-gray-800'>Plumbers</span>
              </button>
              <button className='flex items-center p-3 rounded-lg hover:bg-blue-50 transition duration-300 text-left'>
                <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3'>
                  <span className='text-lg'>📦</span>
                </div>
                <span className='font-medium text-gray-800'>Movers</span>
              </button>
              <button className='flex items-center p-3 rounded-lg hover:bg-blue-50 transition duration-300 text-left'>
                <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3'>
                  <span className='text-lg'>👨‍🔧</span>
                </div>
                <span className='font-medium text-gray-800'>Handyman</span>
              </button>
              <button className='flex items-center p-3 rounded-lg hover:bg-blue-50 transition duration-300 text-left'>
                <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3'>
                  <span className='text-lg'>⚡</span>
                </div>
                <span className='font-medium text-gray-800'>Electricians</span>
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className='w-3/4'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {/* Provider Card 1 */}
              <Link to="/preview" className='block'>
                <div className='bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 w-full overflow-hidden cursor-pointer'>
                  <div className='w-full h-64 bg-blue-400 flex items-center justify-center text-white text-4xl font-bold'>
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
              </Link>

              {/* Provider Card 2 */}
              <Link to="/preview" className='block'>
                <div className='bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 w-full overflow-hidden cursor-pointer'>
                  <div className='w-full h-64 bg-green-400 flex items-center justify-center text-white text-4xl font-bold'>
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
              </Link>

              {/* Provider Card 3 */}
              <Link to="/preview" className='block'>
                <div className='bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 w-full overflow-hidden cursor-pointer'>
                  <div className='w-full h-64 bg-purple-400 flex items-center justify-center text-white text-4xl font-bold'>
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
              </Link>

              {/* Provider Card 4 */}
              <Link to="/preview" className='block'>
                <div className='bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 w-full overflow-hidden cursor-pointer'>
                  <div className='w-full h-64 bg-orange-400 flex items-center justify-center text-white text-4xl font-bold'>
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
              </Link>

              {/* Provider Card 5 */}
              <Link to="/preview" className='block'>
                <div className='bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 w-full overflow-hidden cursor-pointer'>
                  <div className='w-full h-64 bg-red-400 flex items-center justify-center text-white text-4xl font-bold'>
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
              </Link>

              {/* Provider Card 6 */}
              <Link to="/preview" className='block'>
                <div className='bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 w-full overflow-hidden cursor-pointer'>
                  <div className='w-full h-64 bg-teal-400 flex items-center justify-center text-white text-4xl font-bold'>
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
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default List