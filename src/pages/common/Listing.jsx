import React, { useState, useEffect, useRef } from 'react';
import { Heart, MapPin, Star, Wifi, Car, Coffee, Users, Search, X, List, ChevronDown, Sliders } from 'lucide-react';

const Listing = ({ id, title, location, pricePerNight, originalPrice, imageUrl, rating, reviewCount, tag, maxGuests, amenities, availability = true, propertyType, onFavoriteClick, onBookClick, onViewOnMap, isMapView = false }) => {
  useEffect(() => {
      document.title = 'Listings • StayFinder';
    }, []);
  const [isFavorited, setIsFavorited] = useState(false);
  const amenityIcons = { wifi: <Wifi size={14} />, parking: <Car size={14} />, breakfast: <Coffee size={14} /> };
  const tagColors = { 'Featured': 'bg-blue-600', 'New': 'bg-green-600', 'Popular': 'bg-purple-600', 'Discounted': 'bg-red-600' };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
    onFavoriteClick(!isFavorited);
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] hover:shadow-xl transition-all duration-300 cursor-pointer border ${isMapView ? 'w-80' : ''}`}>
      <div className="relative">
        <div className={`relative ${isMapView ? 'h-40' : 'h-48'}`}>
          <img src={imageUrl} alt={title} className="h-full w-full object-cover" loading="lazy" />
        </div>
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          {tag && <span className={`${tagColors[tag]} text-white text-xs font-semibold px-2 py-1 rounded-full`}>{tag}</span>}
          <div className="flex gap-2">
            {!isMapView && (
              <button onClick={(e) => { e.stopPropagation(); onViewOnMap(id); }} className="bg-white/90 rounded-full p-1.5 shadow hover:bg-white transition-colors">
                <MapPin size={14} className="text-gray-600" />
              </button>
            )}
            <button onClick={handleFavoriteClick} className="bg-white/90 rounded-full p-1.5 shadow hover:bg-white transition-colors">
              <Heart size={14} className={isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-600'} />
            </button>
          </div>
        </div>
        {!availability && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white px-3 py-1 rounded-full text-sm font-semibold">Unavailable</span>
          </div>
        )}
      </div>
      <div className={`space-y-3 ${isMapView ? 'p-3' : 'p-4'}`}>
        <div>
          <h3 className={`font-bold text-gray-900 line-clamp-1 ${isMapView ? 'text-base' : 'text-lg'}`}>{title}</h3>
          <div className="flex items-center gap-1 text-gray-600 mt-1">
            <MapPin size={12} />
            <p className="text-sm truncate">{location}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs">
          {amenities.slice(0, 2).map((amenity, i) => (
            <div key={i} className="flex items-center gap-1 text-gray-600">
              {amenityIcons[amenity]}
              <span className="capitalize">{amenity}</span>
            </div>
          ))}
          <div className="flex items-center gap-1 text-gray-600">
            <Users size={12} />
            <span>{maxGuests} guests</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded">
              <Star size={12} className="text-yellow-500 fill-current" />
              <span className="text-sm font-semibold">{rating}</span>
            </div>
            <span className="text-xs text-gray-500">({reviewCount})</span>
          </div>
          <div className="text-right">
            {originalPrice && <p className="text-xs text-gray-400 line-through">₹{originalPrice}</p>}
            <p className="text-blue-600 font-bold">₹{pricePerNight.toLocaleString()}<span className="text-xs text-gray-500 font-normal">/night</span></p>
          </div>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onBookClick(); }}
          disabled={!availability}
          className={`w-full py-2 px-4 rounded-lg font-semibold text-sm transition-all ${
            availability ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          {availability ? 'Book Now' : 'Not Available'}
        </button>
      </div>
    </div>
  );
};

