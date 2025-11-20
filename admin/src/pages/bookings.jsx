import React, { useState, useEffect, useContext } from 'react';
import { Contextdata } from '../context/context';

const Bookings = () => {
  const { 
    getProviderBookings, 
    updateBookingStatus, 
    bookings, 
    loading, 
    error,
    clearError 
  } = useContext(Contextdata);
  
  const [filter, setFilter] = useState('all'); // all, pending, confirmed, completed, cancelled
  const [localBookings, setLocalBookings] = useState([]);

  // Fetch bookings on component mount
  useEffect(() => {
    fetchBookings();
  }, []);

  // Update local bookings when context bookings change
  useEffect(() => {
    setLocalBookings(bookings);
  }, [bookings]);

  const fetchBookings = async () => {
    try {
      await getProviderBookings();
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      clearError();
      await updateBookingStatus(bookingId, newStatus);
      // The context will automatically update the bookings state
      // No need to manually update local state
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const filteredBookings = localBookings.filter(booking => {
    if (filter === 'all') return true;
    return booking.status.toLowerCase() === filter.toLowerCase();
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Confirmed': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusActions = (status) => {
    switch (status) {
      case 'Pending':
        return [
          { label: 'Confirm', action: 'Confirmed', color: 'bg-blue-500 hover:bg-blue-600' },
          { label: 'Reject', action: 'Cancelled', color: 'bg-red-500 hover:bg-red-600' }
        ];
      case 'Confirmed':
        return [
          { label: 'Mark Complete', action: 'Completed', color: 'bg-green-500 hover:bg-green-600' },
          { label: 'Cancel', action: 'Cancelled', color: 'bg-red-500 hover:bg-red-600' }
        ];
      case 'Completed':
        return [
          { label: 'Reopen', action: 'Confirmed', color: 'bg-blue-500 hover:bg-blue-600' }
        ];
      case 'Cancelled':
        return [
          { label: 'Reopen', action: 'Pending', color: 'bg-blue-500 hover:bg-blue-600' }
        ];
      default:
        return [];
    }
  };

  const getStatusCounts = () => {
    const counts = {
      all: localBookings.length,
      pending: localBookings.filter(b => b.status === 'Pending').length,
      confirmed: localBookings.filter(b => b.status === 'Confirmed').length,
      completed: localBookings.filter(b => b.status === 'Completed').length,
      cancelled: localBookings.filter(b => b.status === 'Cancelled').length,
    };
    return counts;
  };

  const statusCounts = getStatusCounts();

  if (loading && localBookings.length === 0) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Manage Bookings</h1>
          <p className="text-gray-600">Loading your bookings...</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Manage Bookings</h1>
            <p className="text-gray-600">View and manage all your service bookings</p>
          </div>
          <button
            onClick={fetchBookings}
            disabled={loading}
            className={`mt-4 sm:mt-0 px-4 py-2 rounded-lg font-semibold transition duration-300 ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
          <div className="flex justify-between items-center">
            <span>{error}</span>
            <button onClick={clearError} className="text-red-700 hover:text-red-900">
              ×
            </button>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex space-x-4 overflow-x-auto pb-2">
          {[
            { key: 'all', label: 'All' },
            { key: 'pending', label: 'Pending' },
            { key: 'confirmed', label: 'Confirmed' },
            { key: 'completed', label: 'Completed' },
            { key: 'cancelled', label: 'Cancelled' }
          ].map((filterType) => (
            <button
              key={filterType.key}
              onClick={() => setFilter(filterType.key)}
              disabled={loading}
              className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition duration-300 ${
                filter === filterType.key
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {filterType.label} 
              {filterType.key !== 'all' && ` (${statusCounts[filterType.key]})`}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <p className="text-gray-600 text-lg">
              {filter === 'all' 
                ? 'No bookings found. Your bookings will appear here when customers book your services.'
                : `No ${filter} bookings found.`
              }
            </p>
          </div>
        ) : (
          filteredBookings.map((booking) => (
            <div key={booking._id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Customer Info */}
                <div className="lg:w-1/3">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {booking.userInfo?.username?.charAt(0) || 'C'}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {booking.userInfo?.username || 'Customer'}
                      </h3>
                      <p className="text-gray-600">{booking.userInfo?.phone_number || 'N/A'}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {booking.taskproviderinfo?.tasklocation || 'Location not specified'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="lg:w-1/3">
                  <div className="space-y-2">
                    <div>
                      <span className="font-semibold text-gray-700">Service: </span>
                      <span className="text-gray-600">{booking.service}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Date & Time: </span>
                      <span className="text-gray-600">
                        {new Date(booking.date).toLocaleDateString()} at {booking.time}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Category: </span>
                      <span className="text-blue-500 font-medium">
                        {booking.taskproviderinfo?.taskcategory || 'Service'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="lg:w-1/3 flex flex-col items-end justify-between space-y-4">
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                  
                  <div className="flex space-x-2">
                    {getStatusActions(booking.status).map((action) => (
                      <button
                        key={action.action}
                        onClick={() => handleStatusUpdate(booking._id, action.action)}
                        disabled={loading}
                        className={`text-white px-4 py-2 rounded-lg font-semibold transition duration-300 text-sm ${
                          loading ? 'opacity-50 cursor-not-allowed' : action.color
                        }`}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile Actions */}
              <div className="flex lg:hidden justify-between items-center mt-4 pt-4 border-t border-gray-200">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </span>
                <div className="flex space-x-2">
                  {getStatusActions(booking.status).map((action) => (
                    <button
                      key={action.action}
                      onClick={() => handleStatusUpdate(booking._id, action.action)}
                      disabled={loading}
                      className={`text-white px-3 py-1 rounded-lg font-semibold transition duration-300 text-xs ${
                        loading ? 'opacity-50 cursor-not-allowed' : action.color
                      }`}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Bookings;