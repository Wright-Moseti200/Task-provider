import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom"
import { Contextdata } from '../context/ContextProvider';

const Preview = () => {
  const { id } = useParams();
  const context = useContext(Contextdata);
  const navigate = useNavigate();
  
  const {
    taskProviders,
    getProviderRatings,
    createBooking,
    submitRating,
    loading,
    error,
    clearError,
    isAuthenticated
  } = context;

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [provider, setProvider] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Find provider from taskProviders array using the ID from URL
  useEffect(() => {
    if (id && Array.isArray(taskProviders) && taskProviders.length > 0) {
      const foundProvider = taskProviders.find(provider => provider._id === id);
      if (foundProvider) {
        setProvider(foundProvider);
        
        // Fetch ratings for this provider
        const fetchRatings = async () => {
          try {
            const ratingsData = await getProviderRatings(foundProvider.username);
            setRatings(ratingsData.ratings || []);
          } catch (err) {
            console.error('Error fetching ratings:', err);
          }
        };
        
        fetchRatings();
      }
    }
  }, [id, taskProviders, getProviderRatings]);

  const handleBooking = async () => {
    if (!isAuthenticated()) {
      alert('Please log in to book a service');
      navigate('/login');
      return;
    }

    if (!selectedDate || !selectedTime || !serviceDescription) {
      alert('Please select date, time, and describe what service you need');
      return;
    }

    setIsSubmitting(true);
    try {
      const bookingData = {
        taskname: provider?.username,
        taskcategory: provider?.category,
        taskphone: provider?.phone_number,
        tasklocation: provider?.location || 'Customer Location',
        service: serviceDescription,
        date: selectedDate,
        time: selectedTime
      };

      const result = await createBooking(bookingData);
      
      if (result && result.success) {
        alert('Booking created successfully!');
        setSelectedDate('');
        setSelectedTime('');
        setServiceDescription('');
      } else {
        throw new Error(result?.message || 'Failed to create booking');
      }
    } catch (err) {
      console.error('Error creating booking:', err);
      alert(err.message || 'Failed to create booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!isAuthenticated()) {
      alert('Please log in to submit a review');
      navigate('/login');
      return;
    }

    if (!review || rating === 0) {
      alert('Please provide both rating and review');
      return;
    }

    setIsSubmitting(true);
    try {
      const ratingData = {
        taskname: provider?.username,
        ratingss: rating,
        comment: review
      };

      const result = await submitRating(ratingData);
      
      if (result && result.success) {
        alert('Review submitted successfully!');
        setReview('');
        setRating(0);
        
        // Refresh ratings
        if (provider?.username) {
          const ratingsData = await getProviderRatings(provider.username);
          setRatings(ratingsData.ratings || []);
        }
      } else {
        throw new Error(result?.message || 'Failed to submit review');
      }
    } catch (err) {
      console.error('Error submitting review:', err);
      alert(err.message || 'Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate average rating
  const calculateAverageRating = () => {
    if (ratings.length === 0) return 0;
    const total = ratings.reduce((sum, review) => sum + review.rating, 0);
    return (total / ratings.length).toFixed(1);
  };

  // Star Rating Component
  const StarRating = ({ rating, onRatingChange, readonly = false }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => !readonly && onRatingChange(star)}
            className={`text-2xl ${readonly ? 'cursor-default' : 'cursor-pointer'} ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
            disabled={readonly}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

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

  if (loading && !provider) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="ml-4 text-gray-600">Loading provider details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😕</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Provider Not Found</h3>
            <p className="text-gray-600 mb-4">The service provider you're looking for doesn't exist.</p>
            <Link to="/providers" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
              Browse Providers
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
            <button onClick={clearError} className="ml-4 text-red-700 underline">Dismiss</button>
          </div>
        )}

        {/* Provider Profile Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Picture and Basic Info */}
            <div className="flex flex-col items-center md:items-start md:w-1/3">
              {provider.profile_pic ? (
                <img 
                  src={provider.profile_pic} 
                  alt={provider.username}
                  className="w-32 h-32 rounded-full object-cover mb-4"
                />
              ) : (
                <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4">
                  {getInitials(provider.username)}
                </div>
              )}
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{provider.username}</h1>
              <p className="text-blue-500 text-xl font-semibold mb-4 capitalize">{provider.category}</p>
              <div className="flex items-center mb-4">
                <StarRating rating={parseFloat(calculateAverageRating())} readonly={true} />
                <span className="ml-2 text-gray-600">({ratings.length} reviews)</span>
              </div>
            </div>

            {/* About and Skills */}
            <div className="md:w-2/3">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">About</h2>
                <p className="text-gray-600 leading-relaxed">
                  {provider.about || `${provider.username} is a professional ${provider.category} providing quality services.`}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Services Offered</h2>
                <div className="flex flex-wrap gap-2">
                  {provider.services ? (
                    <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
                      {provider.services}
                    </span>
                  ) : (
                    <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
                      {provider.category} Services
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Service Booking Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Book Service</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Select Service Date</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Select Service Time</label>
                <input
                  type="time"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Describe What You Need</label>
                <textarea
                  value={serviceDescription}
                  onChange={(e) => setServiceDescription(e.target.value)}
                  placeholder="Describe the service you need..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
                />
              </div>
              
              <button
                onClick={handleBooking}
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 disabled:bg-blue-300"
              >
                {isSubmitting ? 'Booking...' : 'Book Service Now'}
              </button>
              
              <Link to="/bookings">
                <button className="w-full bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 mt-2">
                  View My Bookings
                </button>
              </Link>
            </div>
          </div>

          {/* Add Review Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Your Review</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Your Rating</label>
                <StarRating rating={rating} onRatingChange={setRating} />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Your Review</label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Share your experience with this service provider..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
                />
              </div>

              <button
                onClick={handleSubmitReview}
                disabled={isSubmitting}
                className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 disabled:bg-green-300"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Customer Reviews ({ratings.length})
          </h2>
          
          {ratings.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600">No reviews yet. Be the first to review this provider!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {ratings.map((reviewItem) => (
                <div key={reviewItem._id} className="border-b border-gray-200 pb-6 last:border-b-0">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-800 text-lg">{reviewItem.user || 'Anonymous User'}</h3>
                      <StarRating rating={reviewItem.rating} readonly={true} />
                    </div>
                    <span className="text-gray-500 text-sm">
                      {reviewItem.createdAt ? new Date(reviewItem.createdAt).toLocaleDateString() : 'Recent'}
                    </span>
                  </div>
                  <p className="text-gray-600">{reviewItem.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Preview;