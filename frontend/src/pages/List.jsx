import React, { useContext, useEffect, useState } from 'react'
import { Contextdata } from '../context/ContextProvider'
import { Link } from 'react-router-dom'

const List = () => {
  const context = useContext(Contextdata)
  
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

  // Fetch task providers on component mount
  useEffect(() => {
    if (!hasLoaded) {
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
    <div className='flex flex-col items-center w-full mt-8 px-4 mb-16'>
      <h1 className='text-3xl font-bold text-gray-800 mb-4'>Browse Service Providers</h1>
      <p className='text-gray-600 text-center max-w-2xl mb-8 text-lg'>
        Find and filter through our trusted service providers
      </p>
      
      <div className='flex flex-col lg:flex-row gap-8 w-full max-w-7xl'>
        {/* Filter Sidebar */}
        <div className='w-full lg:w-1/4 bg-white rounded-xl shadow-lg p-6 h-fit'>
          <h2 className='text-xl font-bold text-gray-800 mb-6'>Filter by Service</h2>
          <div className='flex flex-col space-y-2'>
            {serviceCategories.map((category) => (
              <button 
                key={category.value}
                onClick={() => handleFilterChange(category.value)}
                className={`flex items-center p-3 rounded-lg transition duration-300 text-left ${
                  activeFilter === category.value
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-blue-50 text-gray-800'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  activeFilter === category.value ? 'bg-blue-100' : 'bg-blue-100'
                }`}>
                  <span className='text-lg'>{category.icon}</span>
                </div>
                <span className='font-medium'>{category.name}</span>
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className='mt-6 p-3 bg-gray-50 rounded-lg'>
            <p className='text-sm text-gray-600'>
              Showing <span className='font-semibold'>{filteredProviders.length}</span> provider{filteredProviders.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Cards Grid */}
        <div className='w-full lg:w-3/4'>
          {/* Loading State */}
          {loading && (
            <div className='text-center py-8'>
              <div className='inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500'></div>
              <p className='mt-2 text-gray-600'>Loading service providers...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6'>
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
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {filteredProviders.map((provider, index) => (
                <Link 
                  key={provider._id || index} 
                  to={`/preview/${provider._id}`}
                  className='block'
                >
                  <div className='bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 w-full overflow-hidden cursor-pointer h-full'>
                    {/* Profile Picture */}
                    {provider.profile_pic ? (
                      <div className='w-full h-64 bg-gray-200 overflow-hidden'>
                        <img 
                          src={provider.profile_pic} 
                          alt={provider.username}
                          className='w-full h-full object-cover'
                        />
                      </div>
                    ) : (
                      <div className={`w-full h-64 ${getRandomColor(index)} flex items-center justify-center text-white text-4xl font-bold`}>
                        {getInitials(provider.username)}
                      </div>
                    )}
                    
                    <div className='p-6'>
                      <div className='flex flex-col'>
                        <p className='font-bold text-gray-800 text-xl mb-1'>{provider.username}</p>
                        <p className='text-blue-500 font-medium mb-2 capitalize'>
                          {provider.category || 'General Service'}
                        </p>
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
      </div>
    </div>
  )
}

export default List