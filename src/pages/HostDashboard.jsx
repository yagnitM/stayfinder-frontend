import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const HostDashboard = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);

  useEffect(() => {
    // Replace this with actual API call later
    const dummyListings = [
      { id: 1, title: "Cozy Apartment", location: "Delhi" },
      { id: 2, title: "Luxury Villa", location: "Goa" }
    ];
    setListings(dummyListings);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Host Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-xl font-medium">Your Listings</h3>
        <Link
          to="/add-listing"
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded"
        >
          + Add Listing
        </Link>
      </div>

      {listings.length === 0 ? (
        <p className="text-gray-600">No listings yet.</p>
      ) : (
        <ul className="space-y-4">
          {listings.map((listing) => (
            <li
              key={listing.id}
              className="border p-4 rounded shadow hover:shadow-md transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold">{listing.title}</p>
                  <p className="text-sm text-gray-500">{listing.location}</p>
                </div>
                <Link
                  to={`/edit-listing/${listing.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HostDashboard;