const LeafletMap = ({ listings, selectedListing, onMarkerClick, onClose }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);

  const locationCoords = {
    'Kasol': [32.0164, 77.3106], 'Goa': [15.2993, 74.1240], 'Mumbai': [19.0760, 72.8777],
    'Udaipur': [24.5854, 73.7125], 'Rishikesh': [30.0869, 78.2676], 'Bangalore': [12.9716, 77.5946],
    'Delhi': [28.6139, 77.2090], 'Jaipur': [26.9124, 75.7873], 'Kerala': [10.8505, 76.2711],
    'Shimla': [31.1048, 77.1734], 'Manali': [32.2432, 77.1892], 'Pune': [18.5204, 73.8567],
    'Chennai': [13.0827, 80.2707], 'Kolkata': [22.5726, 88.3639], 'Agra': [27.1767, 78.0081],
    'Varanasi': [25.3176, 82.9739], 'Mysore': [12.2958, 76.6394], 'Ooty': [11.4064, 76.6932],
    'Darjeeling': [27.0360, 88.2627], 'Pushkar': [26.4899, 74.5511], 'Hampi': [15.3350, 76.4600],
    'Alleppey': [9.4981, 76.3388], 'Coorg': [12.3375, 75.8069], 'Munnar': [10.0889, 77.0595]
  };

  const getCoordinates = (location, index) => {
    for (const [city, coords] of Object.entries(locationCoords)) {
      if (location.toLowerCase().includes(city.toLowerCase())) return coords;
    }
    const fallback = [[28.6, 77.2], [19.0, 72.8], [12.9, 77.5], [13.0, 80.2], [22.5, 88.3], [26.9, 75.7], [15.2, 74.1], [30.0, 78.2], [32.0, 77.3], [24.5, 73.7], [10.8, 76.2], [31.1, 77.1], [18.5, 73.8], [27.1, 78.0], [25.3, 82.9], [12.2, 76.6], [11.4, 76.6], [27.0, 88.2], [26.4, 74.5], [15.3, 76.4], [9.4, 76.3], [12.3, 75.8], [10.0, 77.0]];
    return fallback[index % fallback.length];
  };

  useEffect(() => {
    const loadLeaflet = () => {
      if (typeof window !== 'undefined' && !window.L) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
        document.head.appendChild(link);

        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js';
        script.onload = initializeMap;
        document.head.appendChild(script);
      } else if (window.L) {
        initializeMap();
      }
    };

    const initializeMap = () => {
      if (mapRef.current && !mapInstanceRef.current) {
        mapInstanceRef.current = window.L.map(mapRef.current).setView([20.5937, 78.9629], 5);
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(mapInstanceRef.current);
        addMarkers();
      }
    };

    const addMarkers = () => {
      if (!mapInstanceRef.current || !window.L) return;
      markersRef.current.forEach(marker => mapInstanceRef.current.removeLayer(marker));
      markersRef.current = [];

      listings.forEach((listing, index) => {
        const coords = getCoordinates(listing.location, index);
        const isSelected = selectedListing?.id === listing.id;
        
        const markerHtml = `<div style="background: ${isSelected ? '#dc2626' : '#2563eb'}; color: white; padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: 600; box-shadow: 0 2px 8px rgba(0,0,0,0.3); border: 2px solid white; min-width: 60px; text-align: center;">₹${listing.pricePerNight.toLocaleString()}</div>`;

        const marker = window.L.marker(coords, {
          icon: window.L.divIcon({
            className: 'custom-marker',
            html: markerHtml,
            iconSize: [60, 30],
            iconAnchor: [30, 30]
          })
        });

        marker.on('click', () => onMarkerClick(listing));
        marker.addTo(mapInstanceRef.current);
        markersRef.current.push(marker);
      });
    };

    loadLeaflet();
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [listings]);

  useEffect(() => {
    if (mapInstanceRef.current) {
      markersRef.current.forEach(marker => mapInstanceRef.current.removeLayer(marker));
      markersRef.current = [];

      listings.forEach((listing, index) => {
        const coords = getCoordinates(listing.location, index);
        const isSelected = selectedListing?.id === listing.id;
        
        const markerHtml = `<div style="background: ${isSelected ? '#dc2626' : '#2563eb'}; color: white; padding: 4px 8px; border-radius: 12px; font-size: 12px; font-weight: 600; box-shadow: 0 2px 8px rgba(0,0,0,0.3); border: 2px solid white; min-width: 60px; text-align: center;">₹${listing.pricePerNight.toLocaleString()}</div>`;

        const marker = window.L.marker(coords, {
          icon: window.L.divIcon({
            className: 'custom-marker',
            html: markerHtml,
            iconSize: [60, 30],
            iconAnchor: [30, 30]
          })
        });

        marker.on('click', () => onMarkerClick(listing));
        marker.addTo(mapInstanceRef.current);
        markersRef.current.push(marker);
      });
    }
  }, [selectedListing]);

  return (
    <div className="relative h-full rounded-lg overflow-hidden">
      <div className="absolute top-4 left-4 right-4 z-[1000] flex justify-between items-center">
        <div className="bg-white/90 backdrop-blur-sm px-3 py-2 rounded-full shadow-lg">
          <p className="text-sm font-semibold">{listings.length} properties</p>
        </div>
        <button onClick={onClose} className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors">
          <X size={18} />
        </button>
      </div>
      <div ref={mapRef} className="h-full w-full" />
      {selectedListing && (
        <div className="absolute bottom-4 left-4 right-4 z-[1000]">
          <Listing {...selectedListing} isMapView={true} onFavoriteClick={() => {}} onBookClick={() => {}} />
        </div>
      )}
    </div>
  );
};

const SearchBar = ({ searchTerm, onSearchChange }) => (
  <div className="relative flex-1 max-w-md">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
    <input
      type="text"
      placeholder="Search destinations..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      className="w-full pl-10 pr-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>
);

const FilterPanel = ({ filters, onFilterChange, isOpen, onToggle }) => {
  const priceRanges = [
    { label: 'Under ₹2,000', min: 0, max: 2000 },
    { label: '₹2,000 - ₹5,000', min: 2000, max: 5000 },
    { label: '₹5,000+', min: 5000, max: 999999 }
  ];

  return (
    <div className="relative filter-panel">
      <button onClick={onToggle} className="flex items-center gap-2 px-4 py-2.5 bg-white border rounded-lg hover:bg-gray-50 transition-colors">
        <Sliders size={18} />
        <span>Filters</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border z-30 p-4 space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Price Range</h3>
            {priceRanges.map((range, i) => (
              <label key={i} className="flex items-center mb-1">
                <input
                  type="radio"
                  name="price"
                  checked={filters.priceRange?.min === range.min}
                  onChange={() => onFilterChange('priceRange', range)}
                  className="mr-2"
                />
                <span className="text-sm">{range.label}</span>
              </label>
            ))}
          </div>

          <div>
            <h3 className="font-semibold mb-2">Property Type</h3>
            <div className="flex flex-wrap gap-1">
              {['Villa', 'Apartment', 'Resort', 'Cottage'].map(type => (
                <button
                  key={type}
                  onClick={() => {
                    const current = filters.propertyTypes || [];
                    const updated = current.includes(type) ? current.filter(t => t !== type) : [...current, type];
                    onFilterChange('propertyTypes', updated);
                  }}
                  className={`px-2 py-1 rounded text-xs transition-colors ${
                    filters.propertyTypes?.includes(type) ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => onFilterChange('clear')}
            className="w-full py-2 text-sm text-gray-600 border rounded hover:bg-gray-50 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

const EnhancedListingApp = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMapListing, setSelectedMapListing] = useState(null);

  const generateListings = () => {
    const locations = ['Kasol, HP', 'Goa', 'Mumbai', 'Udaipur', 'Rishikesh', 'Bangalore', 'Delhi', 'Jaipur', 'Kerala', 'Shimla', 'Manali', 'Pune', 'Chennai', 'Kolkata', 'Agra', 'Varanasi', 'Mysore', 'Ooty', 'Darjeeling', 'Pushkar', 'Hampi', 'Alleppey', 'Coorg', 'Munnar'];
    const titles = ['Mountain Retreat', 'Beach Villa', 'City Apartment', 'Heritage Stay', 'Riverside Cottage', 'Modern Penthouse', 'Luxury Resort', 'Cozy Home', 'Palace Hotel', 'Garden House', 'Lake View', 'Hill Station', 'Urban Loft', 'Traditional House', 'Boutique Hotel', 'Farm Stay', 'Tree House', 'Beach House', 'Desert Camp', 'Houseboat', 'Forest Lodge', 'Valley View', 'Cliffside Villa', 'Historic Manor'];
    const types = ['Villa', 'Apartment', 'Resort', 'Cottage'];
    const tags = ['Featured', 'New', 'Popular', 'Discounted'];
    
    const propertyImages = [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520637736862-4d197d17c635?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607688960-e095f8b3c9d2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566752229-450a5af1997a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
    ];

    return Array.from({ length: 24 }, (_, i) => ({
      id: i + 1,
      title: titles[i],
      location: locations[i],
      pricePerNight: Math.floor(Math.random() * 8000) + 1500,
      originalPrice: Math.random() > 0.7 ? Math.floor(Math.random() * 2000) + 12000 : null,
      rating: Number((4.3 + Math.random() * 0.6).toFixed(1)),
      reviewCount: Math.floor(Math.random() * 200) + 20,
      tag: Math.random() > 0.5 ? tags[Math.floor(Math.random() * tags.length)] : null,
      propertyType: types[Math.floor(Math.random() * types.length)],
      maxGuests: Math.floor(Math.random() * 6) + 2,
      amenities: ['wifi', 'parking', 'breakfast'].slice(0, Math.floor(Math.random() * 3) + 1),
      availability: i !== 2 && i !== 7,
      imageUrl: propertyImages[i]
    }));
  };

  const [listings] = useState(generateListings());

  const filteredListings = listings.filter(listing => {
    if (searchTerm && !listing.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !listing.location.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (filters.priceRange && (listing.pricePerNight < filters.priceRange.min || listing.pricePerNight > filters.priceRange.max)) return false;
    if (filters.propertyTypes?.length > 0 && !filters.propertyTypes.includes(listing.propertyType)) return false;
    return true;
  });

  const handleFilterChange = (key, value) => {
    if (key === 'clear') {
      setFilters({});
    } else {
      setFilters(prev => ({ ...prev, [key]: value }));
    }
  };

  const handleViewOnMap = (listingId) => {
    const listing = listings.find(l => l.id === listingId);
    setSelectedMapListing(listing);
    setViewMode('map');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showFilters && !event.target.closest('.filter-panel')) {
        setShowFilters(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showFilters]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-900">StayFinder</h1>
            
            <div className="flex items-center gap-4 flex-1 justify-center">
              <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
              <FilterPanel 
                filters={filters} 
                onFilterChange={handleFilterChange}
                isOpen={showFilters}
                onToggle={() => setShowFilters(!showFilters)}
              />
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                <List size={20} />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'map' ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                <MapPin size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-gray-600">{filteredListings.length} properties found</p>
        </div>

        {viewMode === 'map' ? (
          <div className="h-[80vh] rounded-lg overflow-hidden shadow-lg">
            <LeafletMap
              listings={filteredListings}
              selectedListing={selectedMapListing}
              onMarkerClick={setSelectedMapListing}
              onClose={() => setViewMode('grid')}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredListings.map(listing => (
              <Listing
                key={listing.id}
                {...listing}
                onFavoriteClick={() => {}}
                onBookClick={() => alert(`Booking ${listing.title}`)}
                onViewOnMap={handleViewOnMap}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EnhancedListingApp;