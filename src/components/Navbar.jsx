import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check authentication status on component mount and route changes
  useEffect(() => {
    const checkAuthStatus = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    checkAuthStatus();
    
    // Redirect away from auth pages if already logged in
    if (isLoggedIn && (location.pathname === '/login' || location.pathname === '/register')) {
      navigate('/dashboard');
    }
  }, [location.pathname, isLoggedIn, navigate]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsMenuOpen(false);
    navigate('/');
  };

  // Navigation items for non-authenticated users
  const guestNavItems = [
    { path: '/listings', label: 'Listings', description: 'Browse accommodations' },
    { path: '/about', label: 'About', description: 'Learn about StayFinder' },
    { path: '/contact', label: 'Contact', description: 'Get in touch' },
    { path: '/faq', label: 'FAQ', description: 'Frequently asked questions' }
  ];

  // Navigation items for authenticated users
  const userNavItems = [
    { path: '/dashboard', label: 'Dashboard', description: 'Your account overview' },
    { path: '/bookings', label: 'My Bookings', description: 'View your reservations' },
    { path: '/listings', label: 'Listings', description: 'Browse & book accommodations' },
    { path: '/my-listings', label: 'My Listings', description: 'Manage your properties' },
    { path: '/messages', label: 'Messages', description: 'View conversations' },
    { path: '/about', label: 'About', description: 'Learn about StayFinder' }
  ];

  const currentNavItems = isLoggedIn ? userNavItems : guestNavItems;

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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
              {currentNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-200 relative group px-2 py-1"
                  title={item.description}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-2 w-0 h-0.5 bg-red-600 group-hover:w-[calc(100%-1rem)] transition-all duration-200"></span>
                </Link>
              ))}
            </div>

            {/* Auth Section */}
            <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-gray-200">
              {!isLoggedIn ? (
                <>
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-red-600 font-medium px-4 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                  >
                    Sign Up
                  </Link>
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/settings"
                    className="text-gray-700 hover:text-red-600 font-medium px-3 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200"
                    title="Account Settings"
                  >
                    ⚙️
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-red-600 focus:outline-none focus:text-red-600 transition-colors duration-200 p-2"
              aria-label="Toggle mobile menu"
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

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100 shadow-lg">
              {/* Mobile Navigation Links */}
              {currentNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block px-3 py-3 text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-md font-medium transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex flex-col">
                    <span>{item.label}</span>
                    <span className="text-xs text-gray-500 mt-1">{item.description}</span>
                  </div>
                </Link>
              ))}

              {/* Mobile Auth Section */}
              <div className="pt-3 mt-3 border-t border-gray-200">
                {!isLoggedIn ? (
                  <>
                    <Link
                      to="/login"
                      className="block px-3 py-3 text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-md font-medium transition-all duration-200 mb-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="block px-3 py-3 bg-red-600 text-white hover:bg-red-700 rounded-md font-medium transition-all duration-200 text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/settings"
                      className="block px-3 py-3 text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-md font-medium transition-all duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      ⚙️ Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-3 bg-gray-600 text-white hover:bg-gray-700 rounded-md font-medium transition-all duration-200 mt-2"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;