import React, { useState, useEffect, useContext } from 'react';
import { Contextdata } from '../context/context';

const Dashboard = () => {
  const { 
    getProviderBookings, 
    getProviderRatings, 
    updateBookingStatus,
    bookings, 
    ratings,
    loading, 
    error,
    clearError 
  } = useContext(Contextdata);
  
  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0,
    completedBookings: 0,
    cancelledBookings: 0,
    totalEarnings: 0,
    averageRating: 0,
    recentBookings: [],
    upcomingBookings: []
  });

  // Fetch data on component mount
  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Update dashboard data when bookings or ratings change
  useEffect(() => {
    calculateDashboardData();
  }, [bookings, ratings]);

  const fetchDashboardData = async () => {
    try {
      clearError();
      await Promise.all([
        getProviderBookings(),
        getProviderRatings()
      ]);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
    }
  };

  const calculateDashboardData = () => {
    if (!bookings.length && !ratings.length) return;

    // Calculate booking statistics
    const totalBookings = bookings.length;
    const pendingBookings = bookings.filter(b => b.status === 'Pending').length;
    const confirmedBookings = bookings.filter(b => b.status === 'Confirmed').length;
    const completedBookings = bookings.filter(b => b.status === 'Completed').length;
    const cancelledBookings = bookings.filter(b => b.status === 'Cancelled').length;

    // Calculate earnings (you might want to adjust this based on your pricing model)
    const totalEarnings = bookings
      .filter(b => b.status === 'Completed')
      .reduce((total, booking) => {
        // This is a placeholder - you'll need to add pricing to your booking model
        const servicePrice = booking.service?.length * 1000 || 2000; // Example calculation
        return total + servicePrice;
      }, 0);

    // Calculate average rating
    const averageRating = ratings.length > 0 
      ? ratings.reduce((sum, rating) => sum + (rating.rating || 0), 0) / ratings.length
      : 0;

    // Get recent bookings (last 5 bookings)
    const recentBookings = [...bookings]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    // Get upcoming bookings (confirmed and future dates)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const upcomingBookings = bookings
      .filter(booking => {
        const bookingDate = new Date(booking.date);
        return (booking.status === 'Confirmed' || booking.status === 'Pending') && 
               bookingDate >= today;
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 5);

    setDashboardData({
      totalBookings,
      pendingBookings,
      confirmedBookings,
      completedBookings,
      cancelledBookings,
      totalEarnings,
      averageRating: Number(averageRating.toFixed(1)),
      recentBookings,
      upcomingBookings
    });
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      clearError();
      await updateBookingStatus(bookingId, newStatus);
      // The context will automatically update the bookings state
      // which will trigger the dashboard data recalculation
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Confirmed': return 'bg-blue-100 text-blue-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading && dashboardData.totalBookings === 0) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Provider Dashboard</h1>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
              <div className="flex items-center">
                <div className="p-3 bg-gray-200 rounded-lg mr-4 w-12 h-12"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="h-6 bg-gray-200 rounded w-12"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Provider Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's your business overview</p>
          </div>
          <button
            onClick={fetchDashboardData}
            disabled={loading}
            className={`mt-4 sm:mt-0 px-4 py-2 rounded-lg font-semibold transition duration-300 ${
              loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {loading ? 'Refreshing...' : 'Refresh Data'}
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Bookings */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg mr-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-800">{dashboardData.totalBookings}</p>
            </div>
          </div>
        </div>

        {/* Pending Bookings */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-yellow-100 rounded-lg mr-4">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Pending</p>
              <p className="text-2xl font-bold text-gray-800">{dashboardData.pendingBookings}</p>
            </div>
          </div>
        </div>

        {/* Completed Bookings */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg mr-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Completed</p>
              <p className="text-2xl font-bold text-gray-800">{dashboardData.completedBookings}</p>
            </div>
          </div>
        </div>

        {/* Earnings */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg mr-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Earnings</p>
              <p className="text-2xl font-bold text-gray-800">KSh {dashboardData.totalEarnings.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Recent Bookings</h2>
            <span className="text-sm text-gray-500">Last 5 bookings</span>
          </div>
          <div className="space-y-4">
            {dashboardData.recentBookings.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No recent bookings</p>
            ) : (
              dashboardData.recentBookings.map((booking) => (
                <div key={booking._id} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{booking.userInfo?.username || 'Customer'}</p>
                    <p className="text-sm text-gray-600 truncate">{booking.service}</p>
                    <p className="text-xs text-gray-500">
                      {formatDate(booking.date)} at {booking.time}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                    {booking.status === 'Pending' && (
                      <button 
                        onClick={() => handleStatusUpdate(booking._id, 'Confirmed')}
                        disabled={loading}
                        className={`text-white px-3 py-1 rounded text-xs transition duration-300 ${
                          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                      >
                        Confirm
                      </button>
                    )}
                    {booking.status === 'Confirmed' && (
                      <button 
                        onClick={() => handleStatusUpdate(booking._id, 'Completed')}
                        disabled={loading}
                        className={`text-white px-3 py-1 rounded text-xs transition duration-300 ${
                          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'
                        }`}
                      >
                        Complete
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Upcoming Bookings & Rating */}
        <div className="space-y-6">
          {/* Upcoming Bookings */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">Upcoming Bookings</h2>
              <span className="text-sm text-gray-500">Next 5 bookings</span>
            </div>
            <div className="space-y-3">
              {dashboardData.upcomingBookings.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No upcoming bookings</p>
              ) : (
                dashboardData.upcomingBookings.map((booking) => (
                  <div key={booking._id} className="p-3 border border-gray-200 rounded-lg">
                    <p className="font-semibold text-gray-800">{booking.userInfo?.username || 'Customer'}</p>
                    <p className="text-sm text-gray-600">{booking.service}</p>
                    <p className="text-xs text-gray-500">
                      {formatDate(booking.date)} at {booking.time}
                    </p>
                    <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Rating Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Your Rating</h2>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-2xl ${
                      star <= Math.floor(dashboardData.averageRating) 
                        ? 'text-yellow-400' 
                        : 'text-gray-300'
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-3xl font-bold text-gray-800">{dashboardData.averageRating}</p>
              <p className="text-gray-600">
                Based on {ratings.length} rating{ratings.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;