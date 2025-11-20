import React, { createContext, useState, useCallback, useRef } from 'react'

export let Contextdata = createContext();

const ContextProvider = ({ children }) => {
    const API_BASE_URL = 'http://localhost:5000/api';
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Auth state
    const [user, setUser] = useState(null);
    const [userToken, setUserToken] = useState(localStorage.getItem('userToken'));

    // Data states
    const [bookings, setBookings] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [taskProviders, setTaskProviders] = useState([]);

    // Use ref for userToken to avoid dependency changes
    const userTokenRef = useRef(userToken);
    userTokenRef.current = userToken;

    // Helper function for API calls - no dependencies
    const makeApiCall = useCallback(async (url, options = {}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${API_BASE_URL}${url}`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...(userTokenRef.current && { 'auth-token': userTokenRef.current }),
                    ...options.headers,
                },
                ...options,
            });

            // Handle non-JSON responses
            const contentType = response.headers.get('content-type');
            let data;
            
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                const text = await response.text();
                throw new Error(`Server error: ${response.status} - ${text.substring(0, 100)}`);
            }

            if (!response.ok) {
                throw new Error(data.message || `HTTP error! status: ${response.status}`);
            }
            return data;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // User Signup
    const userSignup = useCallback(async (userData) => {
        try {
            const result = await makeApiCall('/user/signup', {
                method: 'POST',
                body: JSON.stringify(userData),
            });
            
            if (result.token) {
                localStorage.setItem('userToken', result.token);
                setUserToken(result.token);
            }
            return result;
        } catch (err) {
            throw err;
        }
    }, [makeApiCall]);

    // User Login
    const userLogin = useCallback(async (email, password) => {
        try {
            const data = await makeApiCall('/user/login', {
                method: 'POST',
                body: JSON.stringify({ email, password }),
            });
            
            if (data.token) {
                localStorage.setItem('userToken', data.token);
                setUserToken(data.token);
            }
            return data;
        } catch (err) {
            throw err;
        }
    }, [makeApiCall]);

    // User Logout
    const userLogout = useCallback(() => {
        localStorage.removeItem('userToken');
        setUserToken(null);
        setUser(null);
        setBookings([]);
        setRatings([]);
        setTaskProviders([]);
    }, []);

    // Get All Task Providers
    const getTaskProviders = useCallback(async () => {
        try {
            const data = await makeApiCall('/user/taskproviders');
            setTaskProviders(data.taskproviders || []);
            return data;
        } catch (error) {
            throw error;
        }
    }, [makeApiCall]);

    // Get Ratings for a specific provider
    const getProviderRatings = useCallback(async (serviceProvider) => {
        try {
            const data = await makeApiCall(`/user/ratings?serviceprovider=${serviceProvider}`);
            setRatings(data.ratings || []);
            return data;
        } catch (error) {
            throw error;
        }
    }, [makeApiCall]);

    // Create Booking
    const createBooking = useCallback(async (bookingData) => {
        try {
            const data = await makeApiCall('/user/booking', {
                method: 'POST',
                body: JSON.stringify(bookingData),
            });
            return data;
        } catch (error) {
            throw error;
        }
    }, [makeApiCall]);

    // Get User's Bookings
    const getUserBookings = useCallback(async () => {
        try {
            const data = await makeApiCall('/user/bookings');
            setBookings(data.bookings || []);
            return data;
        } catch (error) {
            throw error;
        }
    }, [makeApiCall]);

    // Submit Rating
    const submitRating = useCallback(async (ratingData) => {
        try {
            const data = await makeApiCall('/user/rating', {
                method: 'POST',
                body: JSON.stringify(ratingData),
            });
            return data;
        } catch (error) {
            throw error;
        }
    }, [makeApiCall]);

    // Update Booking Status (User side)
    const updateBookingStatus = useCallback(async (bookingId, status) => {
        try {
            const data = await makeApiCall('/user/status', {
                method: 'PATCH',
                body: JSON.stringify({ id: bookingId, status }),
            });
            return data;
        } catch (error) {
            throw error;
        }
    }, [makeApiCall]);

    // Clear error
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    // Check if user is authenticated
    const isAuthenticated = useCallback(() => {
        return !!userToken;
    }, [userToken]);

    const value = {
        // States
        loading,
        error,
        user,
        userToken,
        bookings,
        ratings,
        taskProviders,
        
        // Auth functions
        userSignup,
        userLogin,
        userLogout,
        isAuthenticated,
        
        // Provider functions
        getTaskProviders,
        getProviderRatings,
        
        // Booking functions
        createBooking,
        getUserBookings,
        updateBookingStatus,
        
        // Rating functions
        submitRating,
        
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