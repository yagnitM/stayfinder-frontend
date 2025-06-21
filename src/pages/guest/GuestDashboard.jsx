import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GuestDashboard = () => {
  useEffect(() => {
    document.title = 'Dashboard • StayFinder';
  }, []);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Authentication required');
          return;
        }

        const res = await axios.get('https://stayfinder-backend-ri8p.onrender.com/api/dashboard/host-summary', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setSummary(res.data.data);
      } catch (err) {
        console.error('Dashboard fetch failed:', err);
        setError(err.response?.data?.message || 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      confirmed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800',
      upcoming: 'bg-purple-100 text-purple-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getDaysUntilCheckIn = (checkInDate) => {
    const today = new Date();
    const checkIn = new Date(checkInDate);
    const diffTime = checkIn - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-red-800">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!summary) return null;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Travel Dashboard</h1>
        <p className="text-gray-600 mt-2">Your booking history and upcoming trips.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Total Trips</p>
              <p className="text-3xl font-bold">{summary.totalBookings}</p>
            </div>
            <div className="bg-blue-400 p-3 rounded-full">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Upcoming Trips</p>
              <p className="text-3xl font-bold">{summary.upcomingBookings}</p>
            </div>
            <div className="bg-green-400 p-3 rounded-full">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">Total Spent</p>
              <p className="text-3xl font-bold">{formatCurrency(summary.totalSpent)}</p>
            </div>
            <div className="bg-purple-400 p-3 rounded-full">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4z"/>
                <path d="M6 6a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V6zM8 8a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1zm1 3a1 1 0 100 2h2a1 1 0 100-2H9z"/>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Cities Visited</p>
              <p className="text-3xl font-bold">{summary.citiesVisited || 0}</p>
            </div>
            <div className="bg-orange-400 p-3 rounded-full">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Bookings</h2>
        </div>
        
        {summary.recentBookings && summary.recentBookings.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {summary.recentBookings.map(booking => {
              const daysUntil = getDaysUntilCheckIn(booking.checkIn);
              const isUpcoming = daysUntil > 0;
              
              return (
                <div key={booking._id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-9 9a1 1 0 001.414 1.414L9 5.414V17a1 1 0 102 0V5.414l7.293 7.293a1 1 0 001.414-1.414l-9-9z"/>
                          </svg>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{booking.listing?.title || 'Property'}</p>
                          <p className="text-sm text-gray-600">
                            {booking.listing?.location?.city}, {booking.listing?.location?.country}
                          </p>
                          {isUpcoming && (
                            <p className="text-xs text-blue-600 font-medium">
                              {daysUntil === 1 ? 'Tomorrow' : `In ${daysUntil} days`}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Check-in</p>
                        <p className="text-sm font-medium">{formatDate(booking.checkIn)}</p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Check-out</p>
                        <p className="text-sm font-medium">{formatDate(booking.checkOut)}</p>
                      </div>
                      
                      <div className="text-right">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                          {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1) || 'Unknown'}
                        </span>
                        <p className="text-sm font-medium text-gray-900 mt-1">
                          {formatCurrency(booking.pricing?.total || 0)}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {booking.guests && (
                    <div className="mt-3 text-sm text-gray-600">
                      <span className="bg-gray-100 px-2 py-1 rounded-full">
                        {booking.guests} {booking.guests === 1 ? 'Guest' : 'Guests'}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2h2a2 2 0 002-2V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 6a1 1 0 112 0v1a1 1 0 11-2 0v-1zm6-3a1 1 0 11-2 0 1 1 0 012 0zm-6 0a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd"/>
            </svg>
            <p>No bookings yet</p>
            <p className="text-sm">Start planning your next adventure!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuestDashboard;