import React, { useContext, useEffect, useState } from 'react'
import { Contextdata } from '../context/ContextProvider'
import { Link } from 'react-router-dom'

const Home = () => {
  const context = useContext(Contextdata)
  
  // Check if context exists
  if (!context) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500">Context Not Available</h1>
          <p>Please check your Context Provider setup</p>
        </div>
      </div>
    )
  }

  const {
    taskProviders,
    getTaskProviders,
    loading,
    error,
    clearError
  } = context

  const [hasLoaded, setHasLoaded] = useState(false)
  const [filteredProviders, setFilteredProviders] = useState([])
  const [activeFilter, setActiveFilter] = useState('all')

  // Service categories with icons
  const serviceCategories = [
    { name: 'All Services', icon: '🌟', value: 'all' },
    { name: 'Cleaners', icon: '🧹', value: 'cleaner' },
    { name: 'Plumbers', icon: '🔧', value: 'plumber' },
    { name: 'Movers', icon: '📦', value: 'mover' },
    { name: 'Handyman', icon: '👨‍🔧', value: 'handyman' },
    { name: 'Electricians', icon: '⚡', value: 'electrician' }
  ]

  // Fetch task providers on component mount - ONLY ONCE
  useEffect(() => {
    if (!hasLoaded) {
      console.log('Home useEffect - Fetching providers...')
      getTaskProviders()
      setHasLoaded(true)
    }
  }, [getTaskProviders, hasLoaded])

  // Filter providers when taskProviders or activeFilter changes
  useEffect(() => {
    if (Array.isArray(taskProviders)) {
      if (activeFilter === 'all') {
        setFilteredProviders(taskProviders)
      } else {
        const filtered = taskProviders.filter(provider => 
          provider.category?.toLowerCase() === activeFilter.toLowerCase()
        )
        setFilteredProviders(filtered)
      }
    }
  }, [taskProviders, activeFilter])

  // Function to get initials for avatar
  const getInitials = (name) => {
    if (!name) return '??'
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  // Function to get random color for avatar
  const getRandomColor = (index) => {
    const colors = [
      'bg-blue-400', 'bg-green-400', 'bg-purple-400', 'bg-orange-400',
      'bg-red-400', 'bg-teal-400', 'bg-indigo-400', 'bg-amber-400'
    ]
    return colors[index % colors.length]
  }

  // Handle retry loading providers
  const handleRetry = () => {
    clearError()
    getTaskProviders()
  }

  // Handle filter change
  const handleFilterChange = (filterValue) => {
    setActiveFilter(filterValue)
  }

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
          
          <Link to='/providers'>
            <button className='bg-white text-blue-500 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300'>
              Find Services Now
            </button>
          </Link>
        </div>
      </div>

      {/* Services Filter Section */}
      <div className='flex flex-col items-center justify-center w-full mt-16 px-4'>
        <h1 className='text-3xl font-bold text-gray-800 mb-4'>Find by Specialty</h1>
        <p className='text-gray-600 text-center max-w-2xl mb-8 text-lg'>
          Click on a service category to filter providers
        </p>
        
        <div className='flex flex-wrap justify-center gap-4 max-w-6xl'>
          {serviceCategories.map((category, index) => (
            <button
              key={category.value}
              onClick={() => handleFilterChange(category.value)}
              className={`flex flex-col items-center p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 w-48 cursor-pointer ${
                activeFilter === category.value 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white text-gray-800'
              }`}
            >
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${
                activeFilter === category.value 
                  ? 'bg-blue-100' 
                  : 'bg-blue-100'
              }`}>
                <span className='text-2xl'>{category.icon}</span>
              </div>
              <p className='font-semibold text-center'>{category.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Service Providers Section */}
      <div className='flex flex-col items-center mt-16 px-4 mb-16'>
        <div className='flex flex-col md:flex-row justify-between items-center w-full max-w-7xl mb-8'>
          <div>
            <h1 className='text-3xl font-bold text-gray-800 mb-2'>
              {activeFilter === 'all' ? 'All Service Providers' : `${serviceCategories.find(cat => cat.value === activeFilter)?.name}`}
            </h1>
            <p className='text-gray-600'>
              {Array.isArray(filteredProviders) 
                ? `Showing ${filteredProviders.length} service provider${filteredProviders.length !== 1 ? 's' : ''}` 
                : 'Loading service providers...'
              }
            </p>
          </div>
          <Link to='/providers'>
            <button className='text-blue-500 hover:text-blue-700 font-medium mt-2 md:mt-0'>
              View All Providers
            </button>
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className='text-center py-8'>
            <div className='inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500'></div>
            <p className='mt-2 text-gray-600'>Loading service providers...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 max-w-7xl w-full'>
            <p className='font-semibold'>Error loading providers</p>
            <p className='mt-1'>{error}</p>
            <button 
              onClick={handleRetry}
              className='mt-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300'
            >
              Try Again
            </button>
          </div>
        )}

        {/* Real Providers from API */}
        {!loading && !error && Array.isArray(filteredProviders) && filteredProviders.length > 0 && (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full'>
            {filteredProviders.map((provider, index) => (
              <Link 
                key={provider._id || index} 
                to={`/preview/${provider._id}`}
                className='block'
              >
                <div className='bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 w-full overflow-hidden cursor-pointer h-full'>
                  {/* Profile Picture */}
                  {provider.profile_pic ? (
                    <div className='w-full h-56 bg-gray-200 overflow-hidden'>
                      <img 
                        src={provider.profile_pic} 
                        alt={provider.username}
                        className='w-full h-full object-cover'
                      />
                    </div>
                  ) : (
                    <div className={`w-full h-56 ${getRandomColor(index)} flex items-center justify-center text-white text-4xl font-bold`}>
                      {getInitials(provider.username)}
                    </div>
                  )}
                  
                  <div className='p-6'>
                    <div className='flex flex-col'>
                      {/* Name */}
                      <p className='font-bold text-gray-800 text-xl mb-1'>{provider.username}</p>
                      
                      {/* Category */}
                      <p className='text-blue-500 font-medium mb-2 capitalize'>
                        {provider.category || 'General Service'}
                      </p>
                      
                      {/* Reviews Count */}
                      <div className='flex items-center mb-2'>
                        <span className='text-yellow-500 mr-1'>★</span>
                        <span className='text-gray-500 text-sm'>
                          0 reviews
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Empty State - No providers from API */}
        {!loading && !error && Array.isArray(filteredProviders) && filteredProviders.length === 0 && (
          <div className='text-center py-12'>
            <div className='text-6xl mb-4'>🔍</div>
            <h3 className='text-xl font-semibold text-gray-800 mb-2'>
              {activeFilter === 'all' 
                ? 'No Service Providers Available' 
                : `No ${serviceCategories.find(cat => cat.value === activeFilter)?.name} Available`
              }
            </h3>
            <p className='text-gray-600 mb-6'>
              {activeFilter === 'all'
                ? "We're working on adding more service providers to our platform."
                : `We're working on adding more ${serviceCategories.find(cat => cat.value === activeFilter)?.name.toLowerCase()} to our platform.`
              }
            </p>
            {activeFilter !== 'all' && (
              <button 
                onClick={() => handleFilterChange('all')}
                className='bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 mr-4'
              >
                Show All Providers
              </button>
            )}
            <button 
              onClick={handleRetry}
              className='bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition duration-300'
            >
              Refresh Providers
            </button>
          </div>
        )}

        {/* Fallback - If taskProviders is not an array yet */}
        {!loading && !error && !Array.isArray(taskProviders) && (
          <div className='text-center py-12'>
            <div className='inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4'></div>
            <p className='text-gray-600'>Preparing service providers...</p>
          </div>
        )}
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
          <Link to='/providers'>
            <button className='bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300'>
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home