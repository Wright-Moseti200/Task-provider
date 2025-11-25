import React, { useState, useContext, useEffect } from 'react';
import { Contextdata } from '../context/ContextProvider';
import { useNavigate } from 'react-router-dom';
import {loadStripe} from "@stripe/stripe-js"
const Booking = () => {
  const context = useContext(Contextdata);
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState({});

  if (!context) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-500">Context Not Available</h1>
            <p>Please check your Context Provider setup</p>
          </div>
        </div>
      </div>
    );
  }

  const {
    bookings,
    getUserBookings,
    updateBookingStatus,
    loading,
    error,
    clearError
  } = context;

  useEffect(() => {
    // Check if getUserBookings is a function before calling it
    if (typeof getUserBookings === 'function') {
      getUserBookings();
    } else {
      console.error("getUserBookings is not a function in context");
    }
    // Add getUserBookings to dependency array
  }, [getUserBookings]); 

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      setIsUpdating(prev => ({ ...prev, [bookingId]: true }));
      try {
        await updateBookingStatus(bookingId, 'Cancelled');
        // Refetch bookings to update the UI instantly
        if (typeof getUserBookings === 'function') {
          getUserBookings();
        }
      } catch (err) {
        console.error('Error cancelling booking:', err);
        alert('Failed to cancel booking. Please try again.');
      } finally {
        setIsUpdating(prev => ({ ...prev, [bookingId]: false }));
      }
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Confirmed': 'bg-green-100 text-green-800 border-green-200',
      'Cancelled': 'bg-red-100 text-red-800 border-red-200',
      'Completed': 'bg-blue-100 text-blue-800 border-blue-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not set';
    try {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (error) {
      return 'Invalid date';
    }
  };

  const getInitials = (name) => {
    if (!name) return '??';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // This function is correct for your logic
  const canCancelBooking = (status) => {
    return status === 'Pending' || status === 'Confirmed';
  };

  let makepayment =async(taskprovidername,booking)=>{
    let array = [taskprovidername];
    let stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
    let response = await fetch("https://task-provider-fjui.onrender.com/api/user/create-checkout-session",{
      method:"post",
      headers:{
        "Content-type":"application/json",
        "auth-token":localStorage.getItem("userToken")
      },
      body:JSON.stringify({
        taskname:array,
        id:booking
      })
    });
    let session = await response.json();
    window.location.href=session.url;
    if(result.error){
      console.log(result.error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">My Bookings</h1>
          <p className="text-gray-600">Manage your service bookings</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <div className="flex justify-between items-center">
              <span>{error}</span>
              <button onClick={clearError} className="text-red-700 hover:text-red-900 font-medium">
                Dismiss
              </button>
            </div>
          </div>
        )}

        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600">Loading your bookings...</p>
          </div>
        )}

        {/* Bookings List */}
        {!loading && Array.isArray(bookings) && bookings.length > 0 ? (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Provider Info */}
                  <div className="flex items-start space-x-4 lg:w-2/5">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {getInitials(booking.taskproviderinfo?.taskname || '??')}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-gray-800">
                        {booking.taskproviderinfo?.taskname || 'Unknown Provider'}
                      </h2>
                      <p className="text-blue-500 font-medium capitalize">
                        {booking.taskproviderinfo?.taskcategory || 'Service Provider'}
                      </p>
                      <p className="text-gray-600 text-sm mt-1">
                        📞 {booking.taskproviderinfo?.taskphone || 'Phone not provided'}
                      </p>
                      <p className="text-gray-600 text-sm">
                        📍 {booking.taskproviderinfo?.tasklocation || 'Location not specified'}
                      </p>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="lg:w-2/5">
                    <div className="space-y-3">
                      <div>
                        <span className="font-semibold text-gray-700">Service: </span>
                        <span className="text-gray-600">{booking.service}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Date: </span>
                        <span className="text-gray-600">{formatDate(booking.date)}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Time: </span>
                        <span className="text-gray-600">{booking.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Status & Actions */}
                  <div className="lg:w-1/5 flex flex-col items-end justify-between space-y-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                    
                    {/* --- START: LOGIC AS REQUESTED --- */}

                    {/* 1. Show 'Cancel Booking' for 'Pending' or 'Confirmed' */}
                    {canCancelBooking(booking.status) && (
                      <button 
                        onClick={() => handleCancelBooking(booking._id)}
                        disabled={isUpdating[booking._id]}
                        className="w-full bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 disabled:bg-red-300 transition duration-300"
                      >
                        {isUpdating[booking._id] ? 'Cancelling...' : 'Cancel Booking'}
                      </button>
                    )}

                    {/* 2. Show 'Pay Online' for 'Completed' */}
                    {booking.status === 'Completed' && (
                      <button 
                        onClick={()=>{makepayment(booking.taskproviderinfo.taskname,booking._id)}}
                        className="w-full bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition duration-300"
                      >
                        Pay Online
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading && (
            <div className="text-center py-12 bg-white rounded-xl shadow-lg">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Bookings Yet</h3>
              <p className="text-gray-600 mb-6">You haven't made any service bookings yet.</p>
              <button 
                onClick={() => navigate('/providers')}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300"
              >
                Browse Service Providers
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Booking;