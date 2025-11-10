import React, { useState } from 'react';

const Preview = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  // Mock data for the service provider
  const provider = {
    name: 'Bright Moseti',
    occupation: 'Mover',
    profilePicture: 'BM',
    about: 'Professional mover with over 5 years of experience in residential and commercial relocations. Specialized in furniture handling, packing, and safe transportation. Committed to providing efficient and reliable moving services.',
    skills: ['Furniture Assembly', 'Heavy Lifting', 'Packing Services', 'Transport Logistics', 'Residential Moving', 'Office Relocation'],
    rating: 4.2,
    totalReviews: 24,
    reviews: [
      { id: 1, customer: 'John Doe', rating: 5, comment: 'Excellent service! Bright was very professional and careful with my furniture.', date: '2024-01-15' },
      { id: 2, customer: 'Sarah Smith', rating: 4, comment: 'Great moving experience. Everything arrived safely and on time.', date: '2024-01-10' },
      { id: 3, customer: 'Mike Johnson', rating: 4, comment: 'Good service, would recommend for office moves.', date: '2024-01-05' }
    ]
  };

  const handleBooking = () => {
    if (selectedDate && selectedTime && serviceDescription) {
      alert(`Service booked with ${provider.name} on ${selectedDate} at ${selectedTime}\n\nService Description: ${serviceDescription}`);
    } else {
      alert('Please select date, time, and describe what service you need');
    }
  };

  const handleSubmitReview = () => {
    if (review && rating > 0) {
      alert('Review submitted successfully!');
      setReview('');
      setRating(0);
    } else {
      alert('Please provide both rating and review');
    }
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Provider Profile Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Picture and Basic Info */}
            <div className="flex flex-col items-center md:items-start md:w-1/3">
              <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4">
                {provider.profilePicture}
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{provider.name}</h1>
              <p className="text-blue-500 text-xl font-semibold mb-4">{provider.occupation}</p>
              <div className="flex items-center mb-4">
                <StarRating rating={provider.rating} readonly={true} />
                <span className="ml-2 text-gray-600">({provider.totalReviews} reviews)</span>
              </div>
            </div>

            {/* About and Skills */}
            <div className="md:w-2/3">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">About</h2>
                <p className="text-gray-600 leading-relaxed">{provider.about}</p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Services Offered</h2>
                <div className="flex flex-wrap gap-2">
                  {provider.skills.map((skill, index) => (
                    <span key={index} className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
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
                  min="08:00"
                  max="18:00"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Describe What You Need</label>
                <textarea
                  value={serviceDescription}
                  onChange={(e) => setServiceDescription(e.target.value)}
                  placeholder={`Describe the service you need...\nExamples:\n- "My sink is leaking and needs repair"\n- "I need help moving furniture to my new apartment"\n- "Toilet is clogged and needs unclogging"\n- "Electrical outlets not working in living room"`}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
                />
              </div>

              <button
                onClick={handleBooking}
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 text-lg"
              >
                Book Service Now
              </button>
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
                className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Customer Reviews</h2>
          
          <div className="space-y-6">
            {provider.reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-800 text-lg">{review.customer}</h3>
                    <StarRating rating={review.rating} readonly={true} />
                  </div>
                  <span className="text-gray-500 text-sm">{review.date}</span>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preview; 