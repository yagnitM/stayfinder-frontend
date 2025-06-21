import React from 'react';
import { useEffect } from 'react';

const Bookings = () => {
    useEffect(() => {
        document.title = 'Bookings • StayFinder';
      }, []);
  return (
    <div className="flex items-center justify-center h-full">
      <h1 className="text-2xl font-semibold text-gray-700">📅 Bookings page is coming soon!</h1>
    </div>
  );
};

export default Bookings;