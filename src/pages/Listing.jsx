import React, { useState } from 'react';
import { Heart, MapPin, Star, Wifi, Car, Coffee, Users } from 'lucide-react';

const Listing = ({
  title = 'Peaceful Mountain Retreat',
  location = 'Kasol, Himachal Pradesh',
  pricePerNight = 3200,
  originalPrice = null,
  imageUrl = 'https://images.unsplash.com/photo-1599422314077-f4dfdaa4cd6e?auto=format&fit=crop&w=800&q=80',
  additionalImages = [
    'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
  ],
  rating = 4.8,
  reviewCount = 124,
  tag = 'Featured',
  maxGuests = 4,
  amenities = ['wifi', 'parking', 'breakfast'],
  availability = true,
  onFavoriteClick = () => {},
  onBookClick = () => {},
  host = {
    name: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616c2f7aee7?auto=format&fit=crop&w=150&q=80',
    isVerified: true
  }
}) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const allImages = [imageUrl, ...additionalImages];
  
  const amenityIcons = {
    wifi: <Wifi size={14} />,
    parking: <Car size={14} />,
    breakfast: <Coffee size={14} />
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    onFavoriteClick(!isFavorited);
  };

  const handleImageNavigation = (direction, e) => {
    e.stopPropagation();
    if (direction === 'next') {
      setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    } else {
      setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const tagColors = {
    'Featured': 'bg-gradient-to-r from-blue-600 to-blue-700',
    'New': 'bg-gradient-to-r from-green-600 to-green-700',
    'Popular': 'bg-gradient-to-r from-purple-600 to-purple-700',
    'Discounted': 'bg-gradient-to-r from-red-600 to-red-700'
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:scale-[1.02] hover:shadow-2xl transition-all duration-500 group cursor-pointer border border-gray-100">
      <div className="relative overflow-hidden">
        {/* Image Gallery */}
        <div className="relative h-64">
          {imageError ? (
            <div className="h-full w-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
              <div className="text-gray-500 text-center">
                <MapPin size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">Image unavailable</p>
              </div>
            </div>
          ) : (
            <img
              src={allImages[currentImageIndex]}
              alt={`${title} - Image ${currentImageIndex + 1}`}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={handleImageError}
            />
          )}
          
          {/* Image Navigation */}
          {allImages.length > 1 && !imageError && (
            <>
              <button
                onClick={(e) => handleImageNavigation('prev', e)}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
                aria-label="Previous image"
              >
                <div className="w-0 h-0 border-t-[6px] border-b-[6px] border-r-[8px] border-transparent border-r-gray-700 -ml-0.5"></div>
              </button>
              <button
                onClick={(e) => handleImageNavigation('next', e)}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
                aria-label="Next image"
              >
                <div className="w-0 h-0 border-t-[6px] border-b-[6px] border-l-[8px] border-transparent border-l-gray-700 -mr-0.5"></div>
              </button>
            </>
          )}

          {/* Image Indicators */}
          {allImages.length > 1 && !imageError && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {allImages.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex(index);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Overlays */}
        <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-start">
          {tag && (
            <span className={`${tagColors[tag] || tagColors.Featured} text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm`}>
              {tag}
            </span>
          )}
          <button
            onClick={handleFavoriteClick}
            className="bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-300 backdrop-blur-sm group/heart"
            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart 
              size={18} 
              className={`transition-all duration-300 ${
                isFavorited 
                  ? 'fill-red-500 text-red-500 scale-110' 
                  : 'text-gray-600 group-hover/heart:text-red-500 group-hover/heart:scale-110'
              }`}
            />
          </button>
        </div>

        {!availability && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-white/95 px-4 py-2 rounded-full text-sm font-semibold text-gray-800">
              Currently Unavailable
            </div>
          </div>
        )}
      </div>

      <div className="p-5 space-y-4">
        {/* Title and Location */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-gray-900 line-clamp-2 leading-tight">
            {title}
          </h3>
          <div className="flex items-center gap-1.5 text-gray-600">
            <MapPin size={14} className="text-gray-400 flex-shrink-0" />
            <p className="text-sm truncate">{location}</p>
          </div>
        </div>

        {/* Host Info */}
        <div className="flex items-center gap-3">
          <img
            src={host.avatar}
            alt={host.name}
            className="w-8 h-8 rounded-full object-cover border-2 border-gray-100"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-gray-800 truncate">
                Hosted by {host.name}
              </p>
              {host.isVerified && (
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Amenities and Guests */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {amenities.slice(0, 3).map((amenity, index) => (
              <div key={index} className="flex items-center gap-1 text-gray-600">
                {amenityIcons[amenity]}
                <span className="text-xs capitalize">{amenity}</span>
              </div>
            ))}
            {amenities.length > 3 && (
              <span className="text-xs text-gray-500">+{amenities.length - 3} more</span>
            )}
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Users size={14} />
            <span className="text-xs">{maxGuests} guests</span>
          </div>
        </div>

        {/* Rating and Price */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
              <Star size={14} className="text-yellow-500 fill-current" />
              <span className="text-sm font-semibold text-gray-800">{rating}</span>
            </div>
            <span className="text-sm text-gray-500">({reviewCount} reviews)</span>
          </div>
          
          <div className="text-right">
            {originalPrice && (
              <p className="text-sm text-gray-400 line-through">₹{originalPrice}</p>
            )}
            <p className="text-blue-600 font-bold text-lg">
              ₹{pricePerNight.toLocaleString()}
              <span className="text-sm text-gray-500 font-medium"> / night</span>
            </p>
          </div>
        </div>

        {/* Book Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBookClick();
          }}
          disabled={!availability}
          className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-300 ${
            availability
              ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {availability ? 'Book Now' : 'Not Available'}
        </button>
      </div>
    </div>
  );
};

// Demo component showing multiple listings
const ListingDemo = () => {
  const sampleListings = [
    {
      title: 'Peaceful Mountain Retreat',
      location: 'Kasol, Himachal Pradesh',
      pricePerNight: 3200,
      rating: 4.8,
      reviewCount: 124,
      tag: 'Featured'
    },
    {
      title: 'Luxury Beachfront Villa',
      location: 'Goa, India',
      pricePerNight: 8500,
      originalPrice: 10000,
      rating: 4.9,
      reviewCount: 89,
      tag: 'Popular',
      imageUrl: 'https://images.unsplash.com/photo-1520637836862-4d197d17c635?auto=format&fit=crop&w=800&q=80'
    },
    {
      title: 'Cozy City Apartment',
      location: 'Mumbai, Maharashtra',
      pricePerNight: 2800,
      rating: 4.6,
      reviewCount: 56,
      tag: 'New',
      availability: false,
      imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const handleFavorite = (isFavorited, title) => {
    console.log(`${title} ${isFavorited ? 'added to' : 'removed from'} favorites`);
  };

  const handleBook = (title) => {
    console.log(`Booking initiated for: ${title}`);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Featured Properties
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sampleListings.map((listing, index) => (
            <Listing
              key={index}
              {...listing}
              onFavoriteClick={(isFavorited) => handleFavorite(isFavorited, listing.title)}
              onBookClick={() => handleBook(listing.title)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListingDemo;