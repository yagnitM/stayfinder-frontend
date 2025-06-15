import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center mb-4 space-x-2">
            <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-lg font-bold text-lg">
              SF
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
              StayFinder
            </span>
          </Link>
          <p className="text-gray-400">
            Your trusted platform to discover & book unique stays across the globe.
          </p>
        </div>

        {/* Links */}
        <div className="space-y-2">
          <h3 className="text-white font-semibold mb-2">Quick Links</h3>
          <div className="flex flex-col space-y-1">
            <Link to="/listings" className="hover:text-white transition-colors duration-200">Browse Listings</Link>
            <Link to="/bookings" className="hover:text-white transition-colors duration-200">My Bookings</Link>
            <Link to="/host" className="hover:text-white transition-colors duration-200">Become a Host</Link>
            <Link to="/help" className="hover:text-white transition-colors duration-200">Help Center</Link>
          </div>
        </div>

        {/* Social + Legal */}
        <div className="flex flex-col justify-between">
          <div className="flex space-x-4 mb-4">
            {/* Social icons (simplified) */}
            <a href="#" aria-label="Facebook" className="hover:text-white transition-colors duration-200">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-white transition-colors duration-200">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-white transition-colors duration-200">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white transition-colors duration-200">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
          <div className="flex flex-col sm:flex-row sm:justify-between text-xs text-gray-500 space-y-1 sm:space-y-0">
            <p>© 2025 StayFinder</p>
            <div className="flex space-x-4">
              <Link to="/privacy" className="hover:text-white transition-colors duration-200">Privacy</Link>
              <Link to="/terms" className="hover:text-white transition-colors duration-200">Terms</Link>
              <Link to="/cookies" className="hover:text-white transition-colors duration-200">Cookies</Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;