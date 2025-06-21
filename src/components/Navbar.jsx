import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null); // 'user' or 'host'

  const navigate = useNavigate();
  const location = useLocation();

  // Step 1: Check auth and extract role from user.role
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    setIsLoggedIn(!!token);

    // Fix: Add additional checks for userData
    if (userData && userData !== 'undefined' && userData !== 'null') {
      try {
        const user = JSON.parse(userData);
        console.log('Parsed user:', user); // Debug log
        if (user && (user.role === 'host' || user.role === 'user')) {
          console.log('Setting user type:', user.role);
          setUserType(user.role);
        } else {
          console.log('Invalid user role or user object:', user);
          setUserType(null);
        }
      } catch (err) {
        console.error('Error parsing user from localStorage:', err);
        console.log('Raw userData:', userData);
        // Clear invalid data
        localStorage.removeItem('user');
        setUserType(null);
      }
    } else {
      console.log('No valid user data found in localStorage');
      setUserType(null);
    }
  }, [location.pathname]); // runs on mount and route change

  // Step 2: Handle redirect if already logged in
  useEffect(() => {
    console.log('Redirect effect - isLoggedIn:', isLoggedIn, 'userType:', userType, 'path:', location.pathname);
    
    if (
      isLoggedIn &&
      userType && // Make sure userType is not null
      (location.pathname === '/login' || location.pathname === '/register')
    ) {
      if (userType === 'host') {
        console.log('Redirecting to host dashboard');
        navigate('/hostdashboard');
      } else if (userType === 'user') {
        console.log('Redirecting to guest dashboard');
        navigate('/guestdashboard');
      }
    }
  }, [isLoggedIn, userType, location.pathname, navigate]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserType(null);
    setIsMenuOpen(false);
    navigate('/');
  };

  // Nav items
  const guestNavItems = [
    { path: '/listings', label: 'Listings', description: 'Browse accommodations' },
    { path: '/about', label: 'About', description: 'Learn about StayFinder' },
    { path: '/contact', label: 'Contact', description: 'Get in touch' },
    { path: '/faq', label: 'FAQ', description: 'Frequently asked questions' }
  ];

  const userGuestNavItems = [
    { path: '/guestdashboard', label: 'Dashboard', description: 'Your guest dashboard' },
    { path: '/bookings', label: 'My Bookings', description: 'View your reservations' },
    { path: '/listings', label: 'Listings', description: 'Browse & book accommodations' },
    { path: '/messages', label: 'Messages', description: 'View conversations' },
    { path: '/about', label: 'About', description: 'Learn about StayFinder' }
  ];

  const userHostNavItems = [
    { path: '/hostdashboard', label: 'Dashboard', description: 'Your host dashboard' },
    { path: '/my-listings', label: 'My Listings', description: 'Manage your properties' },
    { path: '/bookings', label: 'Bookings', description: 'Manage reservations' },
    { path: '/listings', label: 'All Listings', description: 'Browse accommodations' },
    { path: '/messages', label: 'Messages', description: 'View conversations' },
    { path: '/about', label: 'About', description: 'Learn about StayFinder' }
  ];

  const getCurrentNavItems = () => {
    if (!isLoggedIn) return guestNavItems;
    return userType === 'host' ? userHostNavItems : userGuestNavItems;
  };

  const currentNavItems = getCurrentNavItems();

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-lg font-bold text-xl group-hover:from-red-600 group-hover:to-pink-600 transition-all duration-200">
              SF
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
              StayFinder
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            {currentNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                title={item.description}
                className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200 relative group px-2 py-1"
              >
                {item.label}
                <span className="absolute -bottom-1 left-2 w-0 h-0.5 bg-red-600 group-hover:w-[calc(100%-1rem)] transition-all duration-200"></span>
              </Link>
            ))}

            <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-gray-200">
              {!isLoggedIn ? (
                <>
                  <Link to="/login" className="text-gray-700 hover:text-red-600 font-medium px-4 py-2 rounded-lg hover:bg-gray-50">
                    Login
                  </Link>
                  <Link to="/register" className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/settings" title="Account Settings" className="text-gray-700 hover:text-red-600 px-3 py-2 hover:bg-gray-50 rounded-lg">
                    ⚙️
                  </Link>
                  <button onClick={handleLogout} className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 font-medium shadow-md hover:shadow-lg">
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-red-600 focus:outline-none transition-colors p-2"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden px-2 pt-2 pb-3 bg-white border-t border-gray-100 shadow-lg space-y-1">
            {currentNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-3 text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-md font-medium"
              >
                <div className="flex flex-col">
                  <span>{item.label}</span>
                  <span className="text-xs text-gray-500 mt-1">{item.description}</span>
                </div>
              </Link>
            ))}

            <div className="pt-3 mt-3 border-t border-gray-200">
              {!isLoggedIn ? (
                <>
                  <Link to="/login" className="block px-3 py-3 hover:bg-gray-50 text-gray-700 hover:text-red-600 rounded-md font-medium" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Link>
                  <Link to="/register" className="block px-3 py-3 bg-red-600 text-white hover:bg-red-700 rounded-md font-medium text-center" onClick={() => setIsMenuOpen(false)}>
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <div className="px-3 py-2 text-sm text-gray-600 bg-gray-100 rounded-md mb-2">
                    {userType === 'host' ? '🏠 Host Account' : '👤 Guest Account'}
                  </div>
                  <Link to="/settings" onClick={() => setIsMenuOpen(false)} className="block px-3 py-3 hover:bg-gray-50 text-gray-700 hover:text-red-600 rounded-md font-medium">
                    ⚙️ Settings
                  </Link>
                  <button onClick={handleLogout} className="w-full text-left px-3 py-3 bg-gray-600 text-white hover:bg-gray-700 rounded-md font-medium mt-2">
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;