import React, { createContext, useState } from 'react'

export let Contextdata = createContext();

const ContextProvider = ({ children }) => {
    const API_BASE_URL = 'https://task-provider-fjui.onrender.com/api';
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Auth state
    const [provider, setProvider] = useState(null);
    const [providerToken, setProviderToken] = useState(localStorage.getItem('providerToken'));
    const [userToken, setUserToken] = useState(localStorage.getItem('providerToken'));

    // Data states
    const [bookings, setBookings] = useState([]);
    const [ratings, setRatings] = useState([]);

    // Helper function for API calls with proper token handling
    const makeApiCall = async (url, options = {}, useUserToken = false) => {
        setLoading(true);
        setError(null);
        try {
            // Determine which token to use
            const token = useUserToken ? userToken : providerToken;
            
            const response = await fetch(`${API_BASE_URL}${url}`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { 'Authorization': `${token}` }),
                    ...options.headers,
                },
                ...options,
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Image Upload
    const uploadImage = async (imageFile) => {
        const formData = new FormData();
        formData.append('image', imageFile);
        
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}/provider/upload-image`, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Image upload failed');
            }
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Provider Signup (with image upload)
    const providerSignup = async (providerData, imageFile) => {
        setLoading(true);
        setError(null);
        try {
            // Upload image first
            const uploadResult = await uploadImage(imageFile);
            
            // Then sign up with the image URL
            const signupData = {
                ...providerData,
                image_url: uploadResult.image_url
            };

            const result = await makeApiCall('/provider/signup', {
                method: 'POST',
                body: JSON.stringify(signupData),
            });
            
            if (result.token) {
                localStorage.setItem('providerToken', result.token);
                setProviderToken(result.token);
            }
            return result;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Provider Login
    const providerLogin = async (email, password) => {
        const data = await makeApiCall('/provider/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
        
        if (data.token) {
            localStorage.setItem('providerToken', data.token);
            setProviderToken(data.token);
        }
        return data;
    };

    // Provider Logout
    const providerLogout = () => {
        localStorage.removeItem('providerToken');
        setProviderToken(null);
        setProvider(null);
        setBookings([]);
        setRatings([]);
    };

    // Get Provider's Bookings
    const getProviderBookings = async () => {
        const data = await makeApiCall('/provider/bookings');
        setBookings(data.bookings || []);
        return data;
    };

    // Get Provider's Ratings
    const getProviderRatings = async () => {
        const data = await makeApiCall('/provider/ratings');
        setRatings(data.ratings || []);
        return data;
    };

    // Update Booking Status
    const updateBookingStatus = async (bookingId, status) => {
        const data = await makeApiCall('/provider/status', {
            method: 'PUT',
            body: JSON.stringify({ id: bookingId, status }),
        });
        
        if (data.success) {
            setBookings(prevBookings => 
                prevBookings.map(booking => 
                    booking._id === bookingId 
                        ? { ...booking, status } 
                        : booking
                )
            );
        }
        return data;
    };

    // Get Provider Profile
    const getProviderProfile = async () => {
        const data = await makeApiCall('/provider/profile');
        setProvider(data.provider);
        return data;
    };

    // User Functions
    const userSignup = async (userData) => {
        return makeApiCall('/user/signup', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    };

    const userLogin = async (email, password) => {
        const data = await makeApiCall('/user/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });
        
        if (data.token) {
            localStorage.setItem('providerToken', data.token);
            setUserToken(data.token);
        }
        return data;
    };

    const userLogout = () => {
        localStorage.removeItem('providerToken');
        setUserToken(null);
    };

    // Get Task Providers (for users) - No token needed (public route)
    const getTaskProviders = async () => {
        return makeApiCall('/user/taskproviders');
    };

    // Get Ratings for a specific provider - No token needed (public route)
    const getProviderRatingsForUser = async (serviceProvider) => {
        return makeApiCall(`/user/ratings?serviceprovider=${serviceProvider}`);
    };

    // User Booking Functions - Use user token
    const createBooking = async (bookingData) => {
        return makeApiCall('/user/booking', {
            method: 'POST',
            body: JSON.stringify(bookingData),
        }, true); // Use user token
    };

    const getUserBookings = async () => {
        return makeApiCall('/user/bookings', {}, true); // Use user token
    };

    // User Rating Functions - Use user token
    const submitRating = async (ratingData) => {
        return makeApiCall('/user/rating', {
            method: 'POST',
            body: JSON.stringify(ratingData),
        }, true); // Use user token
    };

    // Update Booking Status (User side) - Use user token
    const updateUserBookingStatus = async (bookingId, status) => {
        return makeApiCall('/user/status', {
            method: 'PATCH',
            body: JSON.stringify({ id: bookingId, status }),
        }, true); // Use user token
    };

    // Clear error
    const clearError = () => {
        setError(null);
    };

    const value = {
        // States
        loading,
        error,
        provider,
        providerToken,
        userToken,
        bookings,
        ratings,
        
        // Provider Auth functions
        providerSignup,
        providerLogin,
        providerLogout,
        
        // Provider Data functions
        uploadImage,
        getProviderBookings,
        getProviderRatings,
        updateBookingStatus,
        getProviderProfile,
        
        // User Auth functions
        userSignup,
        userLogin,
        userLogout,
        
        // User Data functions
        getTaskProviders,
        getProviderRatingsForUser,
        createBooking,
        getUserBookings,
        submitRating,
        updateUserBookingStatus,
        
        // Utility functions
        clearError,
        
        // Constants
        API_BASE_URL,
    };

    return (
        <Contextdata.Provider value={value}>
            {children}
        </Contextdata.Provider>
    );
}

export default ContextProvider;