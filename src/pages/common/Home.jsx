import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    document.title = 'Home • StayFinder';
  }, []);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Hero image carousel
  const heroImages = [
    {
      url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Luxury Stays',
      subtitle: 'Experience premium comfort'
    },
    {
      url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80',
      title: 'Unique Experiences',
      subtitle: 'Discover extraordinary places'
    },
    {
      url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      title: 'Perfect Getaways',
      subtitle: 'Your home away from home'
    }
  ];

  // Featured destinations
  const featuredDestinations = [
    {
      name: 'Bali, Indonesia',
      image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      properties: '2,847 properties'
    },
    {
      name: 'Paris, France',
      image: 'https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      properties: '1,923 properties'
    },
    {
      name: 'Tokyo, Japan',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      properties: '3,156 properties'
    },
    {
      name: 'New York, USA',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      properties: '4,521 properties'
    }
  ];

  // Property types
  const propertyTypes = [
    {
      type: 'Hotels',
      icon: '🏨',
      description: 'Luxury and boutique hotels',
      count: '12,847'
    },
    {
      type: 'Apartments',
      icon: '🏠',
      description: 'Cozy home-like experiences',
      count: '8,923'
    },
    {
      type: 'Villas',
      icon: '🏖️',
      description: 'Private luxury retreats',
      count: '3,156'
    },
    {
      type: 'Resorts',
      icon: '🌴',
      description: 'All-inclusive destinations',
      count: '2,421'
    }
  ];

  // Auto-slide carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to listings with search query
      window.location.href = `/listings?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Images */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Find Your Perfect
              <span className="block bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
                Stay
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
              Discover unique accommodations around the world. From cozy apartments to luxury villas.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row bg-white rounded-full shadow-2xl overflow-hidden">
                <input
                  type="text"
                  placeholder="Where do you want to stay?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-6 py-4 text-gray-800 text-lg focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-8 py-4 font-semibold hover:from-red-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explore Popular Destinations
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the world's most sought-after travel destinations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredDestinations.map((destination, index) => (
              <Link
                key={index}
                to={`/listings?destination=${encodeURIComponent(destination.name)}`}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="aspect-square">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{destination.name}</h3>
                    <p className="text-sm opacity-90">{destination.properties}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Browse by Property Type
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find the perfect accommodation for your travel style
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {propertyTypes.map((property, index) => (
              <Link
                key={index}
                to={`/listings?type=${encodeURIComponent(property.type.toLowerCase())}`}
                className="group text-center p-8 rounded-2xl border-2 border-gray-100 hover:border-red-200 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {property.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                  {property.type}
                </h3>
                <p className="text-gray-600 mb-4">{property.description}</p>
                <span className="text-sm font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full">
                  {property.count} properties
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose StayFinder */}
      <section className="py-20 bg-gradient-to-r from-red-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose StayFinder?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make finding and booking your perfect stay simple and secure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Verified Properties</h3>
              <p className="text-gray-600 text-lg">
                Every property is personally verified by our team to ensure quality and authenticity.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Secure Booking</h3>
              <p className="text-gray-600 text-lg">
                Your payments are protected with bank-level security and 24/7 customer support.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Best Price Guarantee</h3>
              <p className="text-gray-600 text-lg">
                Find a lower price elsewhere? We'll match it and give you an extra 10% off.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-pink-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto">
            Join millions of travelers who trust StayFinder for their accommodation needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/listings"
              className="bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Explore Stays
            </Link>
            <Link
              to="/register"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-red-600 transition-all duration-300 transform hover:scale-105"
            >
              Sign Up Free
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;