import React, { useState } from 'react';

const Booking = () => {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      provider: {
        name: 'Bright Moseti',
        occupation: 'Mover',
        profilePicture: 'BM',
        phone: '+254 714 471 627',
        address: 'Nairobi, Kenya'
      },
      serviceDescription: 'Moving furniture from apartment to new house',
      date: '2024-01-20',
      time: '10:00 AM',
      status: 'Confirmed' // Pending, Confirmed, Completed, Cancelled
    },
    {
      id: 2,
      provider: {
        name: 'Sarah Mwangi',
        occupation: 'Cleaner', 
        profilePicture: 'SM',
        phone: '+254 723 456 789',
        address: 'Westlands, Nairobi'
      },
      serviceDescription: 'Deep cleaning of 3-bedroom apartment',
      date: '2024-01-22', 
      time: '9:00 AM',
      status: 'Pending'
    },
    {
      id: 3,
      provider: {
        name: 'James Omondi',
        occupation: 'Plumber',
        profilePicture: 'JO', 
        phone: '+254 711 222 333',
        address: 'Kileleshwa, Nairobi'
      },
      serviceDescription: 'Fixing leaking kitchen sink',
      date: '2024-01-25',
      time: '2:00 PM',
      status: 'Completed'
    }
  ]);

  // User cancels booking
  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      setBookings(bookings.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'Cancelled' }
          : booking
      ));
    }
  };

  // Simple status colors
  const getStatusColor = (status) => {
    const colors = {
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Confirmed': 'bg-green-100 text-green-800', 
      'Cancelled': 'bg-red-100 text-red-800',
      'Completed': 'bg-blue-100 text-blue-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">My Bookings</h1>
          <p className="text-gray-600">Manage your service bookings</p>
        </div>

        {/* Booking Summary */}
        <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Booking Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">
                {bookings.filter(b => b.status === 'Pending').length}
              </p>
              <p className="text-gray-600">Pending</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                {bookings.filter(b => b.status === 'Confirmed').length}
              </p>
              <p className="text-gray-600">Confirmed</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">
                {bookings.filter(b => b.status === 'Completed').length}
              </p>
              <p className="text-gray-600">Completed</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-2xl font-bold text-red-600">
                {bookings.filter(b => b.status === 'Cancelled').length}
              </p>
              <p className="text-gray-600">Cancelled</p>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Provider Info */}
                <div className="flex items-start space-x-4 lg:w-2/5">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {booking.provider.profilePicture}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-800">{booking.provider.name}</h2>
                    <p className="text-blue-500 font-medium">{booking.provider.occupation}</p>
                    <p className="text-gray-600 text-sm mt-1">{booking.provider.phone}</p>
                    <p className="text-gray-600 text-sm">{booking.provider.address}</p>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="lg:w-2/5">
                  <div className="space-y-2">
                    <div>
                      <span className="font-semibold text-gray-700">Service: </span>
                      <span className="text-gray-600">{booking.serviceDescription}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-700">Date & Time: </span>
                      <span className="text-gray-600">{booking.date} at {booking.time}</span>
                    </div>
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="lg:w-1/5 flex flex-col items-end justify-between space-y-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                  
                  {/* Show Cancel button only for Pending and Confirmed status */}
                  {(booking.status === 'Pending' || booking.status === 'Confirmed') && (
                    <button 
                      onClick={() => handleCancelBooking(booking.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition duration-300 text-sm"
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Booking